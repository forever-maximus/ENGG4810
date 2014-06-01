import paramiko

""" Provides methods for converting CSV data into YAML.
*** Also for connecting to moss and uploading YAML data via SSH.
"""
class UploadData:

    yamlData = "samples:\n"
    ssh = 0
    username = ""

    def __init__(self):
        self.textToYaml()
        self.connect()
        self.upload()
        
    def textToYaml(self):
        
        with open('sensorData/upload/uploadTest.txt') as textFile:
            while True:
                line = textFile.readline()
                if not line:
                    break
                line = line.strip()
                line = line.split(',')
                self.yamlData += "    - temperature: " + line[9] + "\n"
                self.yamlData += "      acceleration: [" + str(float(line[4])/25) + ", " + str(float(line[5])/25) + ", " + str(float(line[6])/25) + "]\n"
                self.yamlData += "      pressure: " + line[7] + "\n"
                self.yamlData += "      humidity: " + line[8] + "\n"
                if line[2] != "" and line[3] != "":
                    tmp = float(line[2][0:2]) + float(line[2][2:])/60
                    self.yamlData += "      latitude: " + str(tmp) + "\n"
                    #tmp = float(line[3][0:2]) + float(line[3][2:])/60
                    tmp = line[3].split('.')
                    tmp = float(tmp[0][:-2]) + float(tmp[0][-2:] + '.' + tmp[1])/60
                    self.yamlData += "      longitude: " + str(tmp) + "\n"
                self.yamlData += '\n'
        print self.yamlData

    def connect(self):
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        self.username = raw_input("Username: ")
        key = paramiko.RSAKey.from_private_key_file('key.ppk')
        self.ssh.connect(hostname='moss.labs.eait.uq.edu.au', username=self.username,
                    pkey=key)
        print "Successfully connected to server.\n"

    def upload(self):
        self.ssh.exec_command('echo "%s" > /home/groups/engg4810g/engg4810g11/upload.yaml' % self.yamlData)
        print "Successfully uploaded files.\n"
        self.ssh.close()

def main():
    uploader = UploadData()

if __name__ == "__main__":
    main()
