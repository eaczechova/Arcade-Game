/*
Enemy class function is created. It takes 3 paramaters: x for enemy's position
in vertical location (alongside x axis), y for for enemy's location in horizontal
location (alongside y axis) and speed.
*/

var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
  this.radius = 35;
};

/* Update the enemy's position. There are 3 Enemies in different starting location.
Once Enemy moves out off the screen, its horizontal position is set back to 0, its
staring position is chosen randomly, so is its speed, which is always more than 100.
*/

Enemy.prototype.update = function(dt) {
  var enemyLocation = [55, 138, 220];
  this.x = this.x + (this.speed * dt);
    if (this.x > 475) {
      this.x = 0;
      this.y = enemyLocation[Math.floor((Math.random()) * 3)];
      this.speed = Math.floor(Math.random() * 200)+100;
    }

/* Collision detection is between two circles based on algorithms detecting collision in 2D
https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection.
*/

  var dx = this.x - player.x;
  var dy = player.y - this.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < this.radius + player.radius) {
    player.y = 400;
    player.x = 200;
    document.getElementById('miss').innerHTML = resultBoard.miss;
    resultBoard.miss++;
  }
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // drawCircle(this.x+50, this.y+115, this.radius, "red");
};

/*
Player class function is created. It takes 2 paramaters: x for Players's position
in vertical location (alongside x axis), y for for Players's location in horizontal
location (alongside y axis)
*/

var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.img = 'images/char-boy.png';
  this.radius = 35;
}

// Updates Player's position once it reaches the water and increase its score by one.

Player.prototype.update = function() {
  if (this.y === -25) {
    resultBoard.score++;
    document.getElementById('score').innerHTML = resultBoard.score;
    this.y = 400;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.img), this.x, this.y);
  // drawCircle(this.x+50, this.y+100, this.radius, "green");
}

/* Function checkes for key type and moves Player from it current location. The second
condition prevents Player to leave the playground.
*/

Player.prototype.handleInput = function(key) {
  if (key === 'left' && this.x > 0) {
    this.x = this.x - 101;
  } else if (key === 'up' && this.y > 0) {
    this.y = this.y - 83;
  } else if (key === 'right' && this.x < 400) {
    this.x = this.x + 101;
  } else if (key === 'down' && this.y < 400) {
    this.y = this.y + 83;
  }
}

/* Enemy and Player objects are instantiate. All Enemy objects are placed in
an array called allEnemies, while Player object is in a variable called player.
*/

var allEnemies = [];
var enemyLocation = [55, 138, 220];

enemyLocation.forEach((loc) => {
  enemy = new Enemy(0, loc, Math.floor((Math.random()) * 200) + 100);
  allEnemies.push(enemy);
});

var player = new Player(200, 400);

//This listens for key presses and sends the keys to your Player.handleInput() method.

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

/* Add helper function drawCircle() that draw circle around Player and Enemy objects
in order to find collision area.
*/

// function drawCircle(x, y, radius, color) {
//   ctx.beginPath();
//   ctx.arc(x, y, radius, 0, 2*Math.PI);
//   ctx.lineWidth = 2;
//   ctx.strokeStyle = color;
//   ctx.stroke();
// }

var resultBoard = {
  score: 0,
  miss: 0,
};
