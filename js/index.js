// Variables object
const state = {
	h: 0,
	m: 0,
	s: 0,

};

// debug
// window.state = state;

const init = () => {

	// Clean the markup to render a new markup
	cleanMarkup();
	
	// Get the actual date and render the clock
	const date = time();
	
	// Convert the actual date to binary and render it
	binary(date);
}

const time = () => {

	// Container of the watch
	const e = "container__watch";

	// Get the actual date and store it to a variable
	const d = new Date();

	// Add a 0 if the element is only 1 digit
	const s = d.getSeconds().toString().padStart(2, "0");
	const m = d.getMinutes().toString().padStart(2, "0");
	const h = d.getHours().toString().padStart(2, "0");

	// Create the new markup
	const markup = `
			<span class="container__watch--hour-0 ${checkAnimate(h[0], state.h[0])}">${h[0]}</span><!--
            --><span class="container__watch--hour-1 ${checkAnimate(h[0], state.h[0])}">${h[1]}</span>:<!--
            --><span class="container__watch--minute-0 ${checkAnimate(m[0], state.m[0])}">${m[0]}</span><!--
            --><span class="container__watch--minute-1 ${checkAnimate(m[1], state.m[1])}">${m[1]}</span>:<!--
            --><span class="container__watch--second-0 ${checkAnimate(s[0], state.s[0])}">${s[0]}</span><!--
			--><span class="container__watch--second-1 ${checkAnimate(s[1], state.s[1])}">${s[1]}</span>`;
	
	// Render the markup
	document.querySelector(`.${e}`).insertAdjacentHTML("afterbegin", markup);
	
	// Save the actual time to compare and launch the animation on the clock later
	state.h = h;
	state.m = m;
	state.s = s;

	// Return the date to use to convert to binary
	return d;
};

// Check if the time changed with the oldest one to perform the clock animation if it changed
const checkAnimate = (time, e) => {
		if (time !== e) { return "animate-down"; }
}



// Convert decimal to binary and markup
const binary = (date) => {

	// Classes of the html elements
	const hoursClass = "container__binary-watch--hour";
	const minutesClass = "container__binary-watch--minute";
	const secondsClass = "container__binary-watch--second";

	// Block objects to perform the convertion
	const convertHours = date.getHours();
	const convertMinutes = date.getMinutes();
	const convertSeconds = date.getSeconds();

	// Call the convert function and store the result array to a const variable
	const convertedHours = convertTimeToBinary(convertHours);
	const convertedMinutes = convertTimeToBinary(convertMinutes);
	const convertedSeconds = convertTimeToBinary(convertSeconds);

	// Performs the markup mapping all of the elemtns of the arrays
	convertedHours.map(x => binaryMarkup(x, hoursClass));
	convertedMinutes.map(x => binaryMarkup(x, minutesClass));
	convertedSeconds.map(x => binaryMarkup(x, secondsClass));
}

const convertTimeToBinary = (time) => {

	let convertedTime = [];

	// Perform the convertion of the time
	do {
		if(time > 0){
			convertedTime.push(Math.floor(time % 2));

			time = time / 2;
		} else if (Math.floor(time) === 1 || Math.floor(time) === 0) {
			convertedTime.push(time);
		}
	} while(Math.floor(time) > 0)

	// Check if the binary converted is less than 6, if it is, then add zeros until the length is 6
	if (convertedTime.length < 6) {
		const addZero = 6 - convertedTime.length;

		for(let i = 0; i < addZero; i ++) {
			convertedTime.push(0);
		}
	}

	// Return the array
	return convertedTime;
}

const binaryMarkup = (number, e) => {
	// Perform the binary markup
	if(number === 1) {
		const markup = `<div class="container__binary-watch--full-color">&nbsp;</div>`;
		document.querySelector(`.${e}`).insertAdjacentHTML("afterbegin", markup);
	} else {
		const markup = `<div>&nbsp;</div>`;
		document.querySelector(`.${e}`).insertAdjacentHTML("afterbegin", markup);
	}

	
}

const cleanMarkup = () => {
	// Clean all of the content
	document.querySelector(".container__binary-watch--hour").innerHTML = "";
	document.querySelector(".container__binary-watch--minute").innerHTML = "";
	document.querySelector(".container__binary-watch--second").innerHTML = "";
	document.querySelector(".container__watch").innerHTML = "";
}

// Perform the init 1 in 1 second
setInterval(init, 1000);