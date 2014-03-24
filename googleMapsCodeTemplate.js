var map = null;
var line = [];
var directionsService;

function initializeMap() {

	directionsService = new google.maps.DirectionsService();

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
	
		for (i=0; i<line.length; i++) {
		    console.log(line[i]);
		  line[i].setMap(null); //or line[i].setVisible(false);
		}
		
		var temperatureThreshold = document.getElementById("tempThreshold").value;
	
		// var coordinates = [];
		
		// for (var i=0; i < 10; i++) {
			// var latitude = -27.499687 + 0.0015 * (i+1) * Math.random();
			// var longitude = 153.015066 + 0.0009 * (i+1) * Math.random();
			// console.log("Latitude: " + latitude + ", Longitude: " + longitude);
			// coordinates[i] = new google.maps.LatLng(latitude, longitude);
		// }
		
		// var route = new google.maps.Polyline({
			// path: coordinates,
			// strokeColor: "#00AA00",
			// strokeOpacity: 1.0,
			// strokeWeight: 3
		// });
		
		
		// var request = {
			// origin: coordinates[0],
			// destination: coordinates[coordinates.length-1],
			// travelMode: google.maps.TravelMode.DRIVING
		// };
		
		// directionsService.route(request, function(response, status) {
			// if (status == google.maps.DirectionsStatus.OK) {
			
				// var path = response.routes[0].overview_path;
				
				// for (var i=0; i<path.length;i++) {
					// var point = path[i];
					// route.getPath().push(point);
				// }
				
			// }
		// });
		
		
		var route = null;
		if (30.0 < temperatureThreshold) {
            route = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        } else {
            route = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        }
		
		var request = {
                    origin: new google.maps.LatLng(-27.504328, 153.025498),
                    destination: new google.maps.LatLng(-27.500369, 153.026485),
                    travelMode: google.maps.TravelMode.DRIVING
            };
            
		directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
				
						var path = response.routes[0].overview_path;
						
						for (var i=0; i<path.length;i++) {
								var point = path[i];
								route.getPath().push(point);
						}
						
				}
		});
		
		line.push(route);
		route.setMap(map);
		console.log(route.getPath());
		
		
		var route = null;
		if (27.0 < temperatureThreshold) {
            route = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        } else {
            route = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });		
        }
		
		var request = {
                    origin: new google.maps.LatLng(-27.500369, 153.026485),
                    destination: new google.maps.LatLng(-27.502196, 153.030047),
                    travelMode: google.maps.TravelMode.DRIVING
            };
            
		directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
				
						var path = response.routes[0].overview_path;
						
						for (var i=0; i<path.length;i++) {
								var point = path[i];
								route.getPath().push(point);
						}
						
				}
		});
		
		line.push(route);
		route.setMap(map);
		
		
	});
});

	