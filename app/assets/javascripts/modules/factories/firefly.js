define(['firefly'], function () {
  /**
  * FireFly defined
  */
  var FireFly = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'firefly');
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    game.physics.arcade.velocityFromRotation(game.rnd.angle(), 500, this.body.velocity);
  };

  /**
  * FireFly instance creation.
  */
  FireFly.prototype = Object.create(Phaser.Sprite.prototype);
  FireFly.prototype.constructor = FireFly;
  FireFly.prototype.update = function()
  {
    if(Math.ceil(Math.random() * 100) < 25)
    {
      game.physics.arcade.velocityFromRotation(this.angle + game.rnd.integerInRange(-60, 60), 500, this.body.velocity);
    }
  };

  /**
  * return the created FireFly object.
  */
  return FireFly;
});