loadAPI(7);

// Remove this if you want to be able to use deprecated methods without causing
// script to stop. This is useful during development.
host.setShouldFailOnDeprecatedUse(true);

host.defineController("Charles",
   "parameter-test",
   "0.1",
   "49f8883d-59dc-4aac-9cb9-6430ac00799d",
   "audioishi");

var SIZE = 8;

// It appears the only way to control parameters from a script to access the
// "remote controls" on the "perform page." Note that you can rename these, but
// they can only map to one single knob. To have a remote control change
// multiple parameters, route it to a 'macro' in the modulation section.
function init() {
   var trackBank = host.createMainTrackBank(1, 1, 1);
   var track = trackBank.getItemAt(0);
   var deviceBank = track.createDeviceBank(5);
   var device = deviceBank.getDevice(0);
   var rcCursor = device.createCursorRemoteControlsPage('mods', SIZE, '');

   for (var i = 0; i < SIZE; i++){
      // Perform preset page
      rcCursor.getParameter(i).name().markInterested();
   }

   device.name().addValueObserver(function(name) {
      println('Device renamed: ' + name);
   });

   track.name().addValueObserver(function(name) {
      println('Track renamed: ' + name);
      for (var i = 0; i < SIZE; i++){
         // 'rc' is a com.bitwig.extension.controller.api.RemoteControl
         // some useful methods are inherited from 'SettableRangedValue'
         // (RangedValue have an upper/lower limit)
         // - set(value [, resolution])
         // - setRaw(value [, resolution])
         // - setImmediately(value)
         // - modulatedValue() // returns a RangedValue
         // - reset()
         // - value() // returns a SettableRangedValue
         // What is the difference between:
         // - .name().set(name) // This is displayed in the UI
         // - .setLabel(label)  // I'm not sure what this is for - there is no "getLabel"
         var rc = rcCursor.getParameter(i);

         println('remote controls parameter name:' + rc.name().get());
      }
   });
}


function flush() {
   // TODO: Flush any output to your controller here.
}

function exit() {

}