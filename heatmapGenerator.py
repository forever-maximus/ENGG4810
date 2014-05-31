""" Class for generating javascript for heatmap functionality.
*** Works similar to the class mapsJavascriptGenerator.
"""
class HeatMapGenerator:

    sensorValues = []

    def __init__(self, sensorValues):
        self.sensorValues = sensorValues

    def genHeatMap(self):
        
        newJsFile = open('javascript/heatmapCode.js', 'w')
		
	heatMapJS = self._initializeMap()
	heatMapJS += self._addSliderJS()
	heatMapJS += self._startHeatMapping()

        for sample in self.sensorValues:
            if 'latitude' in sample and 'longitude' in sample:
                heatMapJS += self._addPointToHeatmap(sample)
            pass

	heatMapJS += self._endHeatMapping()

	newJsFile.write(heatMapJS)
	newJsFile.close()
		
    ## Initializes the Google map object and arrays for map objects
    def _initializeMap(self):

        initialMapJS = """
var map = null;
var heatmap = null;
var grid = [];

function initializeMap() {

    var mapOptions = {
      center: new google.maps.LatLng(%s, %s),
      zoom: 15
    };

    map = new google.maps.Map(document.getElementById("mapCanvas"),
            mapOptions);
            
}
	  
google.maps.event.addDomListener(window, 'load', initializeMap);
        """ % (self.sensorValues[0]['latitude'], self.sensorValues[0]['longitude'])

        return initialMapJS

    def _addSliderJS(self):

        sliderJS = """
$(function () {

    $("#tempSlider").slider({
        range: true,
        min: -20,
        max: 80,
        values: [10, 50],
        slide: function(event, ui) {
            $("#minTemp").val(ui.values[0]);
            $("#maxTemp").val(ui.values[1]);
        }
    });

    $("#accelSlider").slider({
        range: "min",
        step: 0.5,
        value: 0.0,
        min: -10.0,
        max: 10.0,
        slide: function(event, ui) {
            $("#maxAccel").val(ui.value);
        }
    });
});
    """
        return sliderJS

    def _startHeatMapping(self):

        startHeatmapJS = """
$(function() {
    $("#generateHeatMap").click(function() {

        if (heatmap != null) {
            heatmap.setMap(null);
        }

        var bounds = map.getBounds();
        var southWest = bounds.getSouthWest();
        var northEast = bounds.getNorthEast();
        var tileWidth = (northEast.lat() - southWest.lat())/100;
        var tileHeight = (northEast.lng() - southWest.lng())/100;

        for (i=0; i<100; i++) {
            for (j=0; j<100; j++) {
                var swLat = southWest.lat() + (tileWidth*i);
                var swLng = southWest.lng() + (tileHeight*j);
                var neLat = swLat + tileWidth;
                var neLng = swLng + tileHeight;

                var sensorCell = new google.maps.LatLngBounds(new google.maps.LatLng(swLat, swLng),
                        new google.maps.LatLng(neLat, neLng));
                grid.push(sensorCell);         
            }
        }
        
        var minTemp = parseInt($("#minTemp").val());
        var maxTemp = parseInt($("#maxTemp").val());
        var midTemp = (minTemp+maxTemp)/2;
        var upperTempRange = maxTemp - midTemp;
        var lowerTempRange = midTemp - minTemp;
        var maxAccel = $("#maxAccel").val();
        var heatmapData = [];
        var point;
        var intensity = 1;
    
    """
        return startHeatmapJS

    def _addPointToHeatmap(self, sample):

        newPointJS = """
        if (%s > midTemp) {
            intensity = ((%s - midTemp)/upperTempRange)*100;
        } else if (%s == midTemp) {
            intensity = 1;
        } else {
            intensity = ((midTemp - %s)/lowerTempRange)*100;
        }
        """ % (sample['temperature'], sample['temperature'],
               sample['temperature'], sample['temperature'])
        
        newPointJS += """
        point = {
            location: new google.maps.LatLng(%s, %s),
            weight: intensity
        };
        heatmapData.push(point);
    """ % (sample['latitude'], sample['longitude'])

        return newPointJS

    def _endHeatMapping(self):

        endHeatmapJS = """
        var finalData = [];
        for (i=0; i<grid.length; i++) {
            var smallest = 1000;
            var temp = [];
            for (j=0; j<heatmapData.length; j++) {
                if (grid[i].contains(heatmapData[j].location)) {
                    temp.push(heatmapData[j]);
                }
            }
            if (temp.length == 0) {
                point = {
                    location: grid[i].getCenter(),
                    weigth: 1
                };
                finalData.push(point);
            } else {
                for (k=0; k<temp.length; k++) {
                    if (temp[k].weight < smallest) {
                        smallest = temp[k].weight;
                    }
                }
                point = {
                    location: grid[i].getCenter(),
                    weight: smallest
                };
                finalData.push(point);
            }
        }

        heatmap = new google.maps.visualization.HeatmapLayer({
            data: finalData,
            maxIntensity: 100,
            radius: 30
        });
        heatmap.setMap(map);
    });
});
    """
        return endHeatmapJS






        
		
