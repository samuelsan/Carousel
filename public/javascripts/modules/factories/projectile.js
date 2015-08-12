(function() {
  'use strict'

  var Projectile = window.Projectile = function (game, x, y)
    this.game = game;
    Phaser.Sprite.call(this, game, this.iris.positionx, this.iris.positiony, 'projectile');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
  });
