var inherits = require('inherits');
var Entity = require('crtrdg-entity');

module.exports = Player;

function Player(options){
  Entity.call(this);

  this.position = { 
    x: options.position.x, 
    y: options.position.y 
  };

  this.size = {
    x: options.size.x,
    y: options.size.y
  };

  this.velocity = {
    x: 0,
    y: 0
  };

  this.camera = options.camera;

  this.health = options.health;
  this.gold = 0;
  this.potatoes = 0;
  this.strength = 5;
  
  this.direction = 'right';
  this.ducking = false;
  
  this.friction = options.friction;
  this.speed = options.speed;
  this.color = options.color;
  this.eyeColor = options.eyeColor;
}
inherits(Player, Entity);

Player.prototype.move = function(){
  this.position.x += this.velocity.x * this.friction;
  this.position.y += this.velocity.y * this.friction;
};

Player.prototype.boundaries = function(){
  if (this.position.x <= 0){
    this.position.x = 0;
  }

  if (this.position.x >= 3000 - this.size.x){
    this.position.x = 3000 - this.size.x;
  }

  if (this.position.y <= 0){
    this.position.y = 0;
  }

  if (this.position.y >= 320 - this.size.y){
    this.position.y = 320 - this.size.y;
    this.jumping = false;
  }
};

Player.prototype.input = function(keysdown){
  if ('A' in keysdown){
    this.direction = 'left';
    this.velocity.x = -this.speed;
    if (!this.jumping){
      this.jumping = true;
      if ('W' in keysdown){
        this.velocity.y = -20;        
      } else if ('S' in keysdown){
        this.ducking = true;
        this.velocity.x = -2
        this.velocity.y = 0;
      } else {
        this.velocity.y = -5;
      }
    }
  }

  if ('D' in keysdown){
    this.direction = 'right';
    this.velocity.x = this.speed;
    if (!this.jumping){
      this.jumping = true;
      if ('W' in keysdown){
        this.velocity.y = -20;        
      } else if ('S' in keysdown){
        this.ducking = true;
        this.velocity.x = 2
        this.velocity.y = 0;
      } else {
        this.velocity.y = -5;
      }
    }
  }

  if ('W' in keysdown){
    if (!this.jumping){
      this.jumping = true;
      this.velocity.y = -20;
    }
  }

  if ('S' in keysdown){
    this.ducking = true;
  }
};