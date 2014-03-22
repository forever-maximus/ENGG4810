# Reads from sensor logger file and generates javascript for google maps

class SensorDataManager:

    sensorValues = []

    def __init__(self):
        pass

    # Opens file and reads in each line gathering related segments
    # which are passed to _processData() function.
    def gatherData(self):

        with open('sensorSamples.txt', 'r') as sensorFile:
            
            while True:
                data = ""
                line = sensorFile.readline()
                if not line:
                    break
                if line.startswith("sample"):
                    continue
                
                line = line.strip()
                
                while line != "":
                    line = line.strip()
                    if line.startswith("-"):
                        line = line.replace("-", "")
                        line = line.strip()
                    data += line + "~"
                    line = sensorFile.readline()
                    line = line.strip()
                    
                self._processData(data)

    # Processes gathered data into the sensorValue field such that it
    # is a list of dictionaries.
    def _processData(self, data):

        data = data.split('~')
        tempDict = {}
        counter = 0
        
        for i in data:
            if (i != ""):
                temp = data[counter].split(':')
                temp[1] = float(temp[1])
                tempDict[temp[0]] = temp[1]
                counter += 1
                
        self.sensorValues.append(tempDict)

    # Generates a nicer display of the gathered data by simply printing
    # out each dictionary on a new line.
    def displayData(self):

        for i in self.sensorValues:
            print i


class JavascriptGenerator:

    sensorValues = []

    def __init__(self, sensorValues):
        self.sensorValues = sensorValues

    def generate(self):

        newJsFile = open('googleMapsCode.js', 'w')

        test = [-27.497687, 153.021066]

        IAmTheBatmanJS = """

var map = null;

function initializeMap() {

	var mapOptions = {
	  center: new google.maps.LatLng(%s, %s),
	  zoom: 15
	};
	
	map = new google.maps.Map(document.getElementById("mapCanvas"),
		mapOptions);
		
}
	  
google.maps.event.addDomListener(window, 'load', initializeMap);

$(function () {
	$("#generateRoute").click(function() {

	var temperatureThreshold = document.getElementById("tempThreshold");
	
""" % (self.sensorValues[0]['latitude'], self.sensorValues[0]['longitude'])
        
        for sample in self.sensorValues:
            pass

        newJsFile.write(IAmTheBatmanJS)
        newJsFile.close()

def main():

    sensorDataReference = SensorDataManager()
    sensorDataReference.gatherData()
    sensorDataReference.displayData()

    getItDone = JavascriptGenerator(sensorDataReference.sensorValues)
    getItDone.generate()
    

if __name__ == "__main__":
    main()
