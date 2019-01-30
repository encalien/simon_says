var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextInSequence() {
	var randomNumber = Math.floor(Math.random() * 4);
	var randomNextColor = buttonColours[randomNumber];
	gamePattern.push(randomNextColor);
	playSound(randomNextColor);
	$("#" + randomNextColor).fadeOut().fadeIn();
	level++;
	updateScoreDisplay();
}

function playSound(buttonColor) {
	var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', "sounds/" + buttonColor + ".mp3");
	audioElement.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function(){$("#" + currentColor).removeClass("pressed")}, 150);

}

function updateScoreDisplay() {
	$("h1").text("Current level: " + level);
}

function checkAnswer() {
	for (var i = 0; i < userClickedPattern.length; i++) {
		if (gamePattern[i] != userClickedPattern[i]) {
			gameOver();
			reset();
			return false;
		}
	} 
	if (gamePattern.length != userClickedPattern.length) {
		return false;
	}
	return true;
}

function gameOver() {
	$("h1").text("GAME OVER! Your ending level: " + level + ". Press any key to restart");
	var gameOverAudio = document.createElement('audio');
  gameOverAudio.setAttribute('src', "sounds/wrong.mp3");
	gameOverAudio.play();
	$("body").addClass("game-over");
	setTimeout(function(){$("body").removeClass("game-over")}, 300);
}

function reset() {
	gamePattern = [];
	userClickedPattern = [];
	level = 0;
}

$(".btn").on("click", function(event) {
	if (level > 0) {
		userChosenColor = event.target.id;
		userClickedPattern.push(userChosenColor);
		playSound(userChosenColor);
		animatePress(userChosenColor);
		if (checkAnswer()) { 
			nextInSequence();
			userClickedPattern = [];
		}
	} else {
		alert("You must first press any key to start the game!");
	}
});

$(document).keypress(function() {
	if (level < 1) { nextInSequence(); }
	updateScoreDisplay();
});



