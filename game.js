"strict mode";

/* start new game - computer plays sequence -  wait for user input - check user clicks against game pattern -
 - if !== game is over - if ===, increase sequence - play sequence - wait for user input ...
*/

const levelTitle = document.querySelector("h1");
let buttonColours = ["red", "blue", "yellow", "green"];
let gamePattern = [];
let userChosenColours = [];
let levelCounter = 0;
let gameStarted = false;

// add new element to gamePattern array
function nextSequence() {
	gamePattern.push(buttonColours[Math.floor(Math.random() * 4)]);
}

// Compare gamePattern with last click target
function checkSequence() {
	if (userChosenColours[userChosenColours.length - 1] === gamePattern[userChosenColours.length - 1]) {
		return;
	} else {
		return isOver();
	}
}

// Game over effects.
function isOver() {
	mistakeAudio = new Audio("sounds/wrong.mp3");
	mistakeAudio.play();
	levelTitle.textContent = "Game Over at level " + levelCounter;
	levelTitle.style.color = "red";
	gamePattern = [];
	gameStarted = false;
}

function buttonAudio(targetButtonId) {
	var audio = new Audio("sounds/" + targetButtonId + ".mp3");
	audio.play();
}

function buttonAnimation(targetButtonId) {
	document.getElementById(targetButtonId).classList.add("pressed");
	setTimeout(() => {
		document.getElementById(targetButtonId).classList.remove("pressed")
	}, 250);
}

// play the current sequence of  buttons in the game (gamePattern)
function playPattern() {
	setTimeout(() => {
		buttonAudio(document.querySelector("#" + gamePattern[gamePattern.length - 1]).id);
		buttonAnimation(document.querySelector("#" + gamePattern[gamePattern.length - 1]).id);
		gameStarted = true;
	}, 1000)
}

function gameRound() {
	gameStarted = false;
	userChosenColours = [];
	nextSequence();
	levelCounter++;
	document.querySelector("h1").textContent = "Level " + levelCounter;
	playPattern();
}

// Set "N" key to start new game
document.addEventListener("keydown", (event) => {
	if (event.code === "KeyN") {
		userChosenColours = [];
		gamePattern = [];
		levelCounter = 0;
		document.querySelector("h1").style.color = "#FEF2BF";
		gameRound();
	}
});

// Click listeners
for (let i = 0; i < 4; i++) {
	let currentButton = document.querySelector("#" + buttonColours[i]);
	currentButton.addEventListener("click", function() {
		buttonAudio(currentButton.id);
		buttonAnimation(currentButton.id);
		if (gameStarted === true) {
			userChosenColours.push(currentButton.id);
			checkSequence();
			if (userChosenColours.length === gamePattern.length) {
				gameRound();
			}
		}
	});
}
