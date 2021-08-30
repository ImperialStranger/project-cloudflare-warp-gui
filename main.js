const {app, BrowserWindow, Tray, Menu} = require('electron');
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
    mainWindow.loadFile('index.html')
    createTray();

    mainWindow.on('close', function (event) {
        event.preventDefault();
        mainWindow.hide();
    });
}

function createTray() {
    let tray = new Tray("./cloudflare.png");
    let trayMenu = Menu.buildFromTemplate([
      { label: "Show", click: function() { mainWindow.show() } },
      { type: "separator" },
      { label: "Exit", click: function() { app.exit() } },
    ]);
    tray.setToolTip("Cloudflare WARP");
    tray.setContextMenu(trayMenu);
}

app.on('ready', createWindow);
