const game = document.querySelector('.game');
let tiles = [
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null]
];
let tilesValues = [
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

const reveal = (el,bomb, x, y) => {
	console.log(bomb)
	el.classList.replace("masked", "revealed");
	el.style.setProperty("--bg-color", colors[el.dataset.bombAround]);
	if (bomb === 0) {
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (tiles[y + i] != undefined) {
					if (tiles[y + i][x + j] != undefined && tiles[y+i][x+j] != el) {
						setTimeout(() => {
							const e = tiles[y + i][x + j]
							reveal(e, e.dataset.bombAround, e.dataset.x, e.dataset.y)
						}, 100)
					}
				}
			}
		}
	} 
}

const init = () => {
	game.innerHTML = null;
	for (let i = 0; i < 100; i++) {
		const div = document.createElement("div");
		div.classList.add('masked')
		div.dataset.index = i;
		const y = (Math.floor(i / 10) > i / 10) ? Math.floor(i / 10) - 1 : Math.floor(i / 10);
		const x = i % 10;
		tiles[y][x] = div;
		if (Math.floor(Math.random() * 5) === 100) {
			div.classList.add('bomb');
			tilesValues[y][x] = -1;
			bombsCount++
			div.addEventListener('click', () => {
				alert("💣 Game Over 💣");
				init();
			});
		}
		div.dataset.x = x;
		div.dataset.y = y;
		game.appendChild(div);
	}
	const divs = document.querySelectorAll(".masked");
	const notBombs = Array.from(divs).filter(el => !el.classList.contains("bomb"));

	notBombs.forEach(e => {
		e.dataset.bombAround = 0;
		const y = Number(e.dataset.y);
		const x = Number(e.dataset.x);
		let bombAround = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (tilesValues[y + i] != undefined) {
					if (tilesValues[y + i][x + j] != undefined) {
						if (tilesValues[y + i][x + j] === -1) bombAround++;
					}
				}
			}
		}
		e.dataset.bombAround = bombAround;
		e.addEventListener('click', () => {
			reveal(e, bombAround, x, y);
		});
	})

	setInterval(() => {
		const masked = document.querySelectorAll(".masked");
		if (Array.from(masked).length === bombsCount) {
			alert('Congrats, you found all the bombs!')
		}
	}, 100);
}
init();