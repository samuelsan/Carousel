/* globals Phaser, BootState, PreloadState, OaktreeState, StreamState, MinigameState, MinimenuState, EndDemoState */

(function()
{
  'use strict';
  var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gamecontainer');
  var minigame = window.minigame = new MinigameState(game);

  game.state.add('Boot', BootState);
  game.state.add('Preload', PreloadState);
  game.state.add('Oaktree', OaktreeState);
  game.state.add('Stream', StreamState);
  game.state.add('Minimenu', MinimenuState);
  game.state.add('Minigame', minigame);
  game.state.add('EndDemo', EndDemoState);
  game.state.start('Minigame');
}());