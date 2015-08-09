define([
  'Phaser'
], function (Phaser) {

  var PreloadState = function (game) {};

  PreloadState.prototype = {
    constructor: PreloadState,
    preload: function() {
      game.load.image('title', 'app/assets/javascripts/modules/units/backgrounds/...')
    },
    create: function() {
      title = game.add.image(0,0, 'title');
    },
    update: function() {}
  };

  return PreloadState;
});