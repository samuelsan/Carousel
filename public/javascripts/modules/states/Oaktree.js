/* globals BootState, Phaser, Projectile */

'use strict';

var OaktreeState = function (game) 
{
  this.init = function(){ 
    this.game = game;
    this.launchX = 320;
    this.launchY = 325;
    this.acorn;
    this.squirrelhole;

    this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition); 
    // This passes now!
    // The function referred to by: game.state.start('MinigameState');
    // should have an init function that is passed a context (this) with a preconfigured game
    // object. That object has a plugins property (this.game.plugins), which can be added to
    // (ie. is not null)

    this.game.stateTransition.configure({
      duration: Phaser.Timer.SECOND * 3,
      ease: Phaser.Easing.Exponential.InOut,
      properties: {
        alpha: 0,
        scale: {
          x: 1.4,
          y: 1.4
        }
      }
    });       
  };
};    

var ground = [[1,796.5,929,558.5,1067,564,1067,800],[367,583.5,469,575.5,599,600.5,329,599.5,348.5,586],[824,582.5,735,606.5,780,586.5],[599,600.5,469,575.5,545,579.5,573,585.5],[61,621.5,1,796.5,10,632.5,17,624.5],[1067,564,1020,561.5,1052,559.5],[929,558.5,824,582.5,882,562.5],[329,599.5,1,796.5,259,603.5,285,597.5],[209,607.5,1,796.5,179,610.5,187,607.5],[677,611.5,1,796.5,631,606.5,667,607.5],[259,603.5,1,796.5,209,607.5,221,603.5],[469,575.5,367,583.5,391,575.5],[179,610.5,1,796.5,87,615.5,99,609.5],[10,632.5,1,796.5,0.5,636],[87,615.5,1,796.5,61,621.5],[599,600.5,631,606.5,1,796.5,329,599.5],[929,558.5,735,606.5,824,582.5],[703,610.5,1,796.5,677,611.5],[735,606.5,1,796.5,703,610.5]];

OaktreeState.prototype = {
  constructor: BootState,
  preload: function() {
    this.game.load.image('background',      '/javascripts/modules/units/backgrounds/oaktree.jpg');
    this.game.load.image('ground',          '/javascripts/modules/units/backgrounds/oakground.png');
    this.game.load.image('treetrunk',       '/javascripts/modules/units/backgrounds/treetrunk.png');
    this.game.load.image('squirrelhole',    '/javascripts/modules/units/backgrounds/squirrelhole.png');
    this.game.load.image('iris',            '/javascripts/modules/units/sprites/temp-iris.png');
    this.game.load.image('acorn',           '/javascripts/modules/units/sprites/Acorn.png');

    //audio
    this.game.load.audio('squirrel',        '/javascripts/modules/units/sounds/squirrel.wav');
    this.game.load.audio('acorn-on-ground', '/javascripts/modules/units/sounds/acorn_on_grass.wav');
  },
  create: function() {
    this.game.input.activePointer.leftButton.onDown.add(this.fireAcorn, this);
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.restitution = 0.3;
    this.game.physics.box2d.gravity.y = 500;
    this.game.physics.box2d.friction = 0.3;
    this.game.physics.box2d.setBoundsToWorld(); 

    this.squirrel = this.game.add.audio('squirrel'); 
    this.acorn_on_ground = this.game.add.audio('acorn-on-ground');      

    this.background = this.game.add.image(0,0, 'background');
    this.background.height = this.game.height;
    this.background.width = this.game.width;

    this.treetrunk = this.game.add.image(0,0, 'treetrunk');
    this.treetrunk.height = this.game.height;
    this.treetrunk.width = this.game.width;  

    this.ground = this.game.add.image(0,0, 'ground');
    this.ground.height = this.game.height;
    this.ground.width = this.game.width;  

    this.squirrelhole = this.game.add.sprite(0,0, 'squirrelhole');
    this.squirrelhole.height = this.game.height;
    this.squirrelhole.width = this.game.width;
    
    this.game.physics.box2d.enable(this.squirrelhole);
    this.squirrelhole.body.static = true;
    this.squirrelhole.body.setCircle(30, 805, 190);
    this.squirrelhole.body.addCircle(30, 805, 210);

    this.iris = this.game.add.image(300,200, 'iris');

    this.groundCollider = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0);
    this.groundCollider.static = true;

    function flatten(arr)
    {
      return arr.reduce(function(a, i) { return a.concat(i); }, []); // .inject([]) { |a,i| a << i }
    }

    function toPairs(arr)
    {
      var pairs = [];

      for(var i = 0; i < arr.length; i+= 2)
      {
        pairs.push({x: arr[i], y: arr[i+1]});
      }
      return pairs;
    }

    function fromPairs(arr)
    {
      return arr.reduce(function(a, i) { return a.concat(i.x, i.y); }, []);
    }

    function band(d, v1, v2)
    {
      return function(pair)
      {
        return pair[d] >= v1 && pair[d] <= v2;
      }
    }

    function byCoordinate(c)
    {
      return function(a, b)
      {
        if(a[c] == b[c]) { return  0; }
        if(a[c]  < b[c]) { return -1; }
        return 1;
      }
    }

    var points =  
      fromPairs(
        toPairs(
          flatten(ground)
        )
        .filter(band('y', 0, 700))
        .sort(byCoordinate('x'))
      );

    this.groundCollider.setChain(points);
  },
  render: function()
  {
    // game.debug.box2dWorld();
  },

  fireAcorn: function () {
    this.acorn = window.acorn = new Projectile(this.game, this.launchX, this.launchY);
    this.acorn.body.setBodyContactCallback(this.squirrelhole, this.squirrelholeCallback, this); 
  },

  squirrelholeCallback: function(body1, body2, fixture1, fixture2, begin) 
  {
    this.squirrel.play();
    this.acorn.destroy();
  }   

};