var MainMenu = function MainMenu(game)
{
  this.game = game;
};

MainMenu.prototype.create = function create()
{
  this.background = game.add.image(0,0, 'background');
  this.title = game.add.image(0,0, 'title');
  this.title.alpha = 0;

  this.game.input.activePointer.leftButton.onDown.addOnce(function()
  {
    this.compasssong.stop();
    this.game.state.start('Oaktree');
  }, this);

  setTimeout(function()
  {
    this.game.add.tween(this.title).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0);
  }.bind(this), 2000);

  if (!this.compasssong || !this.compasssong.isPlaying) {
    this.compasssong = this.game.add.audio('compass-song', 2, true);
    this.compasssong.loop = true;
    this.compasssong.play();
  }
};