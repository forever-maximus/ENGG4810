
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
    