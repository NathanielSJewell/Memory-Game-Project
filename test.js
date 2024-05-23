let flippedCount = 0;

let resettingInProgress = false;

//select game div

const gameContainer = document.getElementById('game');

//array of colors

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

// here is a helper function to shuffle an array

// it returns the same array with values shuffled

// it is based on an algorithm called Fisher Yates if you want ot research more

function shuffle(array) {
	//create variable that stores the number of items in the array

	let counter = array.length;

	console.log(counter);

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

		let newDiv = document.createElement('div');

		newDiv.innerText = color;

		newDiv.addEventListener('click', function(event) {
			if (resettingInProgress) {
				return;
			}

			let element = event.target;

			console.log('color', color);

			console.log('you just clicked', element);

			// skip ones that have matched already

			if (element.getAttribute('name') == 'matched') {
				return;
			}

			if (element.classList.contains(color)) {
				flippedCount--;
			} else {
				flippedCount++;
			}

			element.classList.toggle(color);

			var flip = document.getElementById('flipped');

			if (flippedCount == 2) {
				// look for a match

				var matchFound = false;

				for (const child of gameContainer.children) {
					if (child.classList.contains(color) && child != element) {
						matchFound = true;

						console.log('MATCHES!');

						// allows us to disable clicks on the two matching cards, as well as not reset these cards

						child.setAttribute('name', 'matched');

						element.setAttribute('name', 'matched');
					}
				}

				if (!matchFound) {
					// reset all flipped cards

					resettingInProgress = true;

					setTimeout(resetFlippedCards, 1000);
				}

				// reset the counter

				flippedCount = 0;
			}

			flip.innerText = flippedCount;
		});

		// append the div to the element with an id of game

		gameContainer.append(newDiv);
	}
}

function resetFlippedCards() {
	for (const child of gameContainer.children) {
		if (child.classList.length > 0 && child.getAttribute('name') != 'matched') {
			child.classList.toggle(child.classList[0]);
		}
	}

	resettingInProgress = false;
}

// when the DOM loads

createDivsForColors(shuffledColors);
