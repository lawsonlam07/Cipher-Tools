//This solver requires "trigrams.js" to analyse and give values to each trigram.
function setup() {
	input = createInput();
	background(100);
	console.log(trigrams["JQZ"]);
}

function draw() {
	createCanvas(windowWidth-20, windowHeight-20);
	input.position(windowWidth/100, windowWidth/100);
	input.size(windowWidth*(97/100));
	let plaintext = input.value().split(" ");
	console.log(plaintext);
}
