/* globals BootState, Phaser */

'use strict';

var StreamState = function (game) {
  this.bmd = null;
  this.game = game;
  this.launchX = 765;
  this.launchY = 540;
  this.iris = null;
  this.points = {
  'x': [985, 770, 845],
  'y': [770, -320, 730]
  };
  this.timer1Stopped = true;
};

StreamState.prototype = 
{
  constructor: BootState,
  preload: function() 
  {
    this.game.load.image('background',  '/javascripts/modules/units/backgrounds/stream.jpg');
    this.game.load.image('fish',        '/javascripts/modules/units/sprites/fish.png');
    this.game.load.atlasJSONHash('walk-right', '/javascripts/modules/units/sprites/Walking/walk-right.png', '/javascripts/modules/units/sprites/Walking/walk-right.json');
    this.game.load.image('stand', '/javascripts/modules/units/sprites/iris-standing.png');
  },
  create: function()
  {
    this.background = this.game.add.image(0,0, 'background');
    this.background.height=this.game.height;
    this.background.width=this.game.width;

    this.iris = game.add.sprite(-150, 300, 'walk-right');
    this.iris.scale.setTo(0.5,0.5);
    this.iris.animations.add('walk-right');
    this.iris.animations.play('walk-right', 3, true);

    this.game.add.sprite('stand');

    var recClick = new Phaser.Rectangle(700, 500, 250, 250);

    var handlePointerDown = function(pointer)
    {
      // console.log(pointer.x, pointer.y);
      var inside = recClick.contains(pointer.x,pointer.y);
      if(inside)
      {
        if(!this.timer1Stopped)
        {
          return;
        }
        //   this.fishJump();
        // }
        // console.log('click');

        this.increment = 10 / this.game.width;  
        this.i = 0;
        this.timer1Stopped = true;
        this.timer1 = null;

        // create the fish sprite
        // follow the motion path by using the plot function 
        this.fishSprite = this.game.add.sprite(0, 0, "fish");
        this.fishSprite.anchor.setTo(0.5, 0.5);

        if (this.timer1Stopped)
        {
          this.timer1Stopped = false;
          this.timer1 = this.game.time.create(true);
          this.timer1.loop(0.01, this.plot, this);
          this.timer1.start();
        }
      }
      else
      {
        console.log('outside');
      }
    };

    this.game.input.onDown.add(handlePointerDown, this);

    // this.game.physics.startSystem(Phaser.Physics.BOX2D);
    // this.game.physics.box2d.restitution = 0.3;
    // this.game.physics.box2d.gravity.y = 500;
    // this.game.physics.box2d.setBoundsToWorld();

    var tween = this.game.add.tween(this.iris).to({x: 500}, 3000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function()
    {
      this.iris.loadTexture('stand', 0);
    }, this);
  },
  // fishJump: function () {
  //   var fish = new Fish(this.game, this.launchX, this.launchY);
  //   this.game.add.existing(fish);
  // },

  plot: function()
  { 
    var posx = this.math.bezierInterpolation(this.points.x, this.i);
    var posy = this.math.bezierInterpolation(this.points.y, this.i);
    this.fishSprite.x = posx;
    this.fishSprite.y = posy;
    this.i += this.increment;
    if (posy > 845)
    {
      this.timer1.stop();
      this.timer1.destroy();
      this.i = 0;
      this.timer1Stopped = true;
      this.fishSprite.destroy();
    }
  }
};


