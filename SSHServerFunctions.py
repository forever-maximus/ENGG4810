import paramiko
import os

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
        print "Navigate to file for download using 'cd <foldername>' and then use command 'get <filename>' to select the file for analysis.\n"
        print "Or alternatively use the command 'getHeatMap <foldername>' to pull an entire folder of data files.\n"
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
                files = sftp.listdir(self.currentDirectory + commands[1])
                print files
                counter = 1
                for dataFile in files:
                    transferedFile = "sensorData/heatmapData/heatmap%s.txt" % (counter)
                    sftp.get(self.currentDirectory + commands[1] + "/" + dataFile, transferedFile)
                    counter += 1
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

