import paramiko
import os
import getpass

""" Provides methods for connecting to cloud via SSH and copying selected
*** sensor Data to local host via SFTP.     
"""
class DataRetriever:

    ssh = 0
    heatmap = False
    fileList = []
    username = ""
    password = 0
    currentDirectory = "/home/groups/engg4810g/"

    def __init__(self):
        self.connect()

    def connect(self):
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
##        self.username = raw_input("Username: ")
##        self.password = getpass.getpass("Password: ")
##        self.ssh.connect(hostname='moss.labs.eait.uq.edu.au', username=self.username,
##                        password=self.password)
        privateKey = self.generateKeys()
        self.ssh.connect(hostname='moss.labs.eait.uq.edu.au', username=self.username,
                    pkey=privateKey)
        print "Successfully connected.\n"
        print "Navigate to file for download using 'cd <foldername>' and then use command 'get <filename>' to select the file for analysis.\n"
        print "Or alternatively use the command 'getHeatMap <foldername>' to pull an entire folder of data files.\n"
        self.readInput()

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
                sftp = self.ssh.open_sftp()
                try:
                    sftp.get(self.currentDirectory + commands[1], 'sensorData/sensorSamples.txt')
                    print "Retrieving file for analysis and display"
                    sftp.close()
                    self.closeConnection()
                    return
                except:
                    sftp.close()
                    print "Check your spelling!\n"
            elif (commands[0] == "getHeatMap"):
                sftp = self.ssh.open_sftp()
                stdin, stdout, stderr = self.ssh.exec_command("find " + self.currentDirectory +
                                                              commands[1] + "/ -type f")
                output = stdout.readlines()
                counter = 1
                for dataFile in output:
                    transferedFile = "sensorData/heatmapData/heatmap%s.txt" % (counter)
                    sftp.get(dataFile.rstrip('\n'), transferedFile)
                    self.fileList.append(transferedFile)
                    counter += 1
                sftp.close()
                self.closeConnection()
                self.heatmap = True
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

