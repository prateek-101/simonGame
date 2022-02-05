var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);

  playSound(userChoosenColor);
  animatePress(userChoosenColor);

  answerCheck(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChooseColor = buttonColor[randomNumber];
  gamePattern.push(randomChooseColor);

  $("#" + randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChooseColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");  //  avoid dot while adding a class
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function answerCheck(currentLevel) {
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);
    startOver();
    }
  }

  function startOver(){
    level=0;
    gamePattern=[];
    started=false;
  }

