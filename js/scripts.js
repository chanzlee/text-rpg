function message(msg) {
  $("#log").append("<div></div>")
  $("div").last().html(msg);
}

// set constants for consequences of attack / attacked
var gameover = false;
var battle = false;
var heros = {};
var villains = {};

// For refactoring with abstract factory pattern
// types = {};

// Character//////////////////////
function Character(name, hp, str) {
  this.name = name;
  this.hp = hp;
  this.str = str;
}




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

// Hero and Villain will be subclasses of character

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
}

// Monster//////////////////////
function Villain(name, hp, str, lev, xp) {
  Character.apply(this, arguments);
  this.lev = lev || 1;
  this.xp = xp || 0;
}
Villain.prototype = Object.create(Character.prototype);
Villain.prototype.constructor = Villain;


//Generate the list of villain and appends into villains object.
function villainAppender(){
  villains = {};
  var villainNames = {
    villain1: "loki",
    villain2: "ultron",
    villain3: "thanos"
  }
  var loki = new Villain("Loki", 25, 5, 1, 30);
  var ultron = new Villain("Ultron", 50, 10, 5, 90);
  var thanos = new Villain("Thanos", 100, 20, 10, 270);

  villains[1]=loki;
  villains[2]=ultron;
  villains[3]=thanos;
  // console.log(villains)
}

//Create random villain from the villains object.
function randomVillainCreator(){
  currentVillain =
  villains[Math.floor(Math.random()*Object.keys(villains).length)+1];
}


//Front-end////////////////////////////////////////
$(document).ready(function(){

  var adam = new Character("Adam",100,10);
  console.log(adam);

  var chan = new Hero("Chan", 100, 10);
  console.log(chan);

  var lucifer = new Character("Lucifer",100,10);
  console.log(lucifer);

  villainAppender();
  randomVillainCreator();
  console.log(currentVillain);

  //should include something to interact with users for choosing next action.

  //If user triggers "Villain Cease"" it should generate random monster.
  $("#temp-booter").click(function(){
    
  });
  $("#game-menu").submit(function(e){
    e.preventDefault();
  });
  $("#battle-menu").submit(function(e){
    e.preventDefault();
  });
});
