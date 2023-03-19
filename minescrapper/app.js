const game = document.querySelector('.game');
let cases = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];
let bombsCount = 0;

const reveal = el => {
  el.classList.replace("masked", "revealed");
	el.removeEventListener('click', () => {
		console.log('clicked');
		reveal(el);
	});
}

const init = () => {
	game.innerHTML = null;
	for(let i = 0; i < 100; i++){
		const div = document.createElement("div");
		div.classList.add('masked')
		div.dataset.index = i;
		const y = (Math.floor(i / 10) > i / 10) ? Math.floor(i/10) - 1 : Math.floor(i/10);
		const x = i % 10;
		if (Math.floor(Math.random()*10) === 1) {
			div.classList.add('bomb');
			cases[y][x] = -1;
			bombsCount++
			div.addEventListener('click', () => {
				alert("Game Over");
				init();
			});
		} else{
			div.addEventListener('click', () => {
				console.log('clicked');
				reveal(div);
			});
			div.dataset.x = x;
			div.dataset.y = y;
		} 
	game.appendChild(div);
	}
}
init();

const divs = document.querySelectorAll(".masked");
const notBombs = Array.from(divs).filter(el => !el.classList.contains("bomb"));

let a = 0;
notBombs.forEach(e => {
	const y =  Number(e.dataset.y);
	const x = Number(e.dataset.x);
	let bombAround = 0;
	console.log(`Looking around cases[${y}][${x}]`)
	for(let i = -1; i<=1;i++){
		for(let j = -1; j<=1;j++){
			if (cases[y+i] != undefined){
				if (cases[y+i][x+j] != undefined){
					console.log(`Current testing cases[${y+i}][${x+j}]`);
					if (cases[y+i][x+j] === -1) bombAround++;
			}
			}
		}
	}
	e.dataset.bombAround = bombAround;
	e.innerText = `${bombAround}`
})