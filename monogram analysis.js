occurences = new Array(26).fill(0);
percentages = [];

const magicNumbers = [7.7, 12.5, 33];
const distribution = [
	8.55, 1.60, 3.16, 3.87, 12.10, 2.18, 2.09, 4.96, 7.33, 0.22, 0.81, 4.21, 2.53,
	7.17, 7.47, 2.07, 0.10, 6.33, 6.73, 8.94, 2.68, 1.06, 1.83, 0.19, 1.72, 0.11
];

function drawBars() {
	for (let i = 0; i < 79; i++) {
		if (i % 3 !== 0) {
			fill((i - 1) % 3 == 0 && [150, 75, 255] || [255, 170, 0]);
			rect(i * barWidth, (maxHeight/5)-(maxHeight/50), barWidth, -(maxHeight * ((i - 1) % 3 == 0 && (percentages[(i-1)/3]/100) || (distribution[(i-2)/3]/100))));
		}
	}
	fill(50,50,50);
	for (let i = 65; i < 91; i++) {
		text(String.fromCharCode(i), (windowWidth * ((i-64.6)/26)), (maxHeight/5)-(maxHeight/100));
	}
}

function getMousePos(x, y) {
	let letter = Math.floor(x/(windowWidth/26));
	let info = String.fromCharCode(letter+65) + ": " + occurences[letter] + "\n" + percentages[letter] + "%\n(" + distribution[letter] + "%)";
	fill(100,100,100,50);
	rect(letter*(windowWidth/26), -5, windowWidth/26, windowHeight);
	fill(25,25,25);
	text(info, x, y);
}

function updateCipher() {
	ciphertext = (input.value()).toUpperCase();
	occurences = new Array(26).fill(0);
	percentages = [];
	
	for (let char of ciphertext) {
		occurences[char.charCodeAt(0) - 65] += 1;
	}

	for (let i of occurences) {
		percentages.push(((i / ciphertext.length)*100).toFixed(2));
	}
}

function drawLines() {
	line(0, (maxHeight/5)-(maxHeight/50), windowWidth, (maxHeight/5)-(maxHeight/50));
	for (let i = 0; i < magicNumbers.length; i++) {
		line(0, (maxHeight/magicNumbers[i]), windowWidth, (maxHeight/magicNumbers[i]));
		text((i+1)*5 + "%", 0, (maxHeight/magicNumbers[i]));
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight-10);
	background(255);
	
	input = createInput();
  input.position(windowWidth/75, windowHeight/25);

  let button = createButton('analyse');
  button.position(input.x + input.width, windowHeight/25);
  button.mousePressed(updateCipher);
}

function draw() {
	clear()
	textSize(windowWidth/75);
	barWidth = windowWidth/79;
	maxHeight = windowHeight*5;
		
	drawLines();
	drawBars();
	getMousePos(mouseX, mouseY);
}
