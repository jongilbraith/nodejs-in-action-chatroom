var Chat = function(socket) {
  this.socket = socket;
};

Chat.prototype.sendMessage = function(room, text) {
  var message = {
    room: room,
    text: text
  };

  this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function(room) {
  this.socket.emit('join', {
    newRoom: room
  });
};

Chat.prototype.processCommand = function(command) {

  var words = command.split(' ')
    // Parse command from first word
    , command = words[0].substring(1, words[0].length).toLowerCase()
    , message = false;

  switch(command) {
    // Handle room changing/creation
    case 'join':
      words.shift();
      var room = words.join(' ');
      this.changeRoom(room);
      break;

    // Handle name change attempts
    case 'nick':
      words.shift();
      var name = words.join(' ');
      this.socket.emit('nameAttempt', name);
      break;

    // Return an error message if the command isn't recognized
    default:
      message = 'Unrecognized command.';
      break;
  }

  return message;
};
