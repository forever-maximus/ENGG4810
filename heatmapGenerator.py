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
var dataArray = [];

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

        var minTemp = $("#minTemp").val();
        var maxTemp = $("#maxTemp").val();
        var maxAccel = $("#maxAccel").val();
        var heatmapData = [];
        var point;
    
    """
        return startHeatmapJS

    def _addPointToHeatmap(self, sample):

        newPointJS = """
        point = {
            location: new google.maps.LatLng(%s, %s),
            weight: %s
        };
        heatmapData.push(point);
    """ % (sample['latitude'], sample['longitude'], 1)

        return newPointJS

    def _endHeatMapping(self):

        endHeatmapJS = """
        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData
        });
        heatmap.setMap(map);
    });
});
    """
        return endHeatmapJS






        
		
