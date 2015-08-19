/* globals BootState, Phaser */

'use strict';

var MinimenuState = function (game) {
  this.game = game;
}; 

MinimenuState.prototype = {
  constructor: BootState,
  preload: function() {
    this.game.load.image('background',    '/javascripts/modules/units/backgrounds/minigamebackground-alt.jpg');
    this.game.load.image('menu',          '/javascripts/modules/units/backgrounds/minigame-intro.png');
    this.game.load.image('playbutton',    '/javascripts/modules/units/sprites/playbutton.png');
    this.game.load.image('returnbutton',  '/javascripts/modules/units/sprites/returnbutton.png');

    this.game.load.audio('music',         '/javascripts/modules/units/music/Firefly.mp3');
  },
  create: function() {
    this.background = this.game.add.image(0,0, 'background');
    this.menu = this.game.add.image(0,0, 'menu');
    this.playbutton = this.game.add.button(600, 450, 'playbutton', this.playgame);
    this.returnbutton = this.game.add.button(175, 450, 'returnbutton', this.gotostory);

    this.highscore = this.game.add.text(670, 375, window.minigame.checkhighscore(), { font: '30px Arial', fill: '#ffffff'});
    this.score = this.game.add.text(335, 375, window.minigame.checkscore(), { font: '30px Arial', fill: '#ffffff'});

    if (!this.music || !this.music.isPlaying) {
      this.music = this.game.add.audio('music', 3, true);
      this.music.play();
    }
  },
  playgame: function() {
    game.state.start('Minigame', true, true);
  },
  gotostory: function() {
    game.state.start('Stream', true, true);
  },
  // update: function() {}
  shutdown: function() {
    this.game.stateTransition = null;
  }  
};