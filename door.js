var inherits = require('inherits');
var Entity = require('crtrdg-entity');

module.exports = Door;
inherits(Door, Entity);

function Door(options){
  this.position = {
    x: options.position.x,
    y: options.position.y
  };

  this.size = {
    x: 20,
    y: 40
  };

  this.color = '#999';
}