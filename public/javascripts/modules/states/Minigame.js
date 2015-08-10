var MinigameState = function (game) {};
  var bugnet, background, firefly, timer, timerEvent, text, arrayOfFlies;
  var arrayOfFlies = [];

  MinigameState.prototype = {
    constructor: BootState,
    preload: function() {
      // load the images //
      game.load.image('background', '/javascripts/modules/units/backgrounds/temp_minigamebackground.png');
      game.load.image('bugjar', '/javascripts/modules/units/sprites/bugjar.png');
      game.load.image('bugnet', '/javascripts/modules/units/sprites/bugnet.png');
      game.load.image('firefly', '/javascripts/modules/units/sprites/firefly.png');
      game.load.image('fireflysurprise', '/javascripts/modules/units/sprites/firefly-surprise.png');

      // load the sounds and music //
      game.load.audio('music', '/javascripts/modules/units/music/Firefly.mp3');
      game.load.audio('fireflybuzz', '/javascripts/modules/units/sounds/firefly_buzzing.wav');
      game.load.audio('netswish', '/javascripts/modules/units/sounds/net_swish.mp3');
      game.load.audio('firefly-catch', '/javascripts/modules/units/sounds/firefly_surprise.mp3');
    },
    create: function() {
      // initiate game physics //
      game.physics.startSystem(Phaser.Physics.ARCADE);
      
      // add images//
      background = game.add.image(0,0, 'background');
      bugjar = game.add.image(0,0, 'bugjar')

      // add audio
      netswish = game.add.audio('netswish')
      fireflycatch = game.add.audio('firefly-catch')
      
      music = game.add.audio('music')
      music.volume = 3;
      music.loop = true;
      music.play();

      fireflybuzz = game.add.audio('fireflybuzz')
      fireflybuzz.volume = 2;
      fireflybuzz.loop = true;
      fireflybuzz.play();
   
      // Create a custom timer//
      timer = game.time.create();
        
      // Create a delayed event 1m and 30s from now//
      timerEvent = timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);
        
      // Start the timer//
      timer.start();

      function generateFireFly() {
        return new FireFly(game, game.world.randomX, game.world.randomY);
      }

      for (var i=0; i< 6; i++) {
        var newFireFly = generateFireFly();
        game.add.existing(newFireFly);
        arrayOfFlies.push(newFireFly);
      }
      
      // add bugnet sprite and set up bugnet physics//
      bugnet = game.add.sprite(400, 300, 'bugnet');
      bugnet.anchor.setTo(1,1);
      game.physics.enable(bugnet, Phaser.Physics.ARCADE);

      // rotates bugnet when clicked //
      var orig = bugnet.angle;
      var tween;
      game.input.activePointer.leftButton.onDown.add(function(e)
      {
        tween = game.add.tween(bugnet).to({ angle: bugnet.angle + 179 }, 100, "Sine.easeInOut", true, -1);
        netswish.play();
      }, null, 0);
      game.input.activePointer.leftButton.onUp.add(function(e)
      {
        tween.stop()
        game.add.tween(bugnet).to({ angle: orig }, 100, "Sine.easeInOut", true, -1);
      }, null, 0);

      // destroys the sprite on click //
      arrayOfFlies.forEach((function(fly) {
        fly.inputEnabled = true;
        fly.input.useHandCursor = true;
        fly.events.onInputDown.add(function () {
          this.destroySprite(fly);
        }, this);
      }).bind(this));

      // displays the score and sets a default of 0 //
      this.score = 0;  
      this.labelScore = game.add.text(40, 55, "0", { font: "30px Arial", fill: "#ffffff" });
    },
    update: function() {
      // moves the net with the mouse pointer //
      bugnet.fixedRotation = game.physics.arcade.moveToPointer(bugnet, 0, game.input.activePointer, 50);

      // generates a new firefly after one has been caught //
      function generateFireFly() {
        return new FireFly(game, 200,300)
      }

      // an if statement to check if there are less than 6 fireflies in the array, then generate a new one //
      if (arrayOfFlies.length < 6){
        for (var i=0; i< 1; i++) {
          var newFireFly = generateFireFly();
          game.add.existing(newFireFly);
          arrayOfFlies.push(newFireFly);
          newFireFly.inputEnabled = true;
          newFireFly.input.useHandCursor = true;
          newFireFly.events.onInputDown.add(function () {
            this.destroySprite(arrayOfFlies[i]);
          }, this);
        }
      }
    },
    destroySprite: function (firefly) {
      // plays the noise when caught //
      fireflycatch.play();

      // destroys the instance of firefly and removes last instance from firefly array //
      firefly.destroy();
      arrayOfFlies.pop();

      // updates the score //
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
      
      if (timer.running) {
        game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 480, 70, "white", "60px Arial");
      }
      else {
        game.debug.text("Done!", 455, 70, "white", "60px Arial");
      }
    },
    endTimer: function() {
      // Stop the timer when the delayed event triggers
      timer.stop();
    },
    formatTime: function(s) {
      // Convert seconds (s) to a nicely formatted and padded time string
      var seconds = "0" + (s);
      return seconds.substr(-2);   
    }
  };