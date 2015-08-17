  var PreloadState = function (game) {
    this.game = game
  };

  PreloadState.prototype = {
    constructor: BootState,
    preload: function() {
      game.load.image('background', '/javascripts/modules/units/backgrounds/carousellogo1.jpg');
      game.load.image('title', '/javascripts/modules/units/backgrounds/carousellogo.jpg');
      game.load.audio('compass-song', '/javascripts/modules/units/music/IntroSong.mp3');
    },
    create: function() {
      this.background = game.add.image(0,0, 'background');
      this.title = game.add.image(0,0, 'title');
      this.title.alpha = 0;

      setTimeout(function(){
        this.game.add.tween(this.title).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0);
      }.bind(this), 2000);

      if (!this.compasssong || !this.compasssong.isPlaying) {
      this.compasssong = this.game.add.audio('compass-song', 2, true);
      this.compasssong.loop = true;
      this.compasssong.play();
    }
    },
    update: function() {}
  };