const { exec } = require('child_process');
const fs = require('fs');

var connectedPhrase = "Success\nStatus update: Connected\n";
var disconnectedPhrase = "Success\nStatus update: Disconnected\n";
var iconClass;
var o;

var connectionMode = document.getElementById("modes");
var btn_conncet = document.getElementById("btn-connect");
var monitor_conncetion_status = document.getElementById("connection-status");
var connection_icon = document.getElementById("connection-icon");

function refreshAppPage() {
  window.location.reload();
}

function executeCommand(cmd) {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      fs.writeFileSync('error.pdnr', error, function(){
        console.log('Data Updated');
      })
    }
    fs.writeFileSync('output.pdnr', stdout, function(){
      console.log('Data Updated');
    })
  })
  var output = fs.readFileSync('output.pdnr', 'utf-8')
  o = output;
}

function loadMode() {
  var cm = fs.readFileSync('mode.pdnr', 'utf-8');
  if (cm != null && cm != '') {
    exec(cm, (error) => {
      if (error) throw error;
    })
    connectionMode.value = cm;
    console.log('i');
  }
  else {
    fs.writeFileSync('mode.pdnr', 'warp-cli set-mode dot')
    exec(cm, (error) => {
      if (error) throw error;
    })
    connectionMode.value = 'warp-cli set-mode dot';
    console.log('e');
  }
}

function getConnectionMode() {
  var mode = connectionMode.options[connectionMode.selectedIndex].value;
  executeCommand(mode);
  fs.writeFileSync('mode.pdnr', mode)
}

function connect() {
  monitor_conncetion_status.innerText = "Your connection is private";
  changeButtonClass("btn-outline-success", "btn-danger");
  changeIconClass(iconClass, "fa-lock");
  btn_conncet.innerText = "Disconnect";
  btn_conncet.onclick = disconnect;
  executeCommand("warp-cli connect");
  executeCommand("warp-cli status");
}

function disconnect() {
  monitor_conncetion_status.innerText = "Your connection is not private";
  changeButtonClass("btn-danger", "btn-outline-success");
  changeIconClass(iconClass, "fa-lock-open"); //fa-lock-open fa-lock"
  btn_conncet.innerText = "Connect";
  btn_conncet.onclick = connect;
  executeCommand("warp-cli disconnect");
  executeCommand("warp-cli status");
}

function changeIconClass(oldClassName, newClassName) {
  connection_icon.classList.remove(oldClassName);
  connection_icon.classList.add(newClassName);
}

function changeButtonClass(oldClassName, newClassName) {
  var btn_conncet = document.getElementById("btn-connect");
  btn_conncet.classList.remove(oldClassName);
  btn_conncet.classList.add(newClassName);
}

function setStatus() {
  if (o == connectedPhrase) {
    monitor_conncetion_status.innerText = "Your connection is private";
    changeButtonClass(null, "btn-danger");
    iconClass = "fa-lock";
    // changeIconClass(null, "fa-lock")
    btn_conncet.innerText = "Disconnect";
    btn_conncet.onclick = disconnect;
  }
  if (o == disconnectedPhrase) {
    monitor_conncetion_status.innerText = "Your connection is not private";
    changeButtonClass(null, "btn-outline-success");
    iconClass = "fa-lock-open";
    // changeIconClass(null, "fa-lock-open")
    btn_conncet.innerText = "Connect";
    btn_conncet.onclick = connect;
  }
  changeIconClass(null, iconClass);
}

connectionMode.addEventListener('input', getConnectionMode)

window.addEventListener("load", executeCommand("warp-cli status"));
window.addEventListener("load", setStatus);
window.addEventListener("load", function(){
  document.body.classList.add('light-theme');
});
window.addEventListener('load', loadMode)