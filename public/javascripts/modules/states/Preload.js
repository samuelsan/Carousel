  var PreloadState = function PreloadState(game)
  {
    this.game = game;
    console.log("%s ctor", this.constructor.name);
  };

  PreloadState.prototype =
  {
    preload: function()
    {
      console.log(this.constructor.name, "preload");
      //Assets for Main Menu//
      game.load.image('background', '/javascripts/modules/units/backgrounds/carousellogo1.jpg');
      game.load.image('title', '/javascripts/modules/units/backgrounds/carousellogo.jpg');
      game.load.audio('compass-song', '/javascripts/modules/units/music/IntroSong.mp3');

      //Oaktree Assets //
      this.game.load.atlasJSONHash('iris-throwing', '/javascripts/modules/units/sprites/Throwing/iris-throwing.png', '/javascripts/modules/units/sprites/Throwing/iris-throwing.json');

      this.game.load.atlasJSONHash('iris-swing', '/javascripts/modules/units/sprites/Tireswing/iris-tire.png', '/javascripts/modules/units/sprites/Tireswing/iris-tire.json');

      this.game.load.atlasJSONHash('walk-right', '/javascripts/modules/units/sprites/Walking/walk-right.png', '/javascripts/modules/units/sprites/Walking/walk-right.json');

      this.game.load.image('background',      '/javascripts/modules/units/backgrounds/oaktree.jpg');
      this.game.load.image('ground',          '/javascripts/modules/units/backgrounds/oakground.png');
      this.game.load.image('treetrunk',       '/javascripts/modules/units/backgrounds/treetrunk.png');
      this.game.load.image('squirrelhole',    '/javascripts/modules/units/backgrounds/squirrelhole.png');
      this.game.load.image('branch',          '/javascripts/modules/units/backgrounds/branch.png');
      this.game.load.image('acorn',           '/javascripts/modules/units/sprites/acorn1.png');
      this.game.load.image('acorninventory',  '/javascripts/modules/units/sprites/acorninventory.png');
      this.game.load.image('bugnet',          '/javascripts/modules/units/sprites/bugnet1.png');
      this.game.load.image('bugnetinventory', '/javascripts/modules/units/sprites/bugnetinventory.png')
      this.game.load.image('key',             '/javascripts/modules/units/sprites/key1.png');
      this.game.load.image('iris-stand',      '/javascripts/modules/units/sprites/iris-standing.png');
      this.game.load.image('iris-pickup',     '/javascripts/modules/units/sprites/pickup.png');
      this.game.load.image('iris-start',      '/javascripts/modules/units/sprites/iris-swing-start.png');

      // Oaktree Audio //
      this.game.load.audio('background-music', '/javascripts/modules/units/music/oaktreemusic.mp3');
      this.game.load.audio('squirrel',        '/javascripts/modules/units/sounds/squirrel.wav');
      this.game.load.audio('acorn-on-ground', '/javascripts/modules/units/sounds/acorn_on_grass.wav');
      this.game.load.audio('pickup',          '/javascripts/modules/units/sounds/pickup.mp3');

      //Mini Menu Assets //
      this.game.load.image('background',    '/javascripts/modules/units/backgrounds/minigamebackground-alt.jpg');
      this.game.load.image('menu',          '/javascripts/modules/units/backgrounds/minigame-intro.png');
      this.game.load.image('playbutton',    '/javascripts/modules/units/sprites/playbutton.png');
      this.game.load.image('returnbutton',  '/javascripts/modules/units/sprites/returnbutton.png');

      //Stream Assets//
      this.game.load.image('background', '/javascripts/modules/units/backgrounds/stream.jpg')

      //Mini Menu Audio //
      this.game.load.audio('music',         '/javascripts/modules/units/music/Firefly.mp3');

      //Assets for MiniGame //
      this.game.load.atlasJSONHash('firefly-surprise', '/javascripts/modules/units/sprites/Firefly/firefly-surprise.png', '/javascripts/modules/units/sprites/Firefly/firefly-surprise.json');

      this.game.load.image('background',      '/javascripts/modules/units/backgrounds/minigamebackground-alt.jpg');
      this.game.load.image('bugjar',          '/javascripts/modules/units/sprites/bugjar1.png');
      this.game.load.image('bugnet',          '/javascripts/modules/units/sprites/bugnet1.png');
      this.game.load.image('firefly',         '/javascripts/modules/units/sprites/firefly1.png');
      // this.game.load.image('fireflysurprise', '/javascripts/modules/units/sprites/firefly-surprise.png');
      this.game.load.image('glow',            '/javascripts/modules/units/sprites/firefly-background.png');

      // Minigame Audio //
      this.game.load.audio('fireflybuzz',     '/javascripts/modules/units/sounds/firefly_buzzing.wav');
      this.game.load.audio('netswish',        '/javascripts/modules/units/sounds/net_swish.mp3');
      this.game.load.audio('firefly-catch',   '/javascripts/modules/units/sounds/firefly_surprise.mp3');
      this.game.load.audio('music',           '/javascripts/modules/units/music/Firefly.mp3');
    },
    create: function()
    {
      console.log(this.constructor.name, "create");



      this.game.state.start('MainMenu');
    }
  };