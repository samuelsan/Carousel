/* globals BootState, Phaser, Projectile */

'use strict';

// this.inventory = []

var OaktreeState = function (game) 
{
  this.init = function(){ 
    this.game = game;
    this.launchX = 320;
    this.launchY = 325;
    this.acorn;
    this.key;
    this.bugnet;
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
    this.game.load.atlasJSONHash('iris-throwing', '/javascripts/modules/units/sprites/Throwing/iris-throwing.png', '/javascripts/modules/units/sprites/Throwing/iris-throwing.json');

    this.game.load.atlasJSONHash('iris-swing', '/javascripts/modules/units/sprites/Tireswing/iris-tire.png', '/javascripts/modules/units/sprites/Tireswing/iris-tire.json');

    this.game.load.atlasJSONHash('walk-right', '/javascripts/modules/units/sprites/Walking/walk-right.png', '/javascripts/modules/units/sprites/Walking/walk-right.json');

    this.game.load.image('background',      '/javascripts/modules/units/backgrounds/oaktree.jpg');
    this.game.load.image('ground',          '/javascripts/modules/units/backgrounds/oakground.png');
    this.game.load.image('treetrunk',       '/javascripts/modules/units/backgrounds/treetrunk.png');
    this.game.load.image('squirrelhole',    '/javascripts/modules/units/backgrounds/squirrelhole.png');
    // this.game.load.image('iris',            '/javascripts/modules/units/sprites/iris-standing.png');
    this.game.load.image('arrow_right',     '/javascripts/modules/units/sprites/arrow_right.png');
    this.game.load.image('acorn',           '/javascripts/modules/units/sprites/Acorn.png')
    this.game.load.image('branch',          '/javascripts/modules/units/backgrounds/branch.png');
    this.game.load.image('bugnet',          '/javascripts/modules/units/sprites/bugnet.png');
    this.game.load.image('key',             '/javascripts/modules/units/sprites/key.png');

    //audio
    this.game.load.audio('background-music', '/javascripts/modules/units/music/oaktreemusic.mp3');
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
    this.music = this.game.add.audio('background-music');

    this.music.volume = 2;
    this.music.play();    

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

    // IRIS THROWING

    // this.iris = game.add.sprite(100, 180, 'iris-throwing');
    // this.iris.scale.setTo(0.5,0.5);

    // this.iris.animations.add('throw');

    // this.iris.animations.play('throw', 2.5, false);

    // IRIS TIRESWINGING

    // this.iris = game.add.sprite(100, 180, 'iris-swing');
    // this.iris.scale.setTo(0.5,0.5);

    // this.iris.animations.add('swing');

    // this.iris.animations.play('swing', 2.5, false);

    // IRIS WALKING

    // this.iris = game.add.sprite(100, 180, 'walk-right');
    // this.iris.scale.setTo(0.5,0.5);

    // this.iris.animations.add('walk-right');

    // this.iris.animations.play('walk-right', 3, true);

    // this.bugnet = this.game.add.image(150,100,'bugnet');
    // this.game.physics.box2d.enable(this.bugnet);
    // this.bugnet.body.static = true;
    // this.bugnet.body.setRec(150, 100, 190, 30);

    // this.branch = this.game.add.image(0,0, 'branch');
    // this.branch.height = this.game.height;
    // this.branch.width = this.game.width;

    this.groundCollider = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0);
    this.groundCollider.static = true;

    this.arrow_right = this.game.add.image(game.width - 100, game.height/2 - 100, 'arrow_right');
    this.arrow_right.inputEnabled = true;
    this.arrow_right.events.onInputDown.add(function () {
    game.stateTransition.to('Stream', true, true);
    });      

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
  update: function()
  {
    // this.iris.x += 3;
    // if(this.iris.x > 800)
    // {
    //     this.iris.x = -50;
    // }
  },

  render: function()
  {
    // game.debug.box2dWorld();
  },

  fireAcorn: function () {
    this.acorn = window.acorn = new Projectile(this.game, this.launchX, this.launchY);
    this.acorn.body.setBodyContactCallback(this.squirrelhole, this.squirrelholeCallback, this); 
  },

  tosskey: function()
  {
    this.key = this.game.add.image(780,190, 'key');
    this.key.anchor.setTo(0.5, 0.5);
    this.tweenFunctions = [
        { name: "Quadratic In", ease: Phaser.Easing.Quadratic.In }]

    var tween = this.game.add.tween(this.key).to({
      x: [780, 700, 600, 400],
      y: [190, 600, 500, 300],
      angle: [100]
    }, 5000).interpolation(function(v, k){
  return Phaser.Math.catmullRomInterpolation(v, k);
});
  },

  squirrelholeCallback: function(body1, body2, fixture1, fixture2, begin) 
  {
    this.acorn.destroy();
    this.squirrel.play();
    this.tosskey();
  },

  shutdown: function() {
    this.game.input.activePointer.leftButton.onDown.removeAll();
    this.game.stateTransition = null;
  }

};