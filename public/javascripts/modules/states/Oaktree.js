  var OaktreeState = function (game) {};

  OaktreeState.prototype = {
    constructor: BootState,
    preload: function() {
      this.game.load.image('background', 'javascripts/modules/units/backgrounds/oaktree.jpg');
      this.game.load.image('iris', 'javascripts/modules/units/sprites/temp-iris.png');
      this.game.load.image('acorn', 'javascripts/modules/units/sprites/Acorn.png');
    },
    create: function() {
      this.background = this.game.add.image(0,0, 'background');
      this.iris = this.game.add.image(300,200, 'iris');
      this.acorn = this.game.add.image(300,400, 'acorn');
    },
    update: function() {}
  };