from SSHServerFunctions import *
from yamlParser import *

""" Class which controls the generation of the javascript for the software depending
*** on the values from the sensor data file
"""
class JavascriptGenerator:

    sensorValues = []

    def __init__(self, sensorValues):
        self.sensorValues = sensorValues

    def generate(self):

        newJsFile = open('javascript/googleMapsCode.js', 'w')

        IAmTheBatmanJS = self._initializeMap()      
        IAmTheBatmanJS += self._generateDropDown()      
        IAmTheBatmanJS += self._addSliderJS()
        
        IAmTheBatmanJS += self._startMapRouting()

        counter = 0
        previous = {}
        
        for sample in self.sensorValues:
            if counter == 0:
                previous = sample
                counter += 1
                continue
            else:
                if 'latitude' in sample and 'longitude' in sample:
                    
                    IAmTheBatmanJS += self._addTempSensorMapping(counter, sample)
                    IAmTheBatmanJS += self._addAccelSensorMapping(counter, sample)
                
                    if 'humidity' in sample :
                        IAmTheBatmanJS += self._addHumiditySensorMapping(counter, sample)

                    if 'pressure' in sample:
                        IAmTheBatmanJS += self._addPressureSensorMapping(counter, sample)

                    IAmTheBatmanJS += self._callGoogleDirections(counter, sample, previous)

                    previous = sample

                else:
                    IAmTheBatmanJS += self._noRoute(sample)
       
                counter += 1

        IAmTheBatmanJS += self._endMapRouting()
        
        newJsFile.write(IAmTheBatmanJS)
        newJsFile.close()

    ## Initializes the Google map object and arrays for map objects
    def _initializeMap(self):

        initialMapJS = """
var map = null;
var directionsService;
var polylineArray = [];
var markerArray = [];

function initializeMap() {

    directionsService = new google.maps.DirectionsService();

    var mapOptions = {
      center: new google.maps.LatLng(%s, %s),
      zoom: 15
    };

    map = new google.maps.Map(document.getElementById("mapCanvas"),
            mapOptions);
            
}
	  
google.maps.event.addDomListener(window, 'load', initializeMap);

var enableButton = function () {
    $("#generateRoute").removeAttr("disabled");
}
        """ % (self.sensorValues[0]['latitude'], self.sensorValues[0]['longitude'])

        return initialMapJS

    ## Adds sensor names to dropdown list at runtime
    def _generateDropDown(self):

        dynamicDropDown = """

window.onload = function () {
"""
        for i in self.sensorValues[0]:
            
            dynamicDropDown += """

    if ('%s' != 'temperature' && '%s' != 'acceleration' && '%s' != 'latitude' &&
            '%s' != 'longitude' && '%s' != 'time') {
        var select = document.getElementById("sensorSelector");
        var option = document.createElement('option');
        option.text = option.value = '%s';
        select.add(option, 0);
    }
        """ % (i, i, i, i, i, i)
            
        dynamicDropDown += """
};
        """

        return dynamicDropDown

    ## Generates the code to add JQuery UI sliders and the code which
    ## controls them
    def _addSliderJS(self):

        sliderJS = """

$(function () {
    $("#sensorSelector").change(function () {
        var currentSensor = $("#sensorSelector").val();
        $("#minThreshold").val("");
        $("#maxThreshold").val("");
        if (currentSensor == "acceleration") {
            $("#minThresholdContainer").hide();
            $("#accelSlider").show();
            $("#mainSlider").hide();
        } else {
            $("#minThresholdContainer").show();
            $("#accelSlider").hide();
            $("#mainSlider").show();
        }

        if (currentSensor == "temperature") {
            $("#mainSlider").slider('option', {min:-20, max:80});
            $("#mainSlider").slider('values', 0, 10);
            $("#mainSlider").slider('values', 1, 50);
        } else if (currentSensor == "acceleration") {
            
        } else if (currentSensor == "pressure") {
            $("#mainSlider").slider('option', {min:80, max:115});
            $("#mainSlider").slider('values', 0, 90);
            $("#mainSlider").slider('values', 1, 100);
        } else if (currentSensor == "humidity") {
            $("#mainSlider").slider('option', {min:0, max:100});
            $("#mainSlider").slider('values', 0, 20);
            $("#mainSlider").slider('values', 1, 50);
        }
    });
    
    $("#mainSlider").slider({
        range: true,
        min: -20,
        max: 80,
        values: [10, 50],
        slide: function(event, ui) {
            $("#minThreshold").val(ui.values[0]);
            $("#maxThreshold").val(ui.values[1]);
        }
    });

    $("#accelSlider").slider({
        range: "min",
        step: 0.5,
        value: 0.0,
        min: -10.0,
        max: 10.0,
        slide: function(event, ui) {
            $("#maxThreshold").val(ui.value);
        }
    });
    $("#accelSlider").hide();
        """

        return sliderJS


    def _startMapRouting(self):

        startMapping = """

    $("#generateRoute").click(function() {

        for (i = 0; i < polylineArray.length; i++) {
            polylineArray[i].setMap(null);
        }
        for (i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }

        var currentSensor = $("#sensorSelector").val();
        var minThreshold = document.getElementById("minThreshold").value;
        var maxThreshold = document.getElementById("maxThreshold").value;
        var statusDisplay = document.getElementById("routeStatus");
        
        errorCounter = 0;
        specialError = 0;

        var startMarker = new google.maps.Marker({
            position: new google.maps.LatLng(%s, %s),
            map: map,
            title: 'Start'
        });
        markerArray.push(startMarker);

        var lineSymbol = {
            path: google.maps.SymbolPath.CIRCLE,
            strokeColor: '#444444',
            strokeOpacity: 0.5
        };
        """ % (self.sensorValues[0]['latitude'], self.sensorValues[0]['longitude'])
	
        return startMapping


    def _addTempSensorMapping(self, counter, sample):

        tempSensorJS = """
        var route%s;
        if (currentSensor == "temperature") {
            if (%s > minThreshold && %s < maxThreshold) {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    icons: [{icon: lineSymbol}]
                });	
            } else {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    icons: [{icon: lineSymbol}]
                });
                errorCounter += 1;
            }
        """ % (counter, sample['temperature'], sample['temperature'],
               counter, counter)

        tempSensorJS += """
            google.maps.event.addListener(route%s, 'mouseover', function () {
                var infoWindow = document.getElementById("routeInfoWindow");
                infoWindow.innerHTML = "";
                infoWindow.innerHTML = "<b>Route Segment Values: </b><br>"
                infoWindow.innerHTML += "latitude = %s <br>longitude = %s" +
                        "<br>temperature = %s";
            });
        }
        """ % (counter, sample['latitude'], sample['longitude'], sample['temperature'])

        return tempSensorJS


    def _addAccelSensorMapping(self, counter, sample):

        accelSensorJS = """
        else if (currentSensor == "acceleration") {
            if (%s < maxThreshold && %s < maxThreshold && %s < maxThreshold) {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    icons: [{icon: lineSymbol}]
                });
            } else {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    icons: [{icon: lineSymbol}]
                });
                errorCounter += 1;
            }
        """ % (sample['acceleration'][0], sample['acceleration'][1],
                sample['acceleration'][2], counter, counter)

        accelSensorJS += """
            google.maps.event.addListener(route%s, 'mouseover', function() {
                var infoWindow = document.getElementById("routeInfoWindow");
                infoWindow.innerHTML = "";
                infoWindow.innerHTML = "<b>Route Segment Values: </b><br>"
                infoWindow.innerHTML += "latitude = %s <br>longitude = %s" +
                        "<br>acceleration = [%s, %s, %s]";
            });
        }
        """ % (counter, sample['latitude'], sample['longitude'],
               sample['acceleration'][0],sample['acceleration'][1],
               sample['acceleration'][2])

        return accelSensorJS


    def _addHumiditySensorMapping(self, counter, sample):

        humiditySensorJS = """
        else if (currentSensor == "humidity") {
            if (%s > minThreshold && %s < maxThreshold) {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    icons: [{icon: lineSymbol}]
                });
            } else {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    icons: [{icon: lineSymbol}]
                });
                errorCounter += 1;
            }
        """ % (sample['humidity'], sample['humidity'], counter, counter)

        humiditySensorJS += """
            google.maps.event.addListener(route%s, 'mouseover', function () {
                var infoWindow = document.getElementById("routeInfoWindow");
                infoWindow.innerHTML = "";
                infoWindow.innerHTML = "<b>Route Segment Values: </b><br>"
                infoWindow.innerHTML += "latitude = %s <br>longitude = %s" +
                        "<br>humidity = %s";
            });
        }
        """ % (counter, sample['latitude'], sample['longitude'], sample['humidity'])

        return humiditySensorJS
    

    def _addPressureSensorMapping(self, counter, sample):

        pressureSensorJS = """
        else if (currentSensor == "pressure") {
            if (%s > minThreshold && %s < maxThreshold) {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    icons: [{icon: lineSymbol}]
                });
            } else {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    icons: [{icon: lineSymbol}]
                });
                errorCounter += 1;
            }
        """ % (sample['pressure'], sample['pressure'], counter, counter)

        pressureSensorJS += """
            google.maps.event.addListener(route%s, 'mouseover', function() {
                var infoWindow = document.getElementById("routeInfoWindow");
                infoWindow.innerHTML = "";
                infoWindow.innerHTML = "<b>Route Segment Values: </b><br>"
                infoWindow.innerHTML += "latitude = %s <br>longitude = %s" +
                        "<br>pressure = %s";
            });
        }
        """ % (counter, sample['latitude'], sample['longitude'], sample['pressure'])

        return pressureSensorJS
    

    def _callGoogleDirections(self, counter, sample, previous):

        googleDirections = """

        var request = {
            origin: new google.maps.LatLng(%s, %s),
            destination: new google.maps.LatLng(%s, %s),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
        
                var path = response.routes[0].overview_path;
                
                for (var i=0; i<path.length;i++) {
                    var point = path[i];
                    route%s.getPath().push(point);
                }
                
            }
        });

        route%s.setMap(map);
        polylineArray.push(route%s);
        """ % (previous['latitude'], previous['longitude'], sample['latitude'],
               sample['longitude'], counter, counter, counter)

        return googleDirections


    def _endMapRouting(self):

        finishMapping = """

        var endMarker = new google.maps.Marker({
            position: new google.maps.LatLng(%s, %s),
            map: map,
            title: 'End'
        });
        markerArray.push(endMarker);

        $("#generateRoute").attr("disabled", true);
        setTimeout(function() { enableButton() }, 3000);

        if (specialError > 0 && errorCounter > 0) {
            $("#routeStatus").addClass('error');
            statusDisplay.innerHTML = "Threshold exceeded - goods compromised!" +
                    "<br>ERROR FROM NON-MAPPED SAMPLE!"
        } else if (specialError > 0) {
            $("#routeStatus").addClass('error');
            statusDisplay.innerHTML = "ERROR FROM NON-MAPPED SAMPLE!"
        } else if (errorCounter > 0) {
            $("#routeStatus").addClass('error');
            statusDisplay.innerHTML = "Threshold exceeded - goods compromised!"
        } else {
            $("#routeStatus").removeClass('error');
            statusDisplay.innerHTML = "Goods safely transported."
        }

    });
});
        """ % (self.sensorValues[len(self.sensorValues)-1]['latitude'],
               self.sensorValues[len(self.sensorValues)-1]['longitude'])

        return finishMapping
    

    def _noRoute(self, sample):

        noRouteJS = """
        if (currentSensor == "temperature") {
            if (!(%s > minThreshold && %s < maxThreshold)) {
                specialError += 1;
            }
        }
        """ % (sample['temperature'], sample['temperature'])

        print sample['acceleration'][2]

        noRouteJS += """
        else if (currentSensor == "acceleration") {
            if (!(%s < maxThreshold && %s < maxThreshold && %s < maxThreshold)) {
                specialError += 1;
            }
        }
        """ % (sample['acceleration'][0], sample['acceleration'][1],
                sample['acceleration'][2])

        noRouteJS += """
        else if (currentSensor == "humidity") {
            if (!(%s > minThreshold && %s < maxThreshold)) {
                specialError += 1;
            }
        }
        """ % (sample['humidity'], sample['humidity'])

        noRouteJS += """
        else if (currentSensor == "pressure") {
            if (!(%s > minThreshold && %s < maxThreshold)) {
                specialError += 1;
            }
        }
        """ % (sample['pressure'], sample['pressure'])

        return noRouteJS


def main():

    dataRetriever = DataRetriever()

    sensorDataReference = 0
    if dataRetriever.heatmap == True:
        sensorDataReference = SensorDataManager(dataRetriever.fileList)
    else:
        sensorDataReference = SensorDataManager()
        sensorDataReference.gatherData()
        sensorDataReference.displayData()

    while(1):
        pass

    getItDone = JavascriptGenerator(sensorDataReference.sensorValues)
    getItDone.generate()

    os.startfile('initialMap.html')
    

if __name__ == "__main__":
    main()
