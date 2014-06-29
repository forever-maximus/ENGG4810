Portable Logger Visualisation and Data Processing Software
========


Software system designed for portable logging device as part of final year team project. The system can be broken up into a few key components:

  - SSH and SFTP class for connecting to remote server to retrieve data uploaded by the device.
  - Uploader class for putting files onto remote server.
  - Yaml parser class for extracting data outputted from the device
  - Javascript generator class used to dynamically create the javascript required for the web application
  - HTML for each page (includes CSS and uses Bootstrap)

From this visualisations of the data can be produced using Google Maps API. This allows for routes to be calculated via the directions service based on GPS data from the portable logger. The user can then specify threshold values on different sensors (temperature, humidity, acceleration, pressure) to determine if the goods being transported were not compromised. This information is encoded on the route using colours.
