/*
*
* UI
*
*/

exports.health = new Text({ 
  el: '#health', 
  html: player.health
});

exports.coins = new Text({ 
  el: '#coins', 
  html: '0'
});

/*
exports.trength = new Text({
  el: '#strength',
  html: player.strength
});
*/

exports.title = new Text({
  el: '#title',
  html: 'ludum dare #27'
});

exports.log = new Log({
  height: '50px',
  width: '300px',
  appendTo: 'header .container'
});