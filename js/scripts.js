function message(msg) {
  $("#log").append("<div></div>")
  $("div").last().html(msg);
}

// set constants for consequences of attack / attacked
var gameover = false;
var battle = false;

// For refactoring with abstract factory pattern
// types = {};

// Character//////////////////////
function Character(name, hp, str) {
  this.name = name;
  this.hp = hp;
  this.str = str;
}

var adam = new Character("adam",100,10);
console.log(adam);

//Idea for additional keys: stats{int luk des}, item{equip, dispose}

Character.prototype.isDead = function (){
  this.hp <= 0 ? battle = false:
  message(this.name + 'is dead');
}

Character.prototype.attacked = function (damage) {
  this.hp -= damage;
  message(this.name + 's health point became' + this.hp+ "!");
  this.isDead();
};
Character.prototype.attack = function (target) {
  message(this.name + "attacked" + target.name +"!");
  target.attacked(this.str);
  target.isDead();
};

// Hero and Monster will be subclasses of character

function Hero(name, hp, str, lev, xp) {
  //use "apply" to apply Character class method on Hero
  Character.apply(this, arguments);
  //Syntetic Sugar: || goes down until find true, $$ : until false.
  this.lev = lev || 1;
  this.xp = xp || 0;
}

// Hero//////////////////////
//Hero also inherits prototype methods of Character.
Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.attacked = function(damage) {
  this.hp -= damage;
  message(this.name + 's health point became' + this.hp+ "!");
  this.isDead();
  // Hero only
  message('Game Over!');
  gameover = true;
  }
}
Hero.prototype.attack = function (target) {
  message(this.name + "attacked" + target.name +"!");
  target.attacked(this.str);
  target.isDead();
  // Hero only
  this.gainXp(target);
  }

Hero.prototype.gainXp = function(target) {
  message(`${this.name} earned  ${target.xp} through the battle!`);
  this.xp += target.xp;
  if (this.xp > 100) {
    this.lev++;
  }

Hero.prototype.levelUp = function(target) {
  message(`LEVEL UP! ${this.name} became ${this.lev}!`);
  this.hp += 10;
  this.str += 1;
  this.xp = 0;
  message(`${this.name}'s health point increased to ${this.hp}!`);
  message(`${this.name}'s strength increased to ${this.str}!`);
  }
};

// Monster//////////////////////
function Monster(name, hp, str, lev, xp) {
  Character.apply(this, arguments);
  this.lev = lev || 1;
  this.xp = xp || 0;
}
Monster.prototype = Object.create(Character.prototype);
Monster.prototype.constructor = Monster;

// Needs function to generate random monster


//Front-end////////////////////////////////////////
$(document).ready(function(){
  var hero = new Hero("Chan", 100, 10)

  //should include something to interact with users for choosing next action.

  //If user triggers "hunting monster" it should generate random monster.

  $("#game-menu").submit(function(e){
    e.preventDefault();
  });
  $("#battle-menu").submit(function(e){
    e.preventDefault();
  });
});
