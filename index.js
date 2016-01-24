
var Bleacon = require('bleacon');
var ibeaconCache = new Array();


var beacons = {
  '55b51beb4f204829ace4ec33a6bed4f411': 'Gimbal 1',
  '55b51beb4f204829ace4ec33a6bed4f412': 'Gimbal 2',
  '07775dd0111b11e491910800200c9a66896947780': 'XY Blue',
};

Bleacon.on('discover', function(bleacon) {

    var myID = 0;
    var guid = bleacon.uuid + bleacon.major + bleacon.minor;
    var name = beacons[guid];
    if (name === "Gimbal 1") {
      console.log(name);
      //console.log ( guid + ":" + bleacon.uuid + "," + bleacon.major + "," +  bleacon.minor );

      var signal = [bleacon.rssi/5];
      if (bleacon.rssi < 0) {
        /*
           var xs = new Array(Math.floor(-bleacon.rssi/2) + 1).join('x');
           console.log("proximity: "+bleacon.proximity);
           console.log("rssi:" +xs);
           */
        console.log(calculateDistance(bleacon.rssi));
      } else {
        console.log("Bad rssi");
      }
    }

});//end on discover

Bleacon.startScanning();

var calculateDistance = (rssi) => {
  var txPower = -59 //hard coded power value. Usually ranges between -59 to -65

    if (rssi == 0) {
      return -1.0; 
    }

  var ratio = rssi*1.0/txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  }
  else {
    var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;    
    return distance;
  }
} 
