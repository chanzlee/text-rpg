function message(msg) {
  $("#log").append("<div></div>")
  $("div").last().html(msg);
}

// set constants for consequences of attack / attacked
var gameover = false;
var battle = false;

function Character(name, hp, str) {
  this.name = name;
  this.hp = hp;
  this.str = str;
}

Character.prototype.isDead = function (){
  this.hp <= 0 ? battle = false;
  message(this.name + 'is dead');
}

Character.prototype.attacked = function (damage) {
  this.hp -= damage;
  message(this.name + 's health point became' + this.hp+ "!");
  this.isDead();
};
Character.prototype.attack = function (target) {
  message(this.name + "is attacking" + target.name);
  target.attacked(this.str);
};

// Hero and Monster will be subclasses of character

function Hero(name, hp, str, lev, xp) {
  //use "apply" to apply Character class method on Hero
  Character.apply(this, arguments);
  //Syntetic Sugar: || goes down until find true, $$ : until false.
  this.lev = lev || 1;
  this.xp = xp || 0;
}

//Hero also inherits prototype methods of Character.
Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;

function Monster(name, hp, str, lev, xp) {
  Character.apply(this, arguments);
  this.lev = lev || 1;
  this.xp = xp || 10;
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
    e.preventDefault()
  });


});
