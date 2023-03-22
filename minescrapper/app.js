const game = document.querySelector('.game');
let casesValues = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
const colors = ['white', 'blue', 'green', 'steelblue', 'purple', 'yellow', 'lightcoral', 'pink', 'brown']
let bombsCount = 0;

const reveal = el => {
	if (el.dataset.bombAround === 0) {
		console.log("white");
	}
	el.classList.replace("masked", "revealed");
	el.style.setProperty("--bg-color", colors[el.dataset.bombAround]);
}

const init = () => {
	game.innerHTML = null;
	for (let i = 0; i < 100; i++) {
		const div = document.createElement("div");
		div.classList.add('masked')
		div.dataset.index = i;
		const y = (Math.floor(i / 10) > i / 10) ? Math.floor(i / 10) - 1 : Math.floor(i / 10);
		const x = i % 10;
		if (Math.floor(Math.random() * 10) === 1) {
			div.classList.add('bomb');
			casesValues[y][x] = -1;
			bombsCount++
			div.addEventListener('click', () => {
				alert("💣 Game Over 💣");
				init();
			});
		} else {
			div.addEventListener('click', () => {
				reveal(div);
			});
			div.dataset.x = x;
			div.dataset.y = y;
		}
		game.appendChild(div);
	}
	const divs = document.querySelectorAll(".masked");
	const notBombs = Array.from(divs).filter(el => !el.classList.contains("bomb"));

	notBombs.forEach(e => {
		const y = Number(e.dataset.y);
		const x = Number(e.dataset.x);
		let bombAround = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (casesValues[y + i] != undefined) {
					if (casesValues[y + i][x + j] != undefined) {
						if (casesValues[y + i][x + j] === -1) bombAround++;
					}
				}
			}
		}
		e.dataset.bombAround = bombAround;
	})

	setInterval(() => {
		const masked = document.querySelectorAll(".masked");
		if (Array.from(masked).length === bombsCount) {
			alert('Congrats, you found all the bombs!')
		}
	}, 100);
}
init();