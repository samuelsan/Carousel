define([], function () {
  var FireFly = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'firefly');

    this.anchor.set(0.5, 0.5);

    this.game.time.events.loop(500, function() {      
      var randomX = 50 - (Math.random() * 100);
      var randomY = 50 - (Math.random() * 100);

      var targetX = this.x + randomX;
      var targetY = this.y + randomY;

      if (targetX < 0) {
        targetX = 0;
      }

      if (targetX > this.world.width - (this.width - 100)) {
        targetX = this.world.width - this.width;
      }

      if (targetY < 0) {
        targetY = 0;
      }

      if (targetY > this.world.height) {
        targetY = this.world.height - this.height;
      }

      this.game.add.tween(this).to(
        {
          x: targetX,
          y: targetY
        }, 500, Phaser.Easing.Quadratic.InOut, true);
      }, this)

      };

      FireFly.prototype             = Object.create(Phaser.Sprite.prototype);
      FireFly.prototype.constructor = FireFly;
      FireFly.prototype.update      = function() { };

    return FireFly;
  });
