// import * from './turn.js';

// AUG 22th log
// 1. Can add prototype function for recovery and escape if it becomes turn base game.
// 2. Should generalize the villaincease to encountering platform.
// 3. Check overlapping prop or proto function.
// 4. Can be refactored with isBattle and vilAppender.

document.oncontextmenu = function() {
  return false;
};

function message(msg) {
  $("#log").append("<div></div><br>")
  $("div").last().html(msg);
}

// set constants for consequences of attack / attacked
var gameover = false;
var isBattle = false;
var heros = {};
var villains = {};
var currentPlayer= {};
var currentVillain= {};

// For refactoring with abstract factory pattern
// types = {};

// Character//////////////////////
function Character(name, hp, str) {
  this.name = name;
  this.hp = hp;
  this.maxHp =hp;
  this.str = str;
  this.isDead = false;
}

//Idea for additional keys: stats{int luk des}, item{equip, dispose}

Character.prototype.checkDead = function (){
  if(this.hp <= 0){
  isBattle = false;
  this.isDead= true;
  message(this.name + ' is dead...');
  }
}

Character.prototype.attacked = function (damage) {
  this.hp = Math.max(this.hp-damage,0);
  message(this.name + "'s health point became "+ this.hp+ "!");
  this.checkDead();
};
Character.prototype.attack = function (target) {
  message(this.name + "attacked" + target.name +"!");
  target.attacked(this.str);
  target.checkDead();
};

// Hero and Villain will be subclasses of character

// Hero//////////////////////
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

Hero.prototype.attacked = function(damage) {
  this.hp = Math.max(this.hp-damage,0);
  message(this.name + 's health point became' + this.hp+ "!");
  this.checkDead();
  if (this.isDead) {
  gameover=true;
  }
}

Hero.prototype.attack = function (target) {
  message(this.name + " attacked " + target.name +"!");
  target.attacked(this.str);
}

Hero.prototype.gainXp = function(target) {
  message(this.name+" earned "+target.xp+" through the battle!");
  this.xp += target.xp;
  if (this.xp > 100) {
  this.levelUp();
}

Hero.prototype.levelUp = function() {
  this.lev++;
  message(`LEVEL UP! ${this.name} became ${this.lev}!`);
  this.hp += 10;
  this.str += 1;
  this.xp = 0;
  message(`${this.name}'s health point increased to ${this.hp}!`);
  message(`${this.name}'s strength increased to ${this.str}!`);
  }
}

Hero.prototype.battle = function(target){
  // console.log(target);
  // console.log(target[str]);
  isBattle=true;
  while (!this.isDead && !target.isDead){
    this.attack(target);
    if (!target.isDead){
      this.attacked(target.str);
    }
  }
  if (gameover) {
    exit();
  } else {
    this.gainXp(target);
    this.hp = this.maxHp;
  }
}

// Villain//////////////////////
function Villain(name, hp, str, lev, xp) {
  Character.apply(this, arguments);
  this.lev = lev || 1;
  this.xp = xp || 0;
}
Villain.prototype = Object.create(Character.prototype);
Villain.prototype.constructor = Villain;


//Generate the list of villain and appends into villains object.
function vilAppender(){
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
function randomVilGen(){
  currentVillain =
  villains[Math.floor(Math.random()*Object.keys(villains).length)+1];
}

// function clearMonster(){
//
// }

var newHero = function (){
  currentPlayer = new Hero(prompt('Enter your hero name').toUpperCase(), 100, 10, 1, 10);
  message("Hello, "+currentPlayer.name+" ! Welcome to Hero world.");
  message("Let's beat some villain's ass.");
  message("Click button to stop villains.");
}

var exit = function (){
  setTimeout( function (){
  $('div.container').html("<h1>Game Over</h1><br><p>Refresh to restart</p>");
  }, 5000);
}

var clearLog = function (){
  $('div#log').html("");
}

// var turnBattle = function(){
//   var turn = true;
// }
//
// var menuInput= function (input) {
//   if (input === '1') {
//     return randomVilGen();
//   } else if (input === '2') {
//     currentPlayer.hp = currentPlayer.maxHp;
//     return message('Recovered');
//   } else if (input === '3') {
//     return exit();
//   } else {
//     alert('error');
//   }
// }
//
// var battleInput= function (input) {
//   if (input === '1') {
//     return this.attack();
//   } else if (input === '2') {
//     if (currentPlayer.hp + 5< currentPlayer.maxHp) {
//       currentPlayer.hp += 5;
//     }
//     return message('Recovered').nextTurn();
//   } else if (input === '3') {
//     return this.clearMonster().message('Escaped');
//   } else {
//     alert('error');
//   }
// }
//
// var  nextTurn= function () {
//   turn = !turn;
//   $('#battle-button').disabled = true;
//   if (!turn) {
//     setTimeout(function () {
//       message(currentVillain.name + "'s turn'");
//       setTimeout(function () {
//         $('#battle-button').disabled = false;
//         if (currentPlayer.attacked()) {
//           message("Got damage of "+currentVillain.str);
//           setTimeout(function () {
//             message(hero.name + "'s turn'");
//           }, 1000);
//         }
//       }, 1000);
//     }, 1000);
//   }
// }



//Front-end////////////////////////////////////////
$(document).ready(function(){
  $("#temp-generator").click(function(){
    newHero();
    $("#hero-info").removeClass("hidden");
    $("#hero-name").text(currentPlayer.name);
    $("#hero-hp").text(currentPlayer.hp);
    $("#hero-str").text(currentPlayer.str);
    $("#hero-xp").text(currentPlayer.xp);
    $("#hero-lv").text(currentPlayer.lv);

  });
  //should incorporate other contents linked to the hidden formaat.


  $("#temp-booter").click(function(){
    clearLog();
    vilAppender();
    randomVilGen();
    message("Encountered "+currentVillain.name+"...");
    message(currentPlayer.name+": "+currentVillain.name+"! Cease and desist!");
    message(currentVillain.name+": What's this fucker?!");
    currentPlayer.battle(currentVillain);
    $("#hero-info").removeClass("hidden");
    $("#hero-name").text(currentPlayer.name);
    $("#hero-hp").text(currentPlayer.hp);
    $("#hero-str").text(currentPlayer.str);
    $("#hero-xp").text(currentPlayer.xp);
    $("#hero-lv").text(currentPlayer.lv);
  });

  $("#game-menu").submit(function(e){
    e.preventDefault();
    var menuOption = $("menu-input").val();
    $("#game-menu")[0].reset;
    TurnGame.getInstance().menuInput(menuOption);

  });
  $("#battle-menu").submit(function(e){
    e.preventDefault();
    var battleOption = $("battle-input").val();
    TurnGame.getInstance().battleInput(battleOption);
  });
});
