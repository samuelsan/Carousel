/* globals BootState, Phaser, Projectile */

'use strict';

var OaktreeState = function (game) 
{
  this.game = game;
  this.launchX = 320;
  this.launchY = 325;
};

OaktreeState.prototype = {
  constructor: BootState,
  preload: function() {
    this.game.load.image('background', 'javascripts/modules/units/backgrounds/oaktree.jpg');
    this.game.load.image('iris', 'javascripts/modules/units/sprites/temp-iris.png');
    this.game.load.image('acorn', 'javascripts/modules/units/sprites/Acorn.png');
  },
  create: function() {
    this.background = this.game.add.image(0,0, 'background');
    this.iris = this.game.add.image(300,200, 'iris');
    this.game.input.activePointer.leftButton.onDown.add(this.fireAcorn, this);
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.restitution = 0.3;
    this.game.physics.box2d.gravity.y = 500;
    this.game.physics.box2d.setBoundsToWorld();
  },
  fireAcorn: function () {
    var acorn = new Projectile(this.game, this.launchX, this.launchY);
    this.game.add.existing(acorn);
  }
};