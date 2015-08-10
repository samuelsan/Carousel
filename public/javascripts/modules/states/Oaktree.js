  var OaktreeState = function (game) {};

  OaktreeState.prototype = {
    constructor: BootState,
    preload: function() {
      game.load.image('background', 'app/assets/javascripts/modules/units/backgrounds/oaktree.jpg')
    },
    create: function() {
      background = game.add.image(0,0, 'background');
    },
    update: function() {}
  };