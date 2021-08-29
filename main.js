const {app, BrowserWindow} = require('electron');
app.commandLine.appendSwitch("disable-http-cache");

function createWindow() {
    let mainWindow = new BrowserWindow({
        width:640,
        height:480,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    })
    mainWindow.loadFile('index.html')
}

app.on('ready', createWindow);
