/* globals Phaser, BootState, PreloadState, OaktreeState, StreamState, MinigameState, MinimenuState, EndDemoState */

(function()
{
  'use strict';
  var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gamecontainer');
  var boot = window.boot = new BootState(game);
  var preload = window.preload = new PreloadState(game);
  var oaktree = window.oaktree = new OaktreeState(game);
  var stream = window.stream = new StreamState(game);
  var minimenu = window.minimenu = new MinimenuState(game);
  var minigame = window.minigame = new MinigameState(game);
  var enddemo = window.enddemo = new EndDemoState(game);

  game.state.add('Boot', boot);
  game.state.add('Preload', preload);
  game.state.add('Oaktree', oaktree);
  game.state.add('Stream', stream);
  game.state.add('Minimenu', minimenu);
  game.state.add('Minigame', minigame);
  game.state.add('EndDemo', enddemo);
  game.state.start('Oaktree');
}());