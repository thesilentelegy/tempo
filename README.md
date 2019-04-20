![tempo logo](/public/images/logo.png)

# tempo
### A physical time-tracker with a webapp :computer::hourglass_flowing_sand::sparkles:

_Project by Deitro Dazo, Paula Joy Aliposa, and Alyssa Tubi_

**tempo is an Arduino-based time-tracker built for desktop use. Paired with the tracking device is the tempo webapp built using ExpressJS and Vue.** 

This project was created as a requirement for the DMT course in PSHS-EVC.

## Setup Arduino device

- Download [Arduino IDE](http://arduino.cc/en/main/software)
- Plug in the Arduino device via USB
- Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmataPlus
- Click the "Upload" button.

## Installation

This system has only been tested in the Windows 10 OS. Support for other OS is not available.

### Step 1: Clone repository

Clone this repository to your local system 

```bash
git clone git://github.com/thesilentelegy/tempo.git && cd tempo
```

### Step 2: Setup johnny-five dependencies

This system uses the [johnny-five](http://johnny-five.io/) framework to allow the device and webapp to communicate. 

#### Prerequisites
**Important:** You must first install the [Build Tools for Visual Studio 2019](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2017). If problems in installing are encountered, try uninstalling older versions of the build tools.

- Install [Node.js](https://nodejs.org) >= 0.10.x **32-bit**
- `npm install --global --add-python-to-path --production windows-build-tools`
- Install node-gyp `npm install -g node-gyp`

### Step 3: Initialize project

After setting up the necessary libraries for johnny-five, you can now install the other dependencies used by the project.

```bash
npm install
```


