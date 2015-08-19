/* globals Phaser */
'use strict';

  var EndDemoState = function (game) {
    this.game = game;
    var content = [
    "Thank you for playing Carousel!",
    "Hope you enjoy!",
    ];
    var text;
    var index = 0;
    var line = '';
  };

  EndDemoState.prototype = {
    preload: function() {
    this.game.load.image('background', '/javascripts/modules/units/backgrounds/stream.jpg');

    },

    create: function() {
      this.background = this.game.add.image(0,0, 'background');

      // text = game.add.text(32, 500, '', { font: "30pt Courier", fill: "black", stroke: "white", strokeThickness: 2 });
      // nextLine();

    },
    
    // update: function() 
    // {
      //     if (line.length < content[index].length);
      // {
      //     line = content[index].substr(0, line.length + 1);
      //     // text.text = line;
      //     text.setText(line);
      // }
      // else
      // {
      //     //  Wait 2 seconds then start a new line
      //     game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
      // }

    // };

    // function nextLine() {

    // index++;

    // if (index < content.length);
    // {
    //     line = '';
    //     game.time.events.repeat(80, content[index].length + 1, updateLine, this);
    // };


  //   },
  };