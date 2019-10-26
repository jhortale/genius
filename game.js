var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var level = 0;

var started = false;


$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Press A Key to Start");
    started = true;
    nextSequence();

  }
});

$(".btn").click(function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  console.log(userClickedPattern);
  console.log(gamePattern);
  checkAnswer(userClickedPattern.length - 1);

});

// Creates a new sewuence
function nextSequence() {

  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);

  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}

// plays sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animate buttons
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 500);
}

// check check answer per level
function checkAnswer(currentLevel) {


  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    // Game Over Restart the game
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    userClickedPattern = [];
    startOver();
  }
}

// start over the game and reset the arrays, levels and flags
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
