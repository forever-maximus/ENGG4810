

var map = null;

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
	$("#generateRoute").click(function() {

	var temperatureThreshold = document.getElementById("tempThreshold");
	
