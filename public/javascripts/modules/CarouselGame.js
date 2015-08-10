  var PhaserGame = function (w, h) {
    return new Phaser.Game(w, h, Phaser.AUTO);
  };

  var game = new PhaserGame(640, 480);
  game.state.add('Boot', BootState);
  game.state.add('Preload', PreloadState);
  game.state.add('Oaktree', OaktreeState);
  game.state.add('Stream', StreamState);
  game.state.add('Minimenu', MinimenuState);
  game.state.add('Minigame', MinigameState);
  game.state.add('EndDemo', EndDemoState);
  game.state.start('Minigame');
