define([
  'Phaser',

  'modules/extensions/MyExtension',
  'modules/units/MyUnit',
  'modules/factories/MyFactory'
], function (Phaser) {

  var PhaserGame = function (w, h) {
    return new Phaser.Game(1000, 800, Phaser.AUTO);
  };

  return PhaserGame;
});