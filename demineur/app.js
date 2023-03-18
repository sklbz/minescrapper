const game = document.querySelector('.game');
let cases = [
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null],
	[null,null,null,null,null,null,null,null,null,null]
];
let bombsCount = 0;


const init = () => {
	console.log("initializing...");
	game.innerHTML = null;
	for(let i = 0; i < 100; i++){
		const div = document.createElement("div");
		if (Math.floor(Math.random()*10) === 1) {
			div.classList.add('bomb');
			let y = (Math.floor(i / 10) > i / 10) ? Math.floor(i/10) - 1 : Math.floor(i/10);
			let x = i % 10;
			cases[y][x] = -1;
			bombsCount++
			div.addEventListener('click', init());
		} else div.addEventListener('click', reveal());
		game.appendChild(div);
		console.clear();
		console.log(bombsCount);
		console.log(cases);
	}
}

init();