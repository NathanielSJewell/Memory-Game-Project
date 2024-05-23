const gameContainer = document.getElementById('game');

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

//select paragraph element
const p = document.querySelector(`p`);

let flipCount = 0;

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

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		//add inner text to the div
		newDiv.innerText = `${newDiv.classList}`;

		//toggle classes off by default
		newDiv.classList.toggle(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', function(event) {
			//save event.target to a variable
			let targetDiv = event.target;
			console.log(targetDiv);

			//toggle class on when clicked
			targetDiv.classList.toggle(color);

			if (targetDiv.classList.contains(color)) {
				console.log(`card is flipped!`);
				flipCount++;
			} else {
				console.log(`card is unflipped.`);
				flipCount--;
			}

			for (let div of gameContainer.children) {
				if (this.classList != div.classList.contains(color)) {
					newDiv.classList.toggle(color);
				}
			}
		});

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// // TODO: Implement this function!
// function handleCardClick(event) {
// 	//save event.target to a variable for reference
// 	let targetDiv = event.target;
// 	console.log(targetDiv);
// }

// when the DOM loads
createDivsForColors(shuffledColors);
