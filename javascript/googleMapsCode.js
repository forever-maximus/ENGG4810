
var map = null;
var directionsService;
var polylineArray = [];

function initializeMap() {

    directionsService = new google.maps.DirectionsService();

    var mapOptions = {
      center: new google.maps.LatLng(-27.5007161, 153.0152265),
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
        if (85 < temperatureThreshold) {
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
            origin: new google.maps.LatLng(-27.5007161, 153.0152265),
            destination: new google.maps.LatLng(-27.5006935, 153.0159966),
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
        if (-11.8461538462 < temperatureThreshold) {
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
            origin: new google.maps.LatLng(-27.5006935, 153.0159966),
            destination: new google.maps.LatLng(-27.5002658, 153.0165954),
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
        if (-10.358974359 < temperatureThreshold) {
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
            origin: new google.maps.LatLng(-27.5002658, 153.0165954),
            destination: new google.maps.LatLng(-27.4997289, 153.0168759),
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
        if (-9.53846153846 < temperatureThreshold) {
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
            origin: new google.maps.LatLng(-27.4997289, 153.0168759),
            destination: new google.maps.LatLng(-27.4992175, 153.0171493),
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
        if (-20 < temperatureThreshold) {
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
            origin: new google.maps.LatLng(-27.4992175, 153.0171493),
            destination: new google.maps.LatLng(-27.4988071, 153.0176349),
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
        if (85 < temperatureThreshold) {
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
            origin: new google.maps.LatLng(-27.4988071, 153.0176349),
            destination: new google.maps.LatLng(-27.49836, 153.0178448),
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

        var route7;
        if (85 < temperatureThreshold) {
            route7 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route7 = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

        var request = {
            origin: new google.maps.LatLng(-27.49836, 153.0178448),
            destination: new google.maps.LatLng(-27.4979644, 153.0173964),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
        
                var path = response.routes[0].overview_path;
                
                for (var i=0; i<path.length;i++) {
                    var point = path[i];
                    route7.getPath().push(point);
                }
                
            }
        });

        route7.setMap(map);
        polylineArray.push(route7);

        var route8;
        if (58.0769230769 < temperatureThreshold) {
            route8 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route8 = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

        var request = {
            origin: new google.maps.LatLng(-27.4979644, 153.0173964),
            destination: new google.maps.LatLng(-27.4984118, 153.0168697),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
        
                var path = response.routes[0].overview_path;
                
                for (var i=0; i<path.length;i++) {
                    var point = path[i];
                    route8.getPath().push(point);
                }
                
            }
        });

        route8.setMap(map);
        polylineArray.push(route8);

        var route9;
        if (73.5897435897 < temperatureThreshold) {
            route9 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route9 = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

        var request = {
            origin: new google.maps.LatLng(-27.4984118, 153.0168697),
            destination: new google.maps.LatLng(-27.4984821, 153.0163998),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
        
                var path = response.routes[0].overview_path;
                
                for (var i=0; i<path.length;i++) {
                    var point = path[i];
                    route9.getPath().push(point);
                }
                
            }
        });

        route9.setMap(map);
        polylineArray.push(route9);

        var route10;
        if (-10.8717948718 < temperatureThreshold) {
            route10 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route10 = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

        var request = {
            origin: new google.maps.LatLng(-27.4984821, 153.0163998),
            destination: new google.maps.LatLng(-27.4983342, 153.0157136),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
        
                var path = response.routes[0].overview_path;
                
                for (var i=0; i<path.length;i++) {
                    var point = path[i];
                    route10.getPath().push(point);
                }
                
            }
        });

        route10.setMap(map);
        polylineArray.push(route10);

        var route11;
        if (-11.0256410256 < temperatureThreshold) {
            route11 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route11 = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

        var request = {
            origin: new google.maps.LatLng(-27.4983342, 153.0157136),
            destination: new google.maps.LatLng(-27.498855, 153.0153059),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
        
                var path = response.routes[0].overview_path;
                
                for (var i=0; i<path.length;i++) {
                    var point = path[i];
                    route11.getPath().push(point);
                }
                
            }
        });

        route11.setMap(map);
        polylineArray.push(route11);

        var route12;
        if (-10.9743589744 < temperatureThreshold) {
            route12 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route12 = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

        var request = {
            origin: new google.maps.LatLng(-27.498855, 153.0153059),
            destination: new google.maps.LatLng(-27.4992519, 153.0149273),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
        
                var path = response.routes[0].overview_path;
                
                for (var i=0; i<path.length;i++) {
                    var point = path[i];
                    route12.getPath().push(point);
                }
                
            }
        });

        route12.setMap(map);
        polylineArray.push(route12);

        var route13;
        if (-10.7692307692 < temperatureThreshold) {
            route13 = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route13 = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

        var request = {
            origin: new google.maps.LatLng(-27.4992519, 153.0149273),
            destination: new google.maps.LatLng(-27.4997525, 153.0146003),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
        
                var path = response.routes[0].overview_path;
                
                for (var i=0; i<path.length;i++) {
                    var point = path[i];
                    route13.getPath().push(point);
                }
                
            }
        });

        route13.setMap(map);
        polylineArray.push(route13);


        $("#generateRoute").attr("disabled", true);
        setTimeout(function() { enableButton() }, 3000);

    });
});
