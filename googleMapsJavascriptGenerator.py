# Reads from sensor logger file and generates javascript for google maps

import os
import paramiko
import yaml

""" Provides methods for connecting to cloud via SSH and copying selected
*** sensor Data to local host via SFTP.     
"""
class DataRetriever:

    ssh = 0
    currentDirectory = "/home/groups/engg4810g/"

    def __init__(self):
        self.connect()

    def connect(self):
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        privateKey = paramiko.RSAKey.from_private_key_file("TP2PrivateOpenSSHKey.ppk")
        self.ssh.connect(hostname='moss.labs.eait.uq.edu.au', username='s4238289',
                    pkey=privateKey)
        print "Successfully connected.\n"
        print "Navigate to file for download using 'cd <foldername>' and then use command 'get <filename>' to select the file for analysis\n"
        self.readInput()

    def readInput(self):
        #self.testConnection()
        while (True):
            stdin, stdout, stderr = self.ssh.exec_command("ls " + self.currentDirectory)
            output = stdout.readlines()
            self.displayDirectory(output)
            value = raw_input("> ")
            commands = value.split()
            if not commands:
                print "Try using 'cd <directory>' or 'get <filename>'\n"
            elif (commands[0] == "cd"):
                if (commands[1] == ".."):
                    self.currentDirectory = "/home/groups/engg4810g/"
                else:
                    self.currentDirectory += commands[1] + "/"
            elif (commands[0] == "get"):
                print "Retrieving file for analysis and display"
                sftp = self.ssh.open_sftp()
                sftp.get(self.currentDirectory + commands[1], 'sensorData/sensorSamples.txt')
                sftp.close()
                self.closeConnection()
                return
            else:
                print "'" + commands[0] + "' is not a valid command!"
                print "Try using 'cd <directory>' or 'get <filename>'\n"

    def testConnection(self):
        stdin, stdout, stderr = self.ssh.exec_command("pwd")
        output = stdout.readlines()
        print output

    def displayDirectory(self, output):
        prettyDisplay = ""
        counter = 1
        for option in output:
            withoutNewline = option.split()
            if counter % 3 == 0:
                prettyDisplay += withoutNewline[0] + "\n"
            else:
                prettyDisplay += withoutNewline[0] + "\t"
            counter += 1
        print prettyDisplay + "\n"

    def closeConnection(self):
        self.ssh.close()


class SensorDataManager:

    sensorValues = []

    def __init__(self):
        pass

    # Opens data file pulled from cloud server and parses the YAML.
    def gatherData(self):

        unstructuredData = ""
        
        with open('sensorData/sensorSamples.txt', 'r') as sensorFile:
            while True:
                line = sensorFile.readline()
                if not line:
                    break
                unstructuredData += line

        yamlData = yaml.load(unstructuredData)
        self.sensorValues = yamlData['samples']

    # Generates a nicer display of the gathered data by simply printing
    # out each dictionary on a new line. Useful for debugging.
    def displayData(self):
        
        for i in self.sensorValues:
            print i


class JavascriptGenerator:

    sensorValues = []

    def __init__(self, sensorValues):
        self.sensorValues = sensorValues

    def generate(self):

        newJsFile = open('javascript/googleMapsCode.js', 'w')

        IAmTheBatmanJS = """
var map = null;
var directionsService;
var polylineArray = [];
var markerArray = [];

function initializeMap() {

    directionsService = new google.maps.DirectionsService();

    var mapOptions = {
      center: new google.maps.LatLng(%s, %s),
      zoom: 15
    };

    map = new google.maps.Map(document.getElementById("mapCanvas"),
            mapOptions);
            
}
	  
google.maps.event.addDomListener(window, 'load', initializeMap);

var enableButton = function () {
    $("#generateRoute").removeAttr("disabled");
}
""" % (self.sensorValues[0]['latitude'], self.sensorValues[0]['longitude'])

        IAmTheBatmanJS += """

"""
        
        IAmTheBatmanJS += """

window.onload = function () {
"""
        for i in self.sensorValues[0]:
            
            IAmTheBatmanJS += """

    if ('%s' != 'temperature' && '%s' != 'acceleration' && '%s' != 'latitude' &&
            '%s' != 'longitude' && '%s' != 'time') {
        var select = document.getElementById("sensorSelector");
        var option = document.createElement('option');
        option.text = option.value = '%s';
        select.add(option, 0);
    }
""" % (i, i, i, i, i, i)
            
        IAmTheBatmanJS += """
};
"""
        
        IAmTheBatmanJS += """

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
	
"""

        IAmTheBatmanJS += """

        var startMarker = new google.maps.Marker({
            position: new google.maps.LatLng(%s, %s),
            map: map,
            title: 'Start'
        });
        markerArray.push(startMarker);
""" % (self.sensorValues[0]['latitude'], self.sensorValues[0]['longitude'])

        counter = 0
        previous = {}
        
        for sample in self.sensorValues:
            if counter == 0:
                previous = sample
                counter += 1
                continue
            else:
                IAmTheBatmanJS += """
        var route%s;
        if (currentSensor == "temperature") {
            if (%s > minThreshold && %s < maxThreshold) {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });	
            } else {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
                errorCounter += 1;
            }
        }
""" % (counter, sample['temperature'], sample['temperature'], counter,
       counter)

                IAmTheBatmanJS += """
        else if (currentSensor == "acceleration") {
            if (%s < maxThreshold && %s < maxThreshold && %s < maxThreshold) {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
            } else {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
                errorCounter += 1;
            }
        }
""" % (sample['acceleration'][0], sample['acceleration'][1],
       sample['acceleration'][2], counter, counter)
                
                if 'humidity' in sample :
                    IAmTheBatmanJS += """
        else if (currentSensor == "humidity") {
            if (%s > minThreshold && %s < maxThreshold) {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
            } else {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
                errorCounter += 1;
            }
        }
""" % (sample['humidity'], sample['humidity'], counter, counter)

                if 'pressure' in sample:
                    IAmTheBatmanJS += """
        else if (currentSensor == "pressure") {
            if (%s > minThreshold && %s < maxThreshold) {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#00FF00",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
            } else {
                route%s = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
                errorCounter += 1;
            }
        }
""" % (sample['pressure'], sample['pressure'], counter, counter)

                IAmTheBatmanJS += """

        var request = {
            origin: new google.maps.LatLng(%s, %s),
            destination: new google.maps.LatLng(%s, %s),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
        
                var path = response.routes[0].overview_path;
                
                for (var i=0; i<path.length;i++) {
                    var point = path[i];
                    route%s.getPath().push(point);
                }
                
            }
        });

        route%s.setMap(map);
        polylineArray.push(route%s);
""" % (previous['latitude'], previous['longitude'],
       sample['latitude'], sample['longitude'],
       counter, counter, counter)
       
                previous = sample
                counter += 1

        IAmTheBatmanJS += """

        var endMarker = new google.maps.Marker({
            position: new google.maps.LatLng(%s, %s),
            map: map,
            title: 'End'
        });
        markerArray.push(endMarker);

        $("#generateRoute").attr("disabled", true);
        setTimeout(function() { enableButton() }, 3000);

        if (errorCounter > 0) {
            statusDisplay.innerHTML = "Threshold exceeded - goods compromised!"
        } else {
            statusDisplay.innerHTML = "Goods safely transported."
        }

    });
});
""" % (self.sensorValues[len(self.sensorValues)-1]['latitude'], self.sensorValues[len(self.sensorValues)-1]['longitude'])

        newJsFile.write(IAmTheBatmanJS)
        newJsFile.close()

def main():

    dataRetriever = DataRetriever()

    sensorDataReference = SensorDataManager()
    sensorDataReference.gatherData()
    sensorDataReference.displayData()

    getItDone = JavascriptGenerator(sensorDataReference.sensorValues)
    getItDone.generate()

    os.startfile('initialMap.html')
    

if __name__ == "__main__":
    main()
