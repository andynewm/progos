var Engine;

(function (Engine) {

  Engine.run = function (map, instructionSet, moveCallback, gameCallback) {

    var state = map.players.reduce(
      function (state, player) {

        state[player.tag] = {
          x: player.x,
          y: player.y,
          facing: player.facing
        };

      }, {});

    instructionSet.forEach(
      function(instructions) {

        step(state, map, instructions, moveCallback);

      });

    return undefined;

  };

  var step = function (state, map, instructions, moveCallback) {

    var newState = map.players.map(
      function (player) {

        var instruction = instructions[player.tag];
        var position = state[player.tag];

        var action = apply(player, instruction);

        moveCallback(action, player);

      });
 
  };

  var apply = function (player, instruction) {

    switch (instruction) {

      case 'up':
        player.facing = 'up';
        player.y--;
        break;

      case 'down':
        player.facing = 'down';
        player.y++;
        break;

      case 'left':
        player.facing = 'left';
        player.x--;
        break;

      case 'right':
        player.facing = 'right';
        player.x++;
        break;

    }

    return 'moved';

  };


})(Engine || (Engine = {}));