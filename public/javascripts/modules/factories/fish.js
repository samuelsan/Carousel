(function()
{
    "use strict";

    var Fish = window.Fish =  function (game, x, y)
    {
        Phaser.Sprite.call(this, game, x, y, 'fish');
        
        this.game = game;
        this.game.physics.box2d.enable(this);
        
        var v = this.getLaunchVelocity();
        this.body.velocity.x = v.x;
        this.body.velocity.y = v.y;
    };

    /**
      * Fish instance creation.
    */
    Fish.prototype = Object.create(Phaser.Sprite.prototype);
    Fish.prototype.constructor = Fish;

    Fish.prototype.getLaunchVelocity = function() 
    {
        var dx = this.game.input.mousePointer.x - this.x;
        var dy = this.game.input.mousePointer.y - this.y;
        dx *= 2;
        dy *= 2;
        
        return { x: dx, y: dy };    
    }
  
    Fish.prototype.render = function()
    {
        this.game.debug.box2dWorld();
    };
}());
