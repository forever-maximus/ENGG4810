
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




window.onload = function () {


    if ('acceleration' != 'temperature' && 'acceleration' != 'acceleration' && 'acceleration' != 'latitude' &&
            'acceleration' != 'longitude' && 'acceleration' != 'time') {
        var select = document.getElementById("sensorSelector");
        var option = document.createElement('option');
        option.text = option.value = 'acceleration';
        select.add(option, 0);
    }


    if ('pressure' != 'temperature' && 'pressure' != 'acceleration' && 'pressure' != 'latitude' &&
            'pressure' != 'longitude' && 'pressure' != 'time') {
        var select = document.getElementById("sensorSelector");
        var option = document.createElement('option');
        option.text = option.value = 'pressure';
        select.add(option, 0);
    }


    if ('temperature' != 'temperature' && 'temperature' != 'acceleration' && 'temperature' != 'latitude' &&
            'temperature' != 'longitude' && 'temperature' != 'time') {
        var select = document.getElementById("sensorSelector");
        var option = document.createElement('option');
        option.text = option.value = 'temperature';
        select.add(option, 0);
    }


    if ('latitude' != 'temperature' && 'latitude' != 'acceleration' && 'latitude' != 'latitude' &&
            'latitude' != 'longitude' && 'latitude' != 'time') {
        var select = document.getElementById("sensorSelector");
        var option = document.createElement('option');
        option.text = option.value = 'latitude';
        select.add(option, 0);
    }


    if ('longitude' != 'temperature' && 'longitude' != 'acceleration' && 'longitude' != 'latitude' &&
            'longitude' != 'longitude' && 'longitude' != 'time') {
        var select = document.getElementById("sensorSelector");
        var option = document.createElement('option');
        option.text = option.value = 'longitude';
        select.add(option, 0);
    }


    if ('humidity' != 'temperature' && 'humidity' != 'acceleration' && 'humidity' != 'latitude' &&
            'humidity' != 'longitude' && 'humidity' != 'time') {
        var select = document.getElementById("sensorSelector");
        var option = document.createElement('option');
        option.text = option.value = 'humidity';
        select.add(option, 0);
    }

};


$(function () {
    $("#sensorSelector").change(function () {
        var currentSensor = $("#sensorSelector").val();
        if (currentSensor == "acceleration") {
            //$("#minThreshold").prop('disabled', true);
            $("#minThresholdContainer").hide();
        } else {
            //$("#minThreshold").prop('disabled', false);
            $("#minThresholdContainer").show();
        }
    });

    $("#sensorSelector").change(function () {
        var currentSensor = $("#sensorSelector").val();
        if (currentSensor == "temperature") {
            $("#mainSlider").slider('option', {min:-20, max:80});
            $("#mainSlider").slider('values', 0, 10);
            $("#mainSlider").slider('values', 1, 50);
        } else if (currentSensor == "acceleration") {
        
        } else if (currentSensor == "pressure") {
            $("#mainSlider").slider('option', {min:80, max:115});
            $("#mainSlider").slider('values', 0, 90);
            $("#mainSlider").slider('values', 1, 100);
        } else if (currentSensor == "humidity") {
            $("#mainSlider").slider('option', {min:0, max:100});
            $("#mainSlider").slider('values', 0, 20);
            $("#mainSlider").slider('values', 1, 50);
        }
    });

    $("#mainSlider").slider({
        range: true,
        min: -20,
        max: 80,
        values: [10, 50],
        slide: function(event, ui) {
            $("#minThreshold").val(ui.values[0]);
            $("#maxThreshold").val(ui.values[1]);
        }
    });


    $("#generateRoute").click(function() {

        for (i = 0; i < polylineArray.length; i++) {
            polylineArray[i].setMap(null);
        }
        for (i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }

        var currentSensor = $("#sensorSelector").val();
        var minThreshold = document.getElementById("minThreshold").value;
        var maxThreshold = document.getElementById("maxThreshold").value;
        var statusDisplay = document.getElementById("routeStatus");
        
        errorCounter = 0;
	


        var startMarker = new google.maps.Marker({
            position: new google.maps.LatLng(-27.504328, 153.025498),
            map: map,
            title: 'Start'
        });
        markerArray.push(startMarker);

        var route1;
        if (currentSensor == "temperature") {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "acceleration") {
            if (1.1 < maxThreshold && 2.1 < maxThreshold && 3.1 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "humidity") {
            if (15 > minThreshold && 15 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "pressure") {
            if (7 > minThreshold && 7 < maxThreshold) {
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
                errorCounter += 1;
            }
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
        if (currentSensor == "temperature") {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "acceleration") {
            if (0.6 < maxThreshold && 0.7 < maxThreshold && 0.4 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "humidity") {
            if (8 > minThreshold && 8 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "pressure") {
            if (4 > minThreshold && 4 < maxThreshold) {
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
                errorCounter += 1;
            }
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
        if (currentSensor == "temperature") {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "acceleration") {
            if (0.3 < maxThreshold && 0.2 < maxThreshold && 0.1 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "humidity") {
            if (18 > minThreshold && 18 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "pressure") {
            if (5.2 > minThreshold && 5.2 < maxThreshold) {
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
                errorCounter += 1;
            }
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
        if (currentSensor == "temperature") {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "acceleration") {
            if (1.3 < maxThreshold && 1.0 < maxThreshold && 0.9 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "humidity") {
            if (17.5 > minThreshold && 17.5 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "pressure") {
            if (4.7 > minThreshold && 4.7 < maxThreshold) {
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
                errorCounter += 1;
            }
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
        if (currentSensor == "temperature") {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "acceleration") {
            if (2.3 < maxThreshold && 0.1 < maxThreshold && 1.5 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "humidity") {
            if (16 > minThreshold && 16 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "pressure") {
            if (1.1 > minThreshold && 1.1 < maxThreshold) {
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
                errorCounter += 1;
            }
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
        if (currentSensor == "temperature") {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "acceleration") {
            if (1.1 < maxThreshold && 0.8 < maxThreshold && 0.3 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "humidity") {
            if (15 > minThreshold && 15 < maxThreshold) {
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
                errorCounter += 1;
            }
        }

        else if (currentSensor == "pressure") {
            if (-1.1 > minThreshold && -1.1 < maxThreshold) {
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
                errorCounter += 1;
            }
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

        if (errorCounter > 0) {
            $("#routeStatus").addClass('error');
            statusDisplay.innerHTML = "Threshold exceeded - goods compromised!"
        } else {
            $("#routeStatus").removeClass('error');
            statusDisplay.innerHTML = "Goods safely transported."
        }

    });
});
