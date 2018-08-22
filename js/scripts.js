players={};
var turnScore = 0;

var Player = function (name,id){
  this.name= name;
  this.id= id;
  this.bankscore= 0;
}

Player.prototype.hold =function (){
  this.bankscore += turnScore;
  $(".bankscore-"+currentlyPlayingId).text(" "+this.bankscore);
  turnScore = 0;
  $(".turnscore-"+currentlyPlayingId).text(" "+turnScore);
  switchPlayer();
}

var createPlayer =function (){
  playerOne = new Player("player1",0);
  playerTwo = new Player("player2",1);

  players[playerOne.id] = playerOne;
  players[playerTwo.id] = playerTwo;
}

var initiateGame = function (){
  currentlyPlayingId = 0;
  currentlyPlaying = players[currentlyPlayingId]
}


var whosTurn = function (){
  $(".whosturn").text(" "+currentlyPlaying.name.toUpperCase())
}

var switchPlayer = function (){
  if(currentlyPlayingId === 0){
    currentlyPlayingId = 1;
  } else {
    currentlyPlayingId = 0;
  }
  currentlyPlaying = players[currentlyPlayingId];
  alert("Turn Over!");
  whosTurn();
}

var roll = function(){
  random();
  if(result===1){
    turnScore = 0;
    $(".turnscore-"+currentlyPlayingId).text(" "+turnScore);
    switchPlayer();
  } else {
    turnScore += result;
    $(".turnscore-"+currentlyPlayingId).text(" "+turnScore);
  }
}



var random = function() {
  result= Math.floor(Math.random()*6)+1;
  $(".dicevalue-"+currentlyPlayingId).text(" "+result);
  return result;
}

$(document).ready(function(){
  createPlayer();
  initiateGame();
  whosTurn();
  $("#roll").submit(function(event){
    event.preventDefault();
    roll();
  });
  $("#hold").submit(function(event){
    event.preventDefault();
    currentlyPlaying.hold();
    whosTurn();
  });
});
