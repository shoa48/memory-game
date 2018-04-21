/*
* Create a list that holds all of your cards
*/
let card = document.getElementsByClassName("card");
let cards = [...card];
const deck = document.querySelector('.deckk');
let moveCounter = document.getElementById("moves")
let moves;
let stars;
let matched = 0;
var openedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

document.body.onload = newGame();
function newGame() {
	//  shuffle the list of cards using the provided "shuffle" method below
	let shflCards = shuffle(cards);
	// reset the cards
	// loop through each card and create its HTML
	// add each card's HTML to the page
	deck.innerHTML = "";
	for (var i = 0; i < shflCards.length; i++){
		[].forEach.call(shflCards, function(item) {
		deck.appendChild(item);
	});
		shflCards[i].classList.remove("show", "open", "match", "disabled");
	}
	// reset moves
	moves = 0;
	moveCounter.innerHTML = moves;
	// reset stars
	var starUl = document.querySelector(".stars");
	for (var i= stars; i<3; i++){
		console.log(stars);
		var starLi = document.createElement('li');
		starLi.innerHTML = '<li><i class="fa fa-star"></i></li>';
		starUl.appendChild(starLi);
	}
	stars=3;
	//reset timer
	second = 0;
	minute = 0; 
	var timer = document.querySelector(".time");
	timer.innerHTML = "00:0";
	clearInterval(interval);
}

var showCard = function (evt){
	const selectedCard = evt.target;
	selectedCard.classList.add('open');
	selectedCard.classList.add('show');
	selectedCard.classList.add('disabled');
};

var openCard = function (evt){
	const selectedCard = evt.target;
	openedCards.push(selectedCard);
	var length = openedCards.length;
	if(length == 2){
		movesInc();
	if(openedCards[0].innerHTML === openedCards[1].innerHTML){
		match();
	} else {
		noMatch();
	}
}};

function match() {
	matched++;
	openedCards[0].classList.add("match","disabled");
	openedCards[1].classList.add("match","disabled");
	openedCards[0].classList.remove("show", "open");
	openedCards[1].classList.remove("show", "open");
	openedCards = [];
	if(matched==8) {
		gameFinished();
	}
}

function noMatch(){
	openedCards[0].classList.add("unmatched","disabled");
	openedCards[1].classList.add("unmatched","disabled");
	disable();
	setTimeout(function(){
		openedCards[0].classList.remove("show", "open","unmatched","disabled");
		openedCards[1].classList.remove("show", "open", "unmatched","disabled");
		enable();
		openedCards = [];
	},450);
}

// Function to count the moves 
function movesInc() {
	moves++;
	moveCounter.innerHTML = moves;
	if(moves == 1){
		second = 0;
		minute = 0; 
		startTimer();
	}
	if(moves == 7) {
		removeStar();
	}
	if(moves == 15) {
		removeStar();
	}
	if(moves == 25) {
		removeStar();
		gameOver("Lost stars");
	}
}

function removeStar() {
	// var starUl = document.querySelector(".stars");
	var filledStar = document.querySelector(".fa-star");
	filledStar.parentNode.removeChild(filledStar);
	stars -=1;
}

//  startTimer from: http://jsfiddle.net/wr1ua0db/17/
var second = 0, minute = 0;
var timer = document.querySelector(".time");
var interval;
function startTimer(){
	interval = setInterval(function(){
		timer.innerHTML = minute+":"+second;
		second++;
		if(second == 60){
			minute++;
			second=0;
		}
		if(minute == 1){
			gameOver("Time ended");
		}
	},1000);
}

// Add event listener to show functions when card clicked.
for (var i = 0; i < cards.length; i++){
	let card=cards[i];
	card.addEventListener("click", showCard);
	card.addEventListener("click", openCard);
}

// PopUp messages fromA: https://sweetalert.js.org
// If time or stars ended, player lost
function gameOver(string) {
	swal({
		title: "Game Over",
		text: string,
		icon: "warning",
		buttons: ["Exit","Play Again"],
		dangerMode: true,
	}).then((playAgain) => {
		if (playAgain) {
			second = 0, minute = 0;
			newGame();
		}else {
			clearTimeout(interval);
			for (var i = 0; i < cards.length; i++){
				cards[i].classList.add("open","disabled");
			}
		}
	});
}

// To congrats the player and display his score ff the cards matched.
function gameFinished(){
	matched == 0;
	swal({
		title: "Good job! You Won!",
		text: "with "+moves+" moves and "+stars+" stars.",
		icon: "success",
		button: "Play Again!",
		}).then((playAgain) => {
		if (playAgain) {
			second = 0, minute = 0;
			newGame();
		}
	});	
}

//  source:https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript
//disable cards temporarily
function disable() {
	let card = document.getElementsByClassName("card");
	Array.prototype.filter.call(card, function (card) {
	card.classList.add("disabled");
	});
}
//enable cards and disable matched cards
function enable() {
	let card = document.getElementsByClassName("card");
	Array.prototype.filter.call(card, function (card) {
	card.classList.remove("disabled");
	});
}