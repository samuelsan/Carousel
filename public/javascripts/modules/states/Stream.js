/* globals BootState, Phaser */

'use strict';

var StreamState = function (game) {
  this.game = game
};

StreamState.prototype = {
  constructor: BootState,
  preload: function() {
    this.game.load.image('background', '/javascripts/modules/units/backgrounds/stream.jpg')
  },
  create: function() {
    this.background = this.game.add.image(0,0, 'background');
  },
  update: function() {}
};