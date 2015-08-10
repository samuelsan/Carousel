  var MinimenuState = function (game) {};

  MinimenuState.prototype = {
    constructor: BootState,
    preload: function() {
      game.load.image('background', 'app/assets/javascripts/modules/units/backgrounds/...')
      game.load.image('menu', 'app/assets/javascripts/modules/units/backgrounds/...')
    },
    create: function() {
      background = game.add.image(0,0, 'background');
    },
    update: function() {}
  };