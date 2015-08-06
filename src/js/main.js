var FireFly = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'firefly');

    this.game.time.events.loop(300, function() {
      this.game.add.tween(this).to({x: this.game.world.randomX, y: this.game.world.randomY}, 250, Phaser.Easing.Quadratic.InOut, true);
      }, this)

};

FireFly.prototype = Object.create(Phaser.Sprite.prototype);
FireFly.prototype.constructor = FireFly;

FireFly.prototype.update = function() {

};

(function () {
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
      bugnet.anchor.setTo(0.5, 0.5);
      game.physics.enable(bugnet, Phaser.Physics.ARCADE);
      // bugnet.body.fixedRotation = true;
    },
    
    update: function () {
      bugnet.fixedRotation = game.physics.arcade.moveToPointer(bugnet, 0, game.input.activePointer, 50);

      if (game.input.activePointer.isDown)
      {
        bugnet.angle += 42;
      }
    }
  };

  var game = new Phaser.Game(1000, 800, Phaser.AUTO, 'phaser-example', {
    preload: handlers.preload,
    create: handlers.create,
    update: handlers.update
  });

}) 

();