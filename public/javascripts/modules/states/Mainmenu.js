var MainMenu = function MainMenu(game)
{
  this.game = game;
};

MainMenu.prototype.create = function create()
{
  // this.background = game.add.image(0,0, 'background');
  this.title = game.add.image(170,200, 'title');
  this.title.alpha = 0;

  this.text1 = this.game.add.text(525, 400, 'Click Anywhere To Play', { font: '30px Arial', fill: '#ffffff'});
  this.text1.anchor.x = 0.5;
  this.text1.alpha = 0;

  this.songcredit = this.game.add.text(10,10, 'SONG: "Compass" by Zella Day', { font: '20px Arial', fill: '#ffffff'});
  this.songcredit.alpha = 0;

  setTimeout(function()
  {
    this.game.add.tween(this.title).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0);

    this.game.input.activePointer.leftButton.onDown.addOnce(function()
    {
      this.compasssong.stop();
      this.game.state.start('Oaktree');
    }, this);
  }.bind(this), 2000);

  setTimeout(function()
    {
      this.game.add.tween(this.text1).to( {alpha: 1}, 4000, Phaser.Easing.Linear.None, true, 0);
    }.bind(this), 7000);

    setTimeout(function()
    {
      this.game.add.tween(this.songcredit).to( {alpha: 1}, 4000, Phaser.Easing.Linear.None, true, 0);
    }.bind(this), 10000);

  if (!this.compasssong || !this.compasssong.isPlaying) {
    this.compasssong = this.game.add.audio('compass-song', 2, true);
    this.compasssong.loop = true;
    this.compasssong.play();
  }
};