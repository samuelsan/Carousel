define([
  'Phaser'
], function (Phaser) {

  var StreamState = function (game) {};

  StreamState.prototype = {
    constructor: StreamState,
    preload: function() {
      game.load.image('background', 'app/assets/javascripts/modules/units/backgrounds/stream.jpg')
    },
    create: function() {
      background = game.add.image(0,0, 'background');
    },
    update: function() {}
  };

  return StreamState;
});