/* globals BootState, Phaser, Projectile */

'use strict';

var OaktreeState = function (game) 
{
  this.game = game;
  BootState.call(this, game);
  // this.launchX = this.iris.x;
  // this.launchY = this.iris.y;
  this.acorn = null;
  this.bugnet = null;
  this.key = null;
  this.squirrelhole = null;
  this.iris = null;
  this.arrayOfAcorns = []

  this.hasAcorn = 0;
  this.hasBugnet = false;
  this.hasKey = false;
  this.hasBugjar = true;

  this.key1 = null;
  this.key2 = null;
  this.key3 = null;
  this.key4 = null;
  this.key5 = null;
};

var ground = [[1,796.5,929,558.5,1067,564,1067,800],[367,583.5,469,575.5,599,600.5,329,599.5,348.5,586],[824,582.5,735,606.5,780,586.5],[599,600.5,469,575.5,545,579.5,573,585.5],[61,621.5,1,796.5,10,632.5,17,624.5],[1067,564,1020,561.5,1052,559.5],[929,558.5,824,582.5,882,562.5],[329,599.5,1,796.5,259,603.5,285,597.5],[209,607.5,1,796.5,179,610.5,187,607.5],[677,611.5,1,796.5,631,606.5,667,607.5],[259,603.5,1,796.5,209,607.5,221,603.5],[469,575.5,367,583.5,391,575.5],[179,610.5,1,796.5,87,615.5,99,609.5],[10,632.5,1,796.5,0.5,636],[87,615.5,1,796.5,61,621.5],[599,600.5,631,606.5,1,796.5,329,599.5],[929,558.5,735,606.5,824,582.5],[703,610.5,1,796.5,677,611.5],[735,606.5,1,796.5,703,610.5]];

OaktreeState.prototype = {
  createAcorn: function(no_throw)
  {
    // var acorn = new Projectile(this.game, 700 + Math.random() * 300, )
    var acorn = new Projectile(this.game, this.world.randomX, 400 + Math.random() * 200, no_throw);
    this.game.add.existing(acorn);
    acorn.inputEnabled = true;
    acorn.input.useHandCursor = true;
    acorn.events.onInputDown.add(this.pickupAcorn, this);
    this.arrayOfAcorns.push(acorn);
    return acorn;
  },

  preload: function(){
    this.game.load.atlasJSONHash('iris-throwing', '/javascripts/modules/units/sprites/Throwing/iris-throwing.png', '/javascripts/modules/units/sprites/Throwing/iris-throwing.json');

      this.game.load.atlasJSONHash('iris-swing', '/javascripts/modules/units/sprites/Tireswing/iris-tire.png', 
      '/javascripts/modules/units/sprites/Tireswing/iris-tire.json');

      this.game.load.atlasJSONHash('walk-right', '/javascripts/modules/units/sprites/Walking/walk-right.png', 
      '/javascripts/modules/units/sprites/Walking/walk-right.json');

      this.game.load.image('background',      '/javascripts/modules/units/backgrounds/oaktree.jpg');
      this.game.load.image('ground',          '/javascripts/modules/units/backgrounds/oakground.png');
      this.game.load.image('treetrunk',       '/javascripts/modules/units/backgrounds/treetrunk.png');
      this.game.load.image('squirrelhole',    '/javascripts/modules/units/backgrounds/squirrelhole.png');
      this.game.load.image('branch',          '/javascripts/modules/units/backgrounds/branch.png');
      this.game.load.image('acorn',           '/javascripts/modules/units/sprites/acorn1.png');
      this.game.load.image('acorninventory',  '/javascripts/modules/units/sprites/acorninventory.png');
      this.game.load.image('bugnet',          '/javascripts/modules/units/sprites/bugnet1.png');
      this.game.load.image('bugnetinventory', '/javascripts/modules/units/sprites/bugnetinventory.png');
      this.game.load.image('key1',             '/javascripts/modules/units/sprites/key1.png');
      this.game.load.image('iris-throw-static', '/javascripts/modules/units/sprites/iristhrow.png');
      this.game.load.image('iris-throw-left',   '/javascripts/modules/units/sprites/iristhrowleft.png');
      this.game.load.image('iris-stand',      '/javascripts/modules/units/sprites/iris-standing.png');
      this.game.load.image('iris-pickup',     '/javascripts/modules/units/sprites/pickup.png');
      this.game.load.image('iris-start',      '/javascripts/modules/units/sprites/iris-swing-start.png');

      // Oaktree Audio //
      this.game.load.audio('background-music', '/javascripts/modules/units/music/oaktreemusic.mp3');
      this.game.load.audio('squirrel',        '/javascripts/modules/units/sounds/squirrel.wav');
      this.game.load.audio('acorn-on-ground', '/javascripts/modules/units/sounds/acorn_on_grass.wav');
      this.game.load.audio('pickup',          '/javascripts/modules/units/sounds/pickup.mp3');
    },

  create: function() {
    //KEYBOARD ASSIGNMENT//
    this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(this.checkAcorn, this);
    // this.key1.onDown.add(this.checkAcorn(), this);

    this.key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(this.useBugnet, this);
    // // this.key2.onDown.add(this.checkBugnet(), this);

    // this.key3 = this.game.input.keyboard.addKey(3);
    // this.key4 = this.game.input.keyboard.addKey(4);
    // this.key5 = this.game.input.keyboard.addKey(5);


    //START GAME PHYSICS//
    this.game.physics.startSystem(Phaser.Physics.BOX2D);
    this.game.physics.box2d.restitution = 0.3;
    this.game.physics.box2d.gravity.y = 500;
    this.game.physics.box2d.friction = 0.3;
    this.game.physics.box2d.setBoundsToWorld(); 

    //ADD AUDIO//
    this.squirrel = this.game.add.audio('squirrel'); 
    this.acorn_on_ground = this.game.add.audio('acorn-on-ground');
    this.pickup = this.game.add.audio('pickup');
    this.music = this.game.add.audio('background-music');

    this.music.volume = 2;
    this.music.play();    

    //ADD IMAGES + HITBOXES//
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

    this.iris = this.game.add.sprite(273,55, 'iris-start')
    this.iris.scale.setTo(0.60, 0.60);
    this.iris.inputEnabled = true;
    this.iris.events.onInputDown.addOnce(this.spinTire, this);

    //IRIS ACTIONS//
    // this.throwing = this.iris.animations.add('iris-throwing');


    // this.iris = this.game.add.sprite(200, 300, 'iris-stand');
    // this.iris.scale.setTo(0.50, 0.50);

    //SPAWN MULTIPLE ACORNS//
    for (var i=0; i < 5; i++) {
      this.createAcorn(true);
    }

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

    this.bugnet = this.game.add.sprite(200,150,'bugnet');
    this.game.physics.box2d.enable(this.bugnet);
    this.bugnet.body.static = true;
    this.bugnet.body.setRectangle(75, 75);

    this.branch = this.game.add.image(0,0, 'branch');
    this.branch.height = this.game.height;
    this.branch.width = this.game.width;
    this.branch.bringToTop();

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
      };
    }

    function byCoordinate(c)
    {
      return function(a, b)
      {
        if(a[c] == b[c]) { return  0; }
        if(a[c]  < b[c]) { return -1; }
        return 1;
      };
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
    if (this.acorn) {
      this.acorncount.text = this.hasAcorn;  
    }

    // if (this.checkAcorn) {
    //   if (this.state.mouseX >= this.iris.x){
    //     this.iris.loadTexture('iris-throw-static');
    //   } else {
    //     this.iris.loadTexture('iris-throw-left');
    //   }
    // }

  },

  render: function()
  {
    this.game.debug.box2dWorld();
  },

  pickupAcorn: function(acorn) {
    // IF THE ACORN IS TO THE RIGHT OF IRIS //
      this.iris.x = acorn.x - 145;
      this.iris.y = acorn.y - 150;
      this.iris.loadTexture('iris-pickup', 0);

      this.pickup.play();
      this.hasAcorn += 1;
      acorn.destroy();

      setTimeout(function() {
        this.iris.loadTexture('iris-stand');
        this.iris.y = 300;
      }.bind(this), 1000);
        
      this.arrayOfAcorns = this.arrayOfAcorns.filter(function(_acorn) {
        return acorn !== _acorn;
      });
        
      this.acorninventory = this.game.add.image(20, 30, 'acorninventory');
      this.acorncount = this.game.add.text(40, 45, this.hasAcorn, { font: '20px Arial', fill: '#ffffff' });
    },

  pickupBugnet: function(bugnet) {
    this.iris.x = bugnet.x - 145;
    this.iris.y = bugnet.y - 150;
    this.iris.loadTexture('iris-pickup', 0);

    this.pickup.play();
    this.hasBugnet = true;
    bugnet.destroy();

    setTimeout(function() {
      this.iris.loadTexture('iris-stand', 0);
      this.iris.y = 300;
    }.bind(this), 1000);

    this.bugnetinventory = this.game.add.image(20, 30, 'bugnetinventory');
  },

  checkAcorn: function() {
    if (this.hasAcorn != 0){
        this.iris.loadTexture('iris-throw-static');
        this.acorn = new Projectile(this.game, this.iris.x + 23, this.iris.y + 40, true);
        this.acorn.body.static = true;
        this.game.input.activePointer.leftButton.onDown.addOnce(this.fireAcorn, this);
    }else {
        //AUDIO//
        // this.noneleft.play();
    }
  },

  checkBugnet: function() {
    // if (this.hasBugnet = true) {
    //     this.game.state.start("Minimenu");
    // } else {
    //     //AUDIO//
    //     // this.cantuse.play();
    // }
    debugger
  },

  fireAcorn: function () {
    this.iris.loadTexture('iris-throwing', 0);
    this.iris.animations.add('throw');
    this.iris.animations.play('throw', 12, false);
    this.acorn.destroy();
    this.acorn = new Projectile(this.game, this.iris.x, this.iris.y);
    this.hasAcorn -= 1;
    this.checkcollision();
    setTimeout(function() {
        this.iris.loadTexture('iris-stand');
        this.iris.y = 300;
      }.bind(this), 500);
  },

  tosskey: function()
  {
    this.key = this.game.add.sprite(780,190, 'key1');
    this.key.anchor.setTo(0.5, 0.5);
    this.key.inputEnabled = true;
    this.key.events.onInputDown.add(this.pickupKey(this.key), this);
    this.tweenFunctions = [
      { name: "Quadratic In", ease: Phaser.Easing.Quadratic.In }
    ];
    this.game.physics.box2d.enable(this.key);

    /*var tween = */this.game.add.tween(this.key).to({
      x: [780, 700, 600, 400],
      y: [190, 600, 500, 300],
      angle: [100]
    }, 5000)
    .interpolation(function(v, k)
    {
      return Phaser.Math.catmullRomInterpolation(v, k);
    });
  },

  checkcollision: function()
  {
    this.acorn.body.setBodyContactCallback(this.squirrelhole, this.squirrelholeCallback, this);
    this.acorn.body.setBodyContactCallback(this.bugnet, this.bugnetCallback, this);
  },

  useBugnet: function()
  {
    if(state === 'Stream' && this.hasBugnet == true) {
      this.game.state.start('Minimenu');
    } else {
      //AUDIO//
      // this.cantuse.play();
    }
  },

  spinTire: function()
  {
    this.iris.animations.add('iris-swing');
    this.iris.animations.play('iris-swing', 2.5, false);

    this.iris.loadTexture('iris-stand');
  },

  squirrelholeCallback: function(/*body1, body2, fixture1, fixture2, begin*/)
  {
    this.acorn.destroy();
    this.squirrel.play();
    this.tosskey();
  },

  pickupKey: function(key)
  {
    this.iris.x = key.x - 145;
    this.iris.y = key.y - 150;
    this.iris.loadTexture('iris-pickup', 0);

    this.pickup.play();
    this.hasKey = true;
    key.destroy();

    setTimeout(function() {
      this.iris.loadTexture('iris-stand', 0);
      this.iris.y = 300;
    }.bind(this), 1000);

    // this.bugnetinventory = this.game.add.image(20, 30, 'bugnetinventory');
  },

  bugnetCallback: function()
  {
    this.bugnet.body.static = false;
    this.bugnet.events.onInputDown.add(this.pickupBugnet, this);
  }
};