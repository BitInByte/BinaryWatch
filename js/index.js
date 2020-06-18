const timeContainer = document.querySelector(".container__watch");

// Variables object
const state = {
	h: 0,
	m: 0,
	s: 0,

};

// debug
window.state = state;

const init = () => {

	cleanMarkup();
	
	const date = time();
	// dateLast = date;
	
	binary(date);

	// document.querySelector(".container__watch--second-1").classList.add("animate-up");
}

const time = () => {

	const e = "container__watch";

	const d = new Date();
	const s = d.getSeconds().toString().padStart(2, "0");
	const m = d.getMinutes().toString().padStart(2, "0");
	const h = d.getHours().toString().padStart(2, "0");
	// timeContainer.textContent = h + ":" + m + ":" + s;
	// timeContainer.textContent = `${h}:${m}:${s}`;

	// console.log(document.querySelector(".animate-down"));

	

	const markup = `
			<span class="container__watch--hour-0 ${checkAnimate(h[0], state.h[0])}">${h[0]}</span><!--
            --><span class="container__watch--hour-1 ${checkAnimate(h[0], state.h[0])}">${h[1]}</span>:<!--
            --><span class="container__watch--minute-0 ${checkAnimate(m[0], state.m[0])}">${m[0]}</span><!--
            --><span class="container__watch--minute-1 ${checkAnimate(m[1], state.m[1])}">${m[1]}</span>:<!--
            --><span class="container__watch--second-0 ${checkAnimate(s[0], state.s[0])}">${s[0]}</span><!--
			--><span class="container__watch--second-1 ${checkAnimate(s[1], state.s[1])}">${s[1]}</span>`;
			
	document.querySelector(`.${e}`).insertAdjacentHTML("afterbegin", markup);

	console.log(document.querySelector(".container__watch--second-1").classList.contains("animate-up"));

	

	state.h = h;
	state.m = m;
	state.s = s;

	return d;
};

const checkAnimate = (time, e) => {
		if (time !== e) {
			return "animate-down";
		}
}

setInterval(init, 1000);

// Convert decimal to binary and markup

const binary = (date) => {
	// console.log(date.getMinutes());

	const hoursClass = "container__binary-watch--hour";
	const minutesClass = "container__binary-watch--minute";
	const secondsClass = "container__binary-watch--second";



	let convertedHours = [];
	let convertedMinutes = [];
	let convertedSeconds = [];

	let convertHours = date.getHours();
	let convertMinutes = date.getMinutes();
	let convertSeconds = date.getSeconds();

	do {

		if(convertHours > 0){
			convertedHours.push(Math.floor(convertHours % 2));

			convertHours = convertHours / 2;
		} else if (Math.floor(convertHours) === 1 || Math.floor(convertHours) === 0) {
			convertedHours.push(convertHours);
		}
	} while(Math.floor(convertHours) > 0)


	do {
		if(convertMinutes > 0) {

			// ConvertedHours.push(Math.floor(convertHours % 2))
			convertedMinutes.push(Math.floor(convertMinutes % 2));
			
			// console.log(convertMinutes % 2);

			// convertHours = convertHours / 2;
			convertMinutes = convertMinutes / 2;

			// console.log(convertMinutes);
			
			
		} else if (Math.floor(convertMinutes) === 1 || Math.floor(convertMinutes) === 0) {
			// console.log(`I'm in ${convert}`);
			
			convertedMinutes.push(convertMinutes);

			// console.log(convertedMinutes.length);
			
		}

		// console.log(`ConvertedMinutes: ${convertedMinutes}`);
		

	
		
	}while(Math.floor(convertMinutes) > 0)

	do {

		if(convertSeconds > 0){
			convertedSeconds.push(Math.floor(convertSeconds % 2));

			convertSeconds = convertSeconds / 2;
		} else if (Math.floor(convertSeconds) === 1 || Math.floor(convertSeconds) === 0) {
			convertedSeconds.push(convertSeconds);
		}
	} while(Math.floor(convertSeconds) > 0)

	if (convertedHours.length < 6) {
		const addZero = 6 - convertedHours.length;

		for(let i = 0; i < addZero; i ++) {
			convertedHours.push(0);
		}
	}

	convertedHours.map(x => binaryMarkup(x, hoursClass));

	// console.log(convertedMinutes.length);
	if (convertedMinutes.length < 6) {
		const addZero = 6 - convertedMinutes.length;

		for(let i = 0; i < addZero; i ++) {
			convertedMinutes.push(0);
		}
	}
	convertedMinutes.map(x => binaryMarkup(x, minutesClass));

	if (convertedSeconds.length < 6) {
		const addZero = 6 - convertedSeconds.length;

		for(let i = 0; i < addZero; i ++) {
			convertedSeconds.push(0);
		}
	}
	convertedSeconds.map(x => binaryMarkup(x, secondsClass));

	
	
}

const binaryMarkup = (number, e) => {

	// TODO Entra aqui um novo argumento com a class onde o markup vai inserir

	if(number === 1) {
		const markup = `<div class="container__binary-watch--full-color">&nbsp;</div>`;
		document.querySelector(`.${e}`).insertAdjacentHTML("afterbegin", markup);
	} else {
		const markup = `<div>&nbsp;</div>`;
		document.querySelector(`.${e}`).insertAdjacentHTML("afterbegin", markup);
	}

	
}

const cleanMarkup = () => {
	document.querySelector(".container__binary-watch--hour").innerHTML = "";
	document.querySelector(".container__binary-watch--minute").innerHTML = "";
	document.querySelector(".container__binary-watch--second").innerHTML = "";
	document.querySelector(".container__watch").innerHTML = "";
}
