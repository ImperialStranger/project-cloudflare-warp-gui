const { app, BrowserWindow } = require('electron');
app.commandLine.appendSwitch("disable-http-cache");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width:640,
        height:480,
        icon: './cloudflare.png',
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false,
            preload: 'preload.js'
        }
    })
    mainWindow.loadFile('index.html');
    mainWindow.setMenuBarVisibility(false);
}

app.on('ready', createWindow);
