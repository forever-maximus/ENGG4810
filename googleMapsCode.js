
var map = null;
var directionsService;
var polylineArray = [];

function initializeMap() {

    directionsService = new google.maps.DirectionsService();

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

        for (i = 0; i < polylineArray.length; i++) {
            polylineArray[i].setMap(null);
        }

        var temperatureThreshold = document.getElementById("tempThreshold").value;
	

        
        if (27.0 < temperatureThreshold) {
            var route = new google.maps.Polyline({
                path: [new google.maps.LatLng(-27.504328, 153.025498), new google.maps.LatLng(-27.500369, 153.026485)],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });

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

            route.setMap(map);
            polylineArray.push(route);
		
        } else {
            var route = new google.maps.Polyline({
                path: [new google.maps.LatLng(-27.504328, 153.025498), new google.maps.LatLng(-27.500369, 153.026485)],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            route.setMap(map);
            polylineArray.push(route);
        }

        
        if (27.5 < temperatureThreshold) {
            var route = new google.maps.Polyline({
                path: [new google.maps.LatLng(-27.500369, 153.026485), new google.maps.LatLng(-27.502196, 153.030047)],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });

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

            route.setMap(map);
            polylineArray.push(route);
		
        } else {
            var route = new google.maps.Polyline({
                path: [new google.maps.LatLng(-27.500369, 153.026485), new google.maps.LatLng(-27.502196, 153.030047)],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            route.setMap(map);
            polylineArray.push(route);
        }

        
        if (30.0 < temperatureThreshold) {
            var route = new google.maps.Polyline({
                path: [new google.maps.LatLng(-27.502196, 153.030047), new google.maps.LatLng(-27.507068, 153.032622)],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });

            var request = {
                    origin: new google.maps.LatLng(-27.502196, 153.030047),
                    destination: new google.maps.LatLng(-27.507068, 153.032622),
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

            route.setMap(map);
            polylineArray.push(route);
		
        } else {
            var route = new google.maps.Polyline({
                path: [new google.maps.LatLng(-27.502196, 153.030047), new google.maps.LatLng(-27.507068, 153.032622)],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            route.setMap(map);
            polylineArray.push(route);
        }

        
        if (28.5 < temperatureThreshold) {
            var route = new google.maps.Polyline({
                path: [new google.maps.LatLng(-27.507068, 153.032622), new google.maps.LatLng(-27.504176, 153.034167)],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });

            var request = {
                    origin: new google.maps.LatLng(-27.507068, 153.032622),
                    destination: new google.maps.LatLng(-27.504176, 153.034167),
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

            route.setMap(map);
            polylineArray.push(route);
		
        } else {
            var route = new google.maps.Polyline({
                path: [new google.maps.LatLng(-27.507068, 153.032622), new google.maps.LatLng(-27.504176, 153.034167)],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            route.setMap(map);
            polylineArray.push(route);
        }


    });
});
