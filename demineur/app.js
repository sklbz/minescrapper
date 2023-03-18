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
}

const init = () => {
	game.innerHTML = null;
	for(let i = 0; i < 100; i++){
		const div = document.createElement("div");
		div.classList.add('masked')
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
			div.addEventListener('click', div => reveal(div));
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
	let t = 0;
	for(let i = -1; i<=1;i++){
		for(let j = -1; j<=1;j++){
			if (y+i <= 10 && x+j <=10 && y+i > -1 && x+j >-1){
				console.log(cases[y+i][x+j]); t++;
				if (cases[y+i][x+j] === -1) bombAround++;
			}
		}
	}
	console.log("t " + t);
	a++
	console.log("a", a)
	e.innerHTML = `<p>${bombAround}</p>`
})