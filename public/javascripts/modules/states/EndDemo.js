/* globals Phaser, BootState */
'use strict';

  var EndDemoState = function (game) {
    this.game = game;

    this.content = [
    "Thank you for playing Carousel!",
    "Hope you enjoy!",
    ];
    this.text;
    this.index = 0;
    this.line = '';
  };



  EndDemoState.prototype = {
    constructor:BootState,
    preload: function() {
    this.game.load.image('background', '/javascripts/modules/units/backgrounds/stream.jpg');

    },

    create: function() {
      this.background = this.game.add.image(0,0, 'background');
      this.background.height = this.game.height;
      this.background.width = this.game.width;

      this.text = this.game.add.text(32, 500, '', { font: "30pt Courier", fill: "black", stroke: "white", strokeThickness: 2 });
      this.nextLine();

    },
    
    updateLine: function() 
    {
      if (this.line.length < this.content[this.index].length);
      {
          this.line = this.content[this.index].substr(0, this.line.length + 1);
          // text.text = line;
          this.text.setText(this.line);}

      else
      {
          //  Wait 2 seconds then start a new line
          this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
      }

    },

    nextLine: function()
    {

      this.index++;

      if (this.index < this.content.length);
      {
          this.line = '';
          this.game.time.events.repeat(80, this.content[this.index].length + 1, this.updateLine, this);
      }
    }
  };