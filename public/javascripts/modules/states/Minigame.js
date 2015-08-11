/* globals BootState, Phaser, FireFly */

'use strict';

var MinigameState = function (game) {
  this.game = game;
  this.arrayOfFlies = [];
};

MinigameState.prototype = {
  constructor: BootState,
  createFireFly: function()
  {
    var fly = new FireFly(this.game, this.game.world.randomX, this.game.world.randomY);
    this.game.add.existing(fly);
    this.arrayOfFlies.push(fly);
    fly.inputEnabled = true;
    fly.input.useHandCursor = true;
    fly.events.onInputDown.add(this.destroySprite, this);
    return fly;
  },
  preload: function() {
    // load the images //
    this.game.load.image('background', '/javascripts/modules/units/backgrounds/temp_minigamebackground.png');
    this.game.load.image('bugjar', '/javascripts/modules/units/sprites/bugjar.png');
    this.game.load.image('bugnet', '/javascripts/modules/units/sprites/bugnet.png');
    this.game.load.image('firefly', '/javascripts/modules/units/sprites/firefly.png');
    this.game.load.image('fireflysurprise', '/javascripts/modules/units/sprites/firefly-surprise.png');

    // load the sounds and music //
    this.game.load.audio('music', '/javascripts/modules/units/music/Firefly.mp3');
    this.game.load.audio('fireflybuzz', '/javascripts/modules/units/sounds/firefly_buzzing.wav');
    this.game.load.audio('netswish', '/javascripts/modules/units/sounds/net_swish.mp3');
    this.game.load.audio('firefly-catch', '/javascripts/modules/units/sounds/firefly_surprise.mp3');
  },
  create: function() {
    // initiate game physics //
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // add images//
    this.background = this.game.add.image(0,0, 'background');
    this.bugjar = this.game.add.image(0,0, 'bugjar');

    // add audio
    this.netswish = this.game.add.audio('netswish');
    this.fireflycatch = this.game.add.audio('firefly-catch');
    
    this.music = this.game.add.audio('music');
    this.music.volume = 3;
    this.music.loop = true;
    this.music.play();

    this.fireflybuzz = this.game.add.audio('fireflybuzz');
    this.fireflybuzz.volume = 2;
    this.fireflybuzz.loop = true;
    this.fireflybuzz.play();
 
    // Create a custom timer//
    this.timer = this.game.time.create();
      
    // Create a delayed event 1m and 30s from now//
    this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);
      
    // Start the timer//
    this.timer.start();

    for (var i=0; i < 6; i++) {
      this.createFireFly();
    }
    
    // add bugnet sprite and set up bugnet physics//
    this.bugnet = this.game.add.sprite(400, 300, 'bugnet');
    this.bugnet.anchor.setTo(1,1);
    this.game.physics.enable(this.bugnet, Phaser.Physics.ARCADE);

    // rotates bugnet when clicked //
    var orig = this.bugnet.angle;
    var tween;
    
    this.game.input.activePointer.leftButton.onDown.add(function(e) //jshint ignore:line
    {
      tween = this.game.add.tween(this.bugnet).to({ angle: this.bugnet.angle + 179 }, 100, 'Sine.easeInOut', true, -1);
      this.netswish.play();
    }.bind(this), null, 0);
    
    this.game.input.activePointer.leftButton.onUp.add(function(e) //jshint ignore:line
    {
      tween.stop();
      this.game.add.tween(this.bugnet).to({ angle: orig }, 100, 'Sine.easeInOut', true, -1);
    }.bind(this), null, 0);

    // displays the score and sets a default of 0 //
    this.score = 0;  
    this.labelScore = this.game.add.text(30, 55, '0', { font: '30px Arial', fill: '#ffffff' });
  },
  update: function()
  {
    this.bugnet.fixedRotation = this.game.physics.arcade.moveToPointer(this.bugnet, 0, this.game.input.activePointer, 50);
  },
  destroySprite: function (firefly) {
    this.fireflycatch.play();
    this.arrayOfFlies = this.arrayOfFlies.filter(function(fly)
    {
      return fly !== firefly;
    })
    firefly.destroy();

    setTimeout(this.createFireFly.bind(this), 1500);

    // updates the score
    this.updateScore();
  },
  updateScore: function () {
    // adds 1 to the score when bug is caught //
    this.score += 1;

    // changes the score text to the new score //
    if (this.labelScore) {
      this.labelScore.text = this.score;  
    }
  },
  render: function () {
    // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
    
    if (this.timer.running) {
      this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), 480, 70, "white", "60px Arial");
    }
    else {
      this.game.debug.text("Done!", 455, 70, "white", "60px Arial");
    }
  },
  endTimer: function() {
    // Stop the timer when the delayed event triggers
    this.timer.stop();
  },
  formatTime: function(s) {
    // Convert seconds (s) to a nicely formatted and padded time string
    var seconds = "0" + (s);
    return seconds.substr(-2);   
  }
};