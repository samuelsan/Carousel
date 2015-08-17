/* globals BootState, Phaser, Fish */

// 'use strict';

// var PhaserGame = function() {
//   this.bmd = null;
//   // points arrays - one for x and one for y
//   this.points = {
//     'x': [0, 200, 120, 456, 640],
//     'y': [0, 300, 120, 156, 480]
//   };
// };

// PhaserGame.prototype = {

//   preload: function() {
//     game.load.crossOrigin = "Anonymous";
//     game.load.image('fish', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/173252/angry-fish.png');
//   },

//   create: function() {

//     this.stage.backgroundColor = '#eee';
//     this.increment = 1 / game.width;  
//     this.i = 0;
//     this.timer1Stopped = true;
//     this.timer1 = null;

//     // Somewhere to draw to
//     this.bmd = this.add.bitmapData(this.game.width, this.game.height);
//     this.bmd.addToWorld();
//     // Draw the path
//     for (var j = 0; j < 1; j += this.increment) {
//       var posx = this.math.bezierInterpolation(this.points.x, j);
//       var posy = this.math.bezierInterpolation(this.points.y, j);
//       this.bmd.rect(posx, posy, 3, 3, 'rgba(245, 0, 0, 1)');
//     }

//     // create the fish sprite - we will make this sprite  
//     // follow the motion path by using the plot function 
//     this.fishSprite = game.add.sprite(0, 0, "fish");
//     this.fishSprite.anchor.setTo(0.5, 0.5);

//   },

//   update: function() {
//     // this just takes care of resetting
//     // the timer so the movement repeats
//     if (this.timer1Stopped) {
//       this.timer1Stopped = false;
//       this.timer1 = this.game.time.create(true);
//       this.timer1.loop(.01, this.plot, this);
//       this.timer1.start();
//     }
//   },

//   plot: function() {
    
//     var posx = this.math.bezierInterpolation(this.points.x, this.i);
//     var posy = this.math.bezierInterpolation(this.points.y, this.i);
//     this.fishSprite.x = posx;
//     this.fishSprite.y = posy;
//     this.i += this.increment;
//     if (posy > 480) {
//       this.timer1.stop();
//       this.timer1.destroy();
//       this.i = 0;
//       this.timer1Stopped = true;
//     }
//   }

// };


'use strict';

var StreamState = function (game) {
  this.game = game;
  this.launchX = 765;
  this.launchY = 540;
  this.points = {
  'x': [765, 770, 770, 775, 730, 700, 690, 680, 665],
  'y': [540, 765, 930, 1100, 1330, 1150, 920, 760, 40]
  };
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

    // this.game.add.tween(this.fish).to({ y: 300 }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

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


