
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

var enableButton = function () {
    $("#generateRoute").removeAttr("disabled");
}

$(function () {
	$("#generateRoute").click(function() {

        for (i = 0; i < polylineArray.length; i++) {
            polylineArray[i].setMap(null);
        }

        var temperatureThreshold = document.getElementById("maxThreshold").value;
	

        var route1;
        if (27.0 < temperatureThreshold) {
            route1 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route1 = new google.maps.Polyline({
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
                    route1.getPath().push(point);
                }
                
            }
        });

        route1.setMap(map);
        polylineArray.push(route1);

        var route2;
        if (27.5 < temperatureThreshold) {
            route2 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route2 = new google.maps.Polyline({
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
                    route2.getPath().push(point);
                }
                
            }
        });

        route2.setMap(map);
        polylineArray.push(route2);

        var route3;
        if (30.0 < temperatureThreshold) {
            route3 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route3 = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

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
                    route3.getPath().push(point);
                }
                
            }
        });

        route3.setMap(map);
        polylineArray.push(route3);

        var route4;
        if (28.5 < temperatureThreshold) {
            route4 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route4 = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

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
                    route4.getPath().push(point);
                }
                
            }
        });

        route4.setMap(map);
        polylineArray.push(route4);

        var route5;
        if (27.0 < temperatureThreshold) {
            route5 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route5 = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

        var request = {
            origin: new google.maps.LatLng(-27.504176, 153.034167),
            destination: new google.maps.LatLng(-27.497315, 153.035109),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
        
                var path = response.routes[0].overview_path;
                
                for (var i=0; i<path.length;i++) {
                    var point = path[i];
                    route5.getPath().push(point);
                }
                
            }
        });

        route5.setMap(map);
        polylineArray.push(route5);

        var route6;
        if (28.0 < temperatureThreshold) {
            route6 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route6 = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

        var request = {
            origin: new google.maps.LatLng(-27.497315, 153.035109),
            destination: new google.maps.LatLng(-27.493915, 153.034445),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
        
                var path = response.routes[0].overview_path;
                
                for (var i=0; i<path.length;i++) {
                    var point = path[i];
                    route6.getPath().push(point);
                }
                
            }
        });

        route6.setMap(map);
        polylineArray.push(route6);


        $("#generateRoute").attr("disabled", true);
        setTimeout(function() { enableButton() }, 3000);

    });
});
