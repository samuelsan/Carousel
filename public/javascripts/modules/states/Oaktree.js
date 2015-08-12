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
    this.game.load.image('ground', 'javascripts/modules/units/backgrounds/oakground.png');
    this.game.load.image('treetrunk', 'javascripts/modules/units/backgrounds/treetrunk.png');
    this.game.load.image('squirrelhole', 'javascripts/modules/units/backgrounds/squirrelhole.png');
    this.game.load.image('iris', 'javascripts/modules/units/sprites/temp-iris.png');
    this.game.load.image('acorn', 'javascripts/modules/units/sprites/Acorn.png');
  },
  create: function() {
    this.game.input.activePointer.leftButton.onDown.add(this.fireAcorn, this);
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.restitution = 0.3;
    this.game.physics.box2d.gravity.y = 500;
    this.game.physics.box2d.setBoundsToWorld();   

    // this.background = this.game.add.image(0,0, 'background');
    // this.background.height = this.game.height;
    // this.background.width = this.game.width;

    this.treetrunk = this.game.add.image(0,0, 'treetrunk');
    this.treetrunk.height = this.game.height;
    this.treetrunk.width = this.game.width;  

    this.ground = this.game.add.image(0,0, 'ground');
    this.ground.height = this.game.height;
    this.ground.width = this.game.width;  
    // this.game.physics.box2d.enable(this.ground);
    // this.game.add.existing(this.ground);
    // this.ground.body.static = true;

    this.squirrelhole = this.game.add.sprite(0,0, 'squirrelhole');
    this.squirrelhole.height = this.game.height;
    this.squirrelhole.width = this.game.width;
    this.squirrelhole.anchor.set(0,0);
    this.game.physics.box2d.enable(this.squirrelhole);
    this.squirrelhole.body.static = true;

    this.iris = this.game.add.image(300,200, 'iris');

    this.groundCollider = new Phaser.Physics.Box2D.Body(this.game, null, this.game.world.width / 2, this.game.world.height - 3);
    this.groundCollider.static = true;
    this.groundCollider.setRectangle(this.game.world.width, 3, 0, 0, 0);
  },
  render: function()
  {
    game.debug.box2dWorld();
  },
  collisionHandler: function(acorn, ground, acornBody, groundBody, touching, contact)
  {
    // console.log("Collided", this, acorn, ground);
    // acorn.kill();
  },
  fireAcorn: function () {
    var acorn = window.acorn = new Projectile(this.game, this.launchX, this.launchY);
    acorn.body.setBodyContactCallback(this.groundCollider, this.collisionHandler, this);
  }
};