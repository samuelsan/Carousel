define([
  'Phaser'
], function (Phaser) {

  var OaktreeState = function (game) {};

  OaktreeState.prototype = {
    constructor: OaktreeState,
    preload: function() {
      game.load.image('background', 'app/assets/javascripts/modules/units/backgrounds/oaktree.jpg')
    },
    create: function() {
      background = game.add.image(0,0, 'background');
    },
    update: function() {}
  };

  return OaktreeState;
});