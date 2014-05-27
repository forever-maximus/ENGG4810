import yaml

class SensorDataManager:

    sensorValues = []
    fileList = []

    def __init__(self):
        pass

    def __init__(self, fileList):
        self.fileList = fileList
        self.heatMapData()

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

    # Same as above but for multiple files used for heatmap data
    def heatMapData(self):

        for fname in self.fileList:
            unstructuredData = ""
            with open (fname, 'r') as sensorFile:
                while True:
                    line = sensorFile.readline()
                    if not line:
                        break
                    unstructuredData += line
            if unstructuredData != "":
                yamlData = yaml.load(unstructuredData)
                self.sensorValues += yamlData['samples']

    # Generates a nicer display of the gathered data by simply printing
    # out each dictionary on a new line. Useful for debugging.
    def displayData(self):
        
        for i in self.sensorValues:
            print i
