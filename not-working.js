var noble = require('noble');
var Bleacon = require('bleacon');


var uuid = '55b51beb4f204829ace4ec33a6bed4f411';
noble.on('stateChange', (state) => {
  console.log(state);
  if (state === 'poweredOn') {
    noble.startScanning();

  }

});

/*
noble.on('discover', (peripheral)  => {
  console.log(peripheral.advertisement);
    console.log('Found device with local name: ' + peripheral.advertisement.localName);
    console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
    console.log();
});
*/
//var uuid = 'f7826da6-4fa2-4e98-8024-bc5b71e0893e';
//var uuid = '30d0628fff2847c0bdfca220cddb7fd5';

noble.on('discover', (peripheral) => { 
  var macAddress = peripheral.uuid;
  var rss = peripheral.rssi;
  var localName = peripheral.advertisement.localName; 
  console.log('found device: ', macAddress, ' ', localName, ' ', rss);   
});

