var inherits = require('inherits');
var Entity = require('crtrdg-entity');
var randomColor = require('random-color');
var tic = require('tic')();

module.exports = Shield;
inherits(Shield, Entity);

function Shield(options){
  var self = this;
  this.size = {
    x: 65,
    y: 30
  };

  this.position = { 
    x: options.position.x, 
    y: options.position.y
  };

  this.velocity = {
    x: 0,
    y: 5
  };

  this.camera = options.camera;
  this.player = options.player;

  this.friction = .5;
  this.color = randomColor(255);

  this.on('update', function(interval){
    this.size.x += randomInt(-3, 8);
    this.size.y += randomInt(-3, 10);

    this.position.x += this.velocity.x + randomInt(-6, 3) * this.friction;
    this.position.y += this.velocity.y + randomInt(-3, 3) * this.friction;

    this.boundaries();

    if (this.touches(this.player) && this.player.ducking){
      this.player.defending = true;
      console.log(true)
    } else {
      this.player.defending = false;
      console.log(false)
    }

    tic.timeout(function() {
      self.remove()
    }, 3000);

    tic.tick(interval);
  });

  this.on('draw', function(context){
    context.save();
    context.beginPath();

    context.translate(this.position.x - this.camera.position.x + this.size.x / 2 - 12, this.position.y + 30 - this.camera.position.y); 
    context.rotate(Math.PI/180 * randomInt(-30, 30));

    context.rect(0 - this.size.x/2,0 - this.size.y/2, this.size.x, this.size.y);
    context.lineWidth = randomInt(-3, 15);
    context.strokeStyle = this.color;
    context.stroke();

    context.closePath();
    context.restore();
  });

  return this;
}

Shield.prototype.boundaries = function(){
  if (this.position.x <= 0){
    this.position.x = 0;
  }

  if (this.position.x >= 3000 - this.size.x){
    this.position.x = 3000 - this.size.x;
  }

  if (this.position.y <= 0){
    this.remove();
  }

  if (this.position.y <= 250){
    this.velocity.y *= -1;
  }

  if (this.position.y >= 320 - this.size.y){
    this.velocity.y *= -1;
  }
};

function randomInt(min, max){
  var num = Math.random() * (max - min) + min;

  return Math.floor(num)
}