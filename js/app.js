var connectedPhrase = "Status update: Connected\n";
var disconnectedPhrase = "Status update: Disconnected\n";
var iconClass;
var o;

var theme_switch = document.getElementById("theme-switch");
var connectionMode = document.getElementById("modes");
var btn_conncet = document.getElementById("btn-connect");
var monitor_conncetion_status = document.getElementById("connection-status");
var connection_icon = document.getElementById("connection-icon");

function executePython(cmd, indx) {
  // Nothing
}

function checkTheme() {
  
  var themeCookie = Cookies.get('theme');
  if (typeof themeCookie == 'undefined') {
    Cookies.set('theme', 'light-theme', { expires: 366, path: '' })
    setTheme(null, 'light-theme')
    theme_switch.checked = false;
  }
  else {
    setTheme(null, themeCookie);
    theme_switch.checked = (themeCookie == 'light-theme') ? false : (themeCookie == 'dark-theme') ? true : "";
  }
}

function switchTheme(){
  var theme = (theme_switch.checked == false) ? 'light-theme' : (theme_switch.checked == true) ? 'dark-theme' : "";
  var prevtheme = (theme == 'light-theme') ? 'dark-theme' : (theme == 'dark-theme') ? 'light-theme' : "";
  setTheme(prevtheme, theme);
  Cookies.set('theme', theme, { expires: 366, path: '' })
}

function setTheme(prevtheme, newTheme) {
  document.body.classList.remove(prevtheme)
  document.body.classList.add(newTheme);
}

function getConnectionMode() {
  var mode = connectionMode.options[connectionMode.selectedIndex].value;
//   executePython(mode, "0");
//   executePython("warp-cli settings", "1")
}

function connect() {
  monitor_conncetion_status.innerText = "Your connection is private";
  changeButtonClass("btn-outline-success", "btn-danger");
  changeIconClass(iconClass, "fa-lock");
  btn_conncet.innerText = "Disconnect";
  btn_conncet.onclick = disconnect;
//   executePython("warp-cli connect", "0");
//   executePython("warp-cli status", "1");
}

function disconnect() {
  monitor_conncetion_status.innerText = "Your connection is not private";
  changeButtonClass("btn-danger", "btn-outline-success");
  changeIconClass(iconClass, "fa-lock-open"); //fa-lock-open fa-lock"
  btn_conncet.innerText = "Connect";
  btn_conncet.onclick = connect;
//   executePython("warp-cli disconnect", "0");
//   executePython("warp-cli status", "1");
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

window.addEventListener("load", checkTheme)
window.addEventListener("load", function () {
  theme_switch.addEventListener("input", switchTheme)
})
// window.addEventListener("load", executePython("warp-cli status", "1"));
window.addEventListener("load", setStatus);