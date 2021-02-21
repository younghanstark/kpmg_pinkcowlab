## MaGam: Mask Recognition Project
Project for KPMG Ideathon 2021    
PinkCow Lab.

MaGam is a service that determines whether people who pass through the subway gate wear masks. You can quickly and accurately determine whether a large number of people are wearing masks with a single camera, such as a smartphone and a webcam. With our software, people can follow the quarantine rules and reduce the risk of COVID-19 infection.

### How to Setup in Local
1. Install Python 3 from https://www.python.org/
1. Install OpenCV from https://opencv.org/
1. Install Node.js from https://nodejs.org/en/
1. Copy your Python 3 install path. In terminal, following command is available.
    ```
    python
    >>> import sys
    >>> sys.executable
    ```
1. Paste it into /server/python-node.js
    ```
    let options = {
    pythonPath: "( /* Paste It into Here */ )",
    scriptPath: "../core",
    };
    ```
1. Change your current directory into /server, start server.
    ```
    cd server
    node server
    ```
1. With your prefferd browser(We recommend Chrome), enter to http://localhost:3000
1. Enjoy!

### How to Try in Our Server
1. With your prefferd browser(We recommend Chrome), enter to https://mymagam.com
1. Enjoy!