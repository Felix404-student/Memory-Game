/*
Author: Justin Brown
Assignment "Memory Game" for UMass/Springboard Bootcamp
For this assignment, you’ll be building a memory game in the browser using HTML, CSS, and JavaScript.
Your goal is to build a card-based memory game. Players will be shown a collection of cards, face 
down, and can click on a card to reveal what’s underneath. After clicking on two cards, the game 
should check to see whether they match. If they do, they will remain facing up. If not, the cards 
should remain displayed to the player for one second, and then flip back down. The goal of the game 
is to match up all the pairs. Clicking a card should change the background color to be the color of 
the class it has. Users should only be able to change at most two cards at a time. Clicking on two 
matching cards should be a “match” — those cards should stay face up. When clicking two cards that 
are not a match, they should stay turned over for at least 1 second before they hide the color again. 
You should make sure to use a setTimeout so that you can execute code after one second. Make sure this 
works only if you click on two different cards — clicking the same card twice shouldn’t count as a 
match!) Make sure that you can not click too quickly and guess more than two cards at a time.
*/
const gameContainer = document.getElementById("game");
let clickCounter = 0;
let lastClicked = null;
let score = 0;

// list of colors for cards, determines how many cards get created.
// all colors must be in the list twice.
const COLORS = [
  "maroon",
  "midnightblue",
  "gold",
  "darkorange",
  "purple",
  "black",
  "grey",
  "magenta",
  "teal",
  "cyan",
  "white",
  "maroon",
  "royalblue",
  "midnightblue",
  "gold",
  "darkorange",
  "purple",
  "black",
  "grey",
  "cyan",
  "magenta",
  "teal",
  "white",
  "royalblue"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = color;

    //sets the card backs to Hearthstone theme
    newDiv.classList.add("cardback");

    // call a function handleCardClick when a div is clicked on
    //newDiv.addEventListener("click", handleCardClick);

    // starting value of hidden value "matched"
    newDiv.dataset.matched = "false";

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// event handler for clicking a card
// runs most of the game
function handleCardClick(event) {

  // tracker for clicks while testing. disabled for normal use
  //console.log("you just clicked", event.target.className);

  // flipped yet?
  if (event.target.classList.contains("cardback")) {

    // increments on-screen guess counter
    clickCounter++;
    let count = document.getElementById("guesses");
    count.innerText = ("Guesses: "+clickCounter);
  } else {
    return;
  }
  // 1st card
  if (clickCounter % 2 != 0){
    event.target.classList.remove("cardback");
    lastClicked = event.target;

  } else { // 2nd card
    event.target.classList.remove("cardback");
    let cards = document.querySelectorAll("div div");
    removeClickEvent();

    // match found
    if (event.target.classList[0] == lastClicked.classList[0]){
      event.target.dataset.matched = "true";
      lastClicked.dataset.matched = "true";

      //flash matched cards
      let color = event.target.classList[0];
      event.target.style.backgroundColor = "white";
      lastClicked.style.backgroundColor = "white";
      setTimeout(function(){
        lastClicked.style.backgroundColor = color;
        event.target.style.backgroundColor = color;
        lastClicked = null;
      }, 60);

      //check if game is over
      let cards = document.querySelectorAll("div div");
      for(let card of cards) {

        //game not over
        if (card.dataset.matched === "false"){
          addClickEvent();
          return;
        }
      }
      //game over, check for high score
      highScore();
      return;

    // not a match, flip both over
    } else { 
      setTimeout(function(){ 
        event.target.classList.add("cardback");
        lastClicked.classList.add("cardback");
        addClickEvent();
      }, 750)
    }
  }
}

// set high score at start and end of game
function highScore() {
  // start of game
  if (!localStorage.getItem("highScore")) {
    localStorage.setItem("highScore", 0);
  } 
  score = localStorage.getItem("highScore");
  let count = document.getElementById("score");
  count.innerText = ("High Score: "+score);

  //check for high score
  if (clickCounter == 0){
    return
  } else { // new high score
    if (localStorage.getItem("highScore") == 0 | clickCounter < localStorage.getItem("highScore")){
      localStorage.setItem("highScore", clickCounter)
      let count = document.getElementById("score");
      count.innerText = ("High Score: "+score);
      setTimeout(function() {
        alert("NEW HIGH SCORE!")
      }, 100);
      setTimeout(function() {
        window.location.reload();
      }, 3000);
  } else {
    setTimeout(function() {
      alert("Congratulations, you won!")
    }, 100);
    setTimeout(function() {
      window.location.reload();
    }, 3000);
  }
  }
}

// adds event listener through delegation from game div
function addClickEvent() {
  gameContainer.addEventListener("click", handleCardClick);
}

// removes the event listener to prevent extra clicks
function removeClickEvent() {
  gameContainer.removeEventListener("click", handleCardClick);
}

// initialization method
document.addEventListener("DOMContentLoaded", function(){
  let shuffledColors = shuffle(COLORS); //creates order of cards
  createDivsForColors(shuffledColors); // when the DOM loads, shuffle colors, then create Divs
  addClickEvent();                    // adds click event listener to play
  highScore();                       // loads previous high score (if any)
})

// let cards = document.querySelectorAll("div div");
// localStorage.setItem("highScore", 0);