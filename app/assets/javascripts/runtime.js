requirejs.config({
  paths: {
    Phaser: 'bower_components/phaser-official/build/phaser'
  }
});

require([
  'assets/javascripts/modules/CarouselGame',
  'assets/javascripts/modules/states/Boot',
  'assets/javascripts/modules/states/Preload',
  'assets/javascripts/modules/states/Oaktree'
  'assets/javascripts/modules/states/Stream'
  'assets/javascripts/modules/states/Minimenu'
  'assets/javascripts/modules/states/Minigame'
  'assets/javascripts/modules/states/EndDemo'
], function (CarouselGame, BootState, PreloadState, OaktreeState, StreamState, MinimenuState, MinigameState, EndDemoState) {

  var game = new PhaserGame(640, 480);
  game.state.add('Boot', BootState);
  game.state.add('Preload', PreloadState);
  game.state.add('Oaktree', OaktreeState);
  game.state.add('Stream', StreamState);
  game.state.add('Minimenu', MinimenuState);
  game.state.add('Minigame', MinigameState);
  game.state.add('EndDemo', EndDemoState);
  game.state.start('Boot');
});