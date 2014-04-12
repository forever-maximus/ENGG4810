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

$(function () {
	$("#generateRoute").click(function() {

        for (i = 0; i < polylineArray.length; i++) {
            polylineArray[i].setMap(null);
        }

        var temperatureThreshold = document.getElementById("maxThreshold").value;
	
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
        if (%s < temperatureThreshold) {
            route%s = new google.maps.Polyline({
                path: [],
                strokeColor: "#00FF00",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });	
        } else {
            route%s = new google.maps.Polyline({
                path: [],
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        }

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
""" % (counter, sample['temperature'], counter, counter, 
       previous['latitude'], previous['longitude'],
       sample['latitude'], sample['longitude'],
       counter, counter, counter)
       
                previous = sample
                counter += 1

        IAmTheBatmanJS += """

        $("#generateRoute").attr("disabled", true);
        setTimeout(function() { enableButton() }, 3000);

    });
});
"""

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
