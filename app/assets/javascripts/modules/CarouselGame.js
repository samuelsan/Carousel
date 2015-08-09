define(['Phaser',

  'modules/extensions/',
  'modules/units/backgrounds/oaktree.jpg',
  'modules/units/backgrounds/stream.jpg',
  'modules/units/backgrounds/temp_minigamebackground.png',
  'modules/units/music/Firefly.mp3',
  'modules/units/sounds/firefly_surprise.mp3',
  'modules/factories/firefly'
], function (Phaser) {

  var PhaserGame = function (w, h) {
    return new Phaser.Game(w, h, Phaser.AUTO);
  };

  return PhaserGame;
});