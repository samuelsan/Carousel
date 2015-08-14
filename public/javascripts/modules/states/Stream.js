/* globals BootState, Phaser, Fish */

'use strict';

var StreamState = function (game) {
  this.game = game;
  this.launchX = 765;
  this.launchY = 540;
};

StreamState.prototype = {
  constructor: BootState,
  preload: function() {
    this.game.load.image('background',  '/javascripts/modules/units/backgrounds/stream.jpg');
    this.game.load.image('fish',        '/javascripts/modules/units/sprites/fish.png');
  },
  create: function() {
    this.background = this.game.add.image(0,0, 'background');
    this.background.height=this.game.height;
    this.background.width=this.game.width;

    var recClick = new Phaser.Rectangle(700,500,250,250);

    var handlePointerDown = function(pointer) {
      console.log(pointer.x, pointer.y);
      var inside = recClick.contains(pointer.x,pointer.y);
      if(inside)
      {
        this.fishJump();
      }
    };

    this.game.input.onDown.add(handlePointerDown, this);

    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.restitution = 0.3;
    this.game.physics.box2d.gravity.y = 500;
    this.game.physics.box2d.setBoundsToWorld();
  },
  fishJump: function () {
    var fish = new Fish(this.game, this.launchX, this.launchY);
    this.game.add.existing(fish);
  },

  render: function() {
    this.game.debug.box2dWorld();
  },
};


