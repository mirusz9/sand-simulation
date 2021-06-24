const width = 600;
const height = 400;
sidebarWidth = 50;
const scaleFactor = 5;

const map = Array.from({ length: width / scaleFactor }, () =>
	Array.from({ length: height / scaleFactor }, () => null)
);

function setup() {
	createCanvas(width + sidebarWidth, height);
	noStroke();
	fill('#E4C18B');
	frameRate(30);
}
let currentBrush = 0;
const particleTypes = [
	{
		color: '#e4c18b',
		directions: [
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: -1, y: 1 },
		],
		denserThan: [null, 1, 2],
	},
	{
		color: '#316DDD',
		directions: [
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: -1, y: 1 },
			{ x: 1, y: 0 },
			{ x: -1, y: 0 },
		],
		denserThan: [null, 2],
	},
	//		color: '#3b842d
];

function processMap() {
	let stop = true;
	for (let y = height / scaleFactor - 1; y >= 0; y--) {
		for (let x = 0; x < width / scaleFactor; x++) {
			const currentCell = map[x][y];
			if (currentCell === null) continue;
			map[Math.floor((width * 7) / (scaleFactor * 8))][0] =
				Math.random() > 0.5 ? 1 : null;
			const particle = particleTypes[currentCell];

			for (const dir of particle.directions) {
				const targetCell = map[x + dir.x]?.[y + dir.y];

				if (targetCell !== undefined && particle.denserThan.includes(targetCell)) {
					map[x + dir.x][y + dir.y] = currentCell;
					map[x][y] = targetCell;
					break;
				}
			}
		}
	}
	return stop;
}

function draw() {
	background(100);
	fill(150);
	rect(width, 0, sidebarWidth, height);
	fill(particleTypes[currentBrush].color);
	rect(width + 10, 10, sidebarWidth - 20, sidebarWidth - 20);

	map[Math.floor(width / (scaleFactor * 8))][0] = Math.random() > 0.5 ? 0 : null;
	map[width / scaleFactor - 1][0] = Math.random() > 0.5 ? 0 : null;
	map[Math.floor((width * 7) / (scaleFactor * 8))][0] = Math.random() > 0.5 ? 1 : null;
	map[Math.floor(width / (scaleFactor * 2))][height - 2] = Math.random() > 0.5 ? 2 : null;

	for (let x = 0; x < width / scaleFactor; x++) {
		for (let y = 0; y < height / scaleFactor; y++) {
			const currentCell = map[x]?.[y];
			if (currentCell === null) continue;
			fill(particleTypes[currentCell].color);
			rect(x * scaleFactor, y * scaleFactor, scaleFactor, scaleFactor);
		}
	}
	processMap();
	//if (processMap()) {
	//noLoop();
	//console.log('stopped');
	//}
}

function keyPressed() {
	if (keyCode === ESCAPE) {
		noLoop();
		console.log('stopped');
	}
	switch (keyCode) {
		case ESCAPE:
			noLoop();
			console.log('stopped');
			break;
	}
}
