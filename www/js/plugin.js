const INTERVAL_UPDATE_WIFI = 7;
const INTERVAL_UPDATE_4G = 14;

// function to check the status of the device connection.
function checkStatus() {
  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN] = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI] = 'WiFi connection';
  states[Connection.CELL_2G] = 'Cell 2G connection';
  states[Connection.CELL_3G] = 'Cell 3G connection';
  states[Connection.CELL_4G] = 'Cell 4G connection';
  states[Connection.CELL] = 'Cell generic connection';
  states[Connection.NONE] = 'No network connection';

  //alert('Connection type: ' + states[networkState]);
  if (networkState == 'wifi' || networkState == 'unknown') {
    console.log('updating data');
    IntervalUpdateInD = INTERVAL_UPDATE_WIFI;
    init(IntervalUpdateInD, getListArmor);
  } else {
    console.log("data won't get updated");
    getListArmor();
  }
}

// function to call an other function when the device gets online.
function onOnline() {
  checkStatus();
}
// function called when the device is ready.
function onDeviceReady() {
  console.log('device ready');
}

document.addEventListener('deviceready', onDeviceReady, true);
document.addEventListener('online', checkStatus, false);
