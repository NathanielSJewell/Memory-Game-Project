//select game div
const gameContainer = document.getElementById('game');

//array of colors
const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

//create global scope object that keeps track of the clicked div's status
const divTracker = { numOfClicks: 0 };

//variable that stores the first click's classname
let firstClickClassName = null;
let secondClickClassName = null;

//varible that keeps track of how many items are flipped
let flippedCount = 0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	//create variable that stores the number of items in the array
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		//variable stores a number between 0 and 10 (excluding 10)
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		//swaps the values of index and counter
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

//variable stores shuffle function with COLORS passed in
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');
		//create an event listener for the new div
		newDiv.addEventListener('click', function(event) {
			//give div a new class with a value of color
			newDiv.classList.add(color);
			//increment the number of clicks
			divTracker.numOfClicks++;
			console.log(`Div was clicked ${divTracker.numOfClicks} times.`);

			//stores the value of the first click to the global variable
			if (divTracker.numOfClicks === 1) {
				firstClickClassName = newDiv.className;
				//stores the second click's classname to a variable
			} else if (divTracker.numOfClicks === 2) {
				secondClickClassName = this.className;
				//console.log `matching colors` if the two variables match
				if (firstClickClassName === secondClickClassName) {
					console.log(`Matching Colors!`);
					//reset number of clicks when a match is found
				}
			}
		});

		// append new div to div with id of 'game'
		gameContainer.append(newDiv);
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);

// check how many clicks happened, see how many cards are currently open, and reset if two are opened that are unmatching

// think of scenarios where card 1 and card 2 are the same

// remove event listener of cards that are flipped and matching

//think of scenarios where the flipped card

// //saved code for checking if colors match: 			//store the first click's classname
// 			if (firstClickClassName === null) {
// 				// Save the class name of the first click
// 				firstClickClassName = this.className;
// 				console.log('First click class name:', firstClickClassName);
// 			} else {
// 				//compare the class name of the second click with the first click
// 				if (this.className === firstClickClassName) {
// 					console.log(`Matching colors!`);
// 				}
// 			}
