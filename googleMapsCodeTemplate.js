var map = null;

function initializeMap() {

	var mapOptions = {
	  center: new google.maps.LatLng(-27.497687, 153.021066),
	  zoom: 15
	};
	
	map = new google.maps.Map(document.getElementById("mapCanvas"),
		mapOptions);
		
}
	  
google.maps.event.addDomListener(window, 'load', initializeMap);

$(function () {
	$("#generateRoute").click(function() {
	
		var coordinates = [];
		
		for (var i=0; i < 10; i++) {
			var latitude = -27.499687 + 0.0015 * (i+1) * Math.random();
			var longitude = 153.015066 + 0.0009 * (i+1) * Math.random();
			console.log("Latitude: " + latitude + ", Longitude: " + longitude);
			coordinates[i] = new google.maps.LatLng(latitude, longitude);
		}
		
		var route = new google.maps.Polyline({
			path: coordinates,
			strokeColor: "#00AA00",
			strokeOpacity: 1.0,
			strokeWeight: 3
		});
		
		route.setMap(map);
		
	});
});

	