
var map = null;
var directionsService;
var polylineArray = [];
var markerArray = [];

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
        for (i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }

        var sensorSelector = document.getElementById("sensorSelector");
        var currentSensor = sensorSelector.options[sensorSelector.selectedIndex].text;
        var minThreshold = document.getElementById("minThreshold").value;
        var maxThreshold = document.getElementById("maxThreshold").value;
	


        var startMarker = new google.maps.Marker({
            position: new google.maps.LatLng(-27.504328, 153.025498),
            map: map,
            title: 'Start'
        });
        markerArray.push(startMarker);

        var route1;
        if (currentSensor == "Temperature") {
            if (27 > minThreshold && 27 < maxThreshold) {
                route1 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });	
            } else {
                route1 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
            }
        } else if (currentSensor == "Acceleration") {
            console.log("Create line based on acceleration threshold");
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
        if (currentSensor == "Temperature") {
            if (27.5 > minThreshold && 27.5 < maxThreshold) {
                route2 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });	
            } else {
                route2 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
            }
        } else if (currentSensor == "Acceleration") {
            console.log("Create line based on acceleration threshold");
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
        if (currentSensor == "Temperature") {
            if (30 > minThreshold && 30 < maxThreshold) {
                route3 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });	
            } else {
                route3 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
            }
        } else if (currentSensor == "Acceleration") {
            console.log("Create line based on acceleration threshold");
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
        if (currentSensor == "Temperature") {
            if (28.5 > minThreshold && 28.5 < maxThreshold) {
                route4 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });	
            } else {
                route4 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
            }
        } else if (currentSensor == "Acceleration") {
            console.log("Create line based on acceleration threshold");
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
        if (currentSensor == "Temperature") {
            if (27 > minThreshold && 27 < maxThreshold) {
                route5 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });	
            } else {
                route5 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
            }
        } else if (currentSensor == "Acceleration") {
            console.log("Create line based on acceleration threshold");
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
        if (currentSensor == "Temperature") {
            if (28 > minThreshold && 28 < maxThreshold) {
                route6 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });	
            } else {
                route6 = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
            }
        } else if (currentSensor == "Acceleration") {
            console.log("Create line based on acceleration threshold");
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


        var endMarker = new google.maps.Marker({
            position: new google.maps.LatLng(-27.493915, 153.034445),
            map: map,
            title: 'End'
        });
        markerArray.push(endMarker);

        $("#generateRoute").attr("disabled", true);
        setTimeout(function() { enableButton() }, 3000);

    });
});
