/* globals BootState, Phaser */

'use strict';

var MinimenuState = function (game) {
  this.game = game
};

MinimenuState.prototype = {
  constructor: BootState,
  preload: function() {
    this.game.load.image('background', 'javascripts/modules/units/backgrounds/temp_minigamebackground.png');
    this.game.load.image('menu', 'javascripts/modules/units/backgrounds/minigame-intro.png');
  },
  create: function() {
    this.background = this.game.add.image(0,0, 'background');
    this.menu = this.game.add.image(0,0, 'menu');
  },
  update: function() {}
};