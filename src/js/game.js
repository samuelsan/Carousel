define(['firefly'], function () {
  var FireFly = require('firefly');

  var Game = {}; //this is like module.exports.
  
  Game.initializeGame = function () {
    var bugnet, background, firefly;

    var handlers = {
      preload: function () {
        game.load.image('background', 'assets/temp_minigamebackground.png');
        game.load.image('bugjar', 'assets/bugjar.png');
        game.load.image('bugnet', 'assets/bugnet.png');
        game.load.image('firefly', 'assets/firefly.png')
      },
      create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.image(0,0, 'background');
        bugjar = game.add.image(0,0, 'bugjar')
        var firefly = new FireFly(game, 200, 300);
        var firefly2 = new FireFly(game, 300, 400);
        var firefly3 = new FireFly(game, 400, 400);
        var firefly4 = new FireFly(game, 500, 400);
        var firefly5 = new FireFly(game, 600, 400);
        var firefly6 = new FireFly(game, 300, 400);
        game.add.existing(firefly);
        game.add.existing(firefly2);
        game.add.existing(firefly3);
        game.add.existing(firefly4);
        game.add.existing(firefly5);
        game.add.existing(firefly6);
        bugnet = game.add.sprite(400, 300, 'bugnet');
        bugnet.anchor.setTo(1,1);
        game.physics.enable(bugnet, Phaser.Physics.ARCADE);
        // bugnet.body.fixedRotation = true;

        var orig = bugnet.angle;
        var tween;
        game.input.activePointer.leftButton.onDown.add(function(e)
        {
          tween = game.add.tween(bugnet).to({ angle: bugnet.angle + 179 }, 100, "Sine.easeInOut", true, -1);
        }, null, 0);

        game.input.activePointer.leftButton.onUp.add(function(e)
        {
          tween.stop()
          game.add.tween(bugnet).to({ angle: orig }, 100, "Sine.easeInOut", true, -1);
        }, null, 0);
      },
      update: function () {
        bugnet.fixedRotation = game.physics.arcade.moveToPointer(bugnet, 0, game.input.activePointer, 50);
      }
    };

    var game = window.game = new Phaser.Game(1000, 800, Phaser.AUTO, 'phaser-example', {
      preload: handlers.preload,
      create:  handlers.create,
      update:  handlers.update
    });

  };

  Game.stopGame = function () {
  };

  return Game;
});
