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

      var group = game.add.group();

      for (var i = 0; i < 6; i++)
      {
        //  They are evenly spaced out on the X coordinate, with a random Y coordinate
        firefly = group.create(120 * i, game.rnd.integerInRange(100, 400), 'firefly');
      }
      game.physics.enable(group, Phaser.Physics.ARCADE);
      firefly.body.collideWorldBounds = true;
      firefly.body.bounce.setTo(1, 1);

      bugnet = game.add.sprite(400, 300, 'bugnet');
      bugnet.name = 'bugnet';
      bugnet.anchor.setTo(0.5, 0.5);
      game.physics.enable(bugnet, Phaser.Physics.ARCADE);
      bugnet.body.collideWorldBounds = true;
      bugnet.body.checkCollision.up = false;
      bugnet.body.checkCollision.down = false;
      bugnet.body.allowRotation = false;
    },
    update: function () {
      bugnet.rotation = game.physics.arcade.moveToPointer(bugnet, 0, game.input.activePointer, 100);
    }
  };
  var game = new Phaser.Game(1000, 800, Phaser.AUTO, 'phaser-example', {
    preload: handlers.preload,
    create: handlers.create,
    update: handlers.update
  });
})();
