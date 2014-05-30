
var map = null;
var dataArray = [];

function initializeMap() {

    var mapOptions = {
      center: new google.maps.LatLng(-27.504328, 153.025498),
      zoom: 15
    };

    map = new google.maps.Map(document.getElementById("mapCanvas"),
            mapOptions);
            
}
	  
google.maps.event.addDomListener(window, 'load', initializeMap);
        
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
    
$(function() {
    $("#generateHeatMap").click(function() {

        var minTemp = $("#minTemp").val();
        var maxTemp = $("#maxTemp").val();
        var maxAccel = $("#maxAccel").val();
        var heatmapData = [];
        var point;
    
    
        point = {
            location: new google.maps.LatLng(-27.504328, 153.025498),
            weight: 1
        };
        heatmapData.push(point);
    
        point = {
            location: new google.maps.LatLng(-27.500369, 153.026485),
            weight: 1
        };
        heatmapData.push(point);
    
        point = {
            location: new google.maps.LatLng(-27.502196, 153.030047),
            weight: 1
        };
        heatmapData.push(point);
    
        point = {
            location: new google.maps.LatLng(-27.507068, 153.032622),
            weight: 1
        };
        heatmapData.push(point);
    
        point = {
            location: new google.maps.LatLng(-27.504176, 153.034167),
            weight: 1
        };
        heatmapData.push(point);
    
        point = {
            location: new google.maps.LatLng(-27.497315, 153.035109),
            weight: 1
        };
        heatmapData.push(point);
    
        point = {
            location: new google.maps.LatLng(-27.493915, 153.034445),
            weight: 1
        };
        heatmapData.push(point);
    
        point = {
            location: new google.maps.LatLng(-27.506176, 153.026376),
            weight: 1
        };
        heatmapData.push(point);
    
        point = {
            location: new google.maps.LatLng(-27.506176, 153.029444),
            weight: 1
        };
        heatmapData.push(point);
    
        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData
        });
        heatmap.setMap(map);
    });
});
    