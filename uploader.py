import paramiko
import getpass

""" Provides methods for converting CSV data into YAML.
*** Also for connecting to moss and uploading YAML data via SSH.
"""
class UploadData:

    yamlData = "samples:\n"
    ssh = 0
    username = ""
    password = 0

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
                line = line.rstrip('\n')
                line = line.split(',')
                self.yamlData += "    - temperature: " + line[9] + "\n"
                self.yamlData += "      acceleration: [" + line[4] + ", " + line[5] + ", " + line[6] + "]\n"
                self.yamlData += "      pressure: " + line[7] + "\n"
                self.yamlData += "      humidity: " + line[8] + "\n"
                if line[2] != "" and line[3] != "":
                    tmp = float(line[2][0:2]) + float(line[2][2:])/60
                    self.yamlData += "      latitude: " + str(tmp) + "\n"
                    tmp = float(line[3][0:2]) + float(line[3][2:])/60
                    self.yamlData += "      longitude: " + str(tmp) + "\n"
                self.yamlData += '\n'
        print self.yamlData

    def connect(self):
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        privateKey = self.generateKeys()
        self.ssh.connect(hostname='moss.labs.eait.uq.edu.au', username=self.username,
                    pkey=privateKey)

    def generateKeys(self):
        while(True):
            self.username = raw_input("Username: ")
            self.password = getpass.getpass("Password: ")
            try:
                self.ssh.connect(hostname='moss.labs.eait.uq.edu.au', username=self.username,
                        password=self.password)
                break
            except:
                print "Incorrect username or password - try again"
        privateKey = paramiko.RSAKey.generate(1024)
        publicKey = privateKey.get_name() + ' ' + privateKey.get_base64()
        self.ssh.exec_command('mkdir -p ~/.ssh/')
        self.ssh.exec_command('echo "%s" >> ~/.ssh/authorized_keys2' % publicKey)
        self.ssh.close()
        return privateKey

    def upload(self):
        #sftp = self.ssh.open_sftp()
        #sftp.put(self.yamlData, '/home/groups/engg4810g/engg4810g11/uploaded.yaml')
        self.ssh.exec_command('echo "%s" > /home/groups/engg4810g/engg4810g11/upload.yaml' % self.yamlData)
        #sftp.close()
        self.ssh.close()

def main():
    uploader = UploadData()

if __name__ == "__main__":
    main()
