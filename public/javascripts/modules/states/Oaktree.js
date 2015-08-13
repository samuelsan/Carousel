/* globals BootState, Phaser, Projectile */

'use strict';

var OaktreeState = function (game) 
{
  this.game = game;
  this.launchX = 320;
  this.launchY = 325;
  this.acorn;
  this.squirrelhole;
};

var ground = [[1,796.5,929,558.5,1067,564,1067,800],[367,583.5,469,575.5,599,600.5,329,599.5,348.5,586],[824,582.5,735,606.5,780,586.5],[599,600.5,469,575.5,545,579.5,573,585.5],[61,621.5,1,796.5,10,632.5,17,624.5],[1067,564,1020,561.5,1052,559.5],[929,558.5,824,582.5,882,562.5],[329,599.5,1,796.5,259,603.5,285,597.5],[209,607.5,1,796.5,179,610.5,187,607.5],[677,611.5,1,796.5,631,606.5,667,607.5],[259,603.5,1,796.5,209,607.5,221,603.5],[469,575.5,367,583.5,391,575.5],[179,610.5,1,796.5,87,615.5,99,609.5],[10,632.5,1,796.5,0.5,636],[87,615.5,1,796.5,61,621.5],[599,600.5,631,606.5,1,796.5,329,599.5],[929,558.5,735,606.5,824,582.5],[703,610.5,1,796.5,677,611.5],[735,606.5,1,796.5,703,610.5]];

var treetrunk = [[816.5, 330  ,  828.5, 294  ,  838.5, 311  ,  842.5, 325  ,  840.5, 339  ,  833, 352.5  ], [   737, 237.5  ,  693, 276.5  ,  710, 243.5  ,  717, 232.5  ], [   788.5, 337  ,  785.5, 323  ,  828.5, 294  ,  816.5, 330  ,  803.5, 346  ,  797, 349.5  ]];


OaktreeState.prototype = {
  constructor: BootState,
  preload: function() {
    this.game.load.image('background', 'javascripts/modules/units/backgrounds/oaktree.jpg');
    this.game.load.image('ground', 'javascripts/modules/units/backgrounds/oakground.png');
    this.game.load.image('treetrunk', 'javascripts/modules/units/backgrounds/treetrunk.png');
    this.game.load.image('squirrelhole', 'javascripts/modules/units/backgrounds/squirrelhole.png');
    this.game.load.image('iris', 'javascripts/modules/units/sprites/temp-iris.png');
    this.game.load.image('acorn', 'javascripts/modules/units/sprites/Acorn.png');
  },
  create: function() {
    this.game.input.activePointer.leftButton.onDown.add(this.fireAcorn, this);
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.restitution = 0.3;
    this.game.physics.box2d.gravity.y = 500;
    this.game.physics.box2d.friction = 0.3;
    this.game.physics.box2d.setBoundsToWorld();   

    // this.groundBody = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    // this.groundBody.setChain(groundVertices);
  
    // var PTM = 50;
  

    this.background = this.game.add.image(0,0, 'background');
    this.background.height = this.game.height;
    this.background.width = this.game.width;

    this.treetrunk = this.game.add.image(0,0, 'treetrunk');
    this.treetrunk.height = this.game.height;
    this.treetrunk.width = this.game.width;  

    this.ground = this.game.add.image(0,0, 'ground');
    this.ground.height = this.game.height;
    this.ground.width = this.game.width;  
    // this.game.physics.box2d.enable(this.ground);
    // this.game.add.existing(this.ground);
    // this.ground.body.static = true;

    this.squirrelhole = this.game.add.sprite(0,0, 'squirrelhole');
    this.squirrelhole.height = this.game.height;
    this.squirrelhole.width = this.game.width;
    
    this.game.physics.box2d.enable(this.squirrelhole);
    this.squirrelhole.body.static = true;
    this.squirrelhole.body.setCircle(30, 805, 190);
    this.squirrelhole.body.addCircle(30, 805, 210);

    this.iris = this.game.add.image(300,200, 'iris');

    this.groundCollider = new Phaser.Physics.Box2D.Body(this.game,
                                                        null,
                                                        0,
                                                        0);
    this.groundCollider.static = true;
    // shapes.forEach(function(shape)
    // {
    //   this.groundCollider.addLoop(shape);
    // }.bind(this));

    // this.groundCollider.setRectangle(30, 30, 0, 0, 0);

    this.treetrunkCollider = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0);
    this.treetrunkCollider.static = true;
    this.treetrunkCollider.setChain(treetrunk);

    // this.acorn.body.setBodyContactCallback(this.acorn, squirrelholeCallback, this);
    
    // function squirrelholeCallback(body1, body2, fixture1, fixture2, begin) {
    //   if (!begin)
    //   {
    //     return;
    //   }

    //   this.acorn.destroy();
    // }

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
      return pairs
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
    this.acorn.destroy();
  }   

};