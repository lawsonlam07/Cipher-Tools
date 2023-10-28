const distribution = [
	8.55, 1.60, 3.16, 3.87, 12.10, 2.18, 2.09, 4.96, 7.33, 0.22, 0.81, 4.21, 2.53,
	7.17, 7.47, 2.07, 0.10, 6.33, 6.73, 8.94, 2.68, 1.06, 1.83, 0.19, 1.72, 0.11
];
let plaintext = [];

function stats() {
	occurences = Array(26).fill(0);
	for (let i = 0; i < ciphertext.length; i++) {
		let char = ciphertext[i];
		if (65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90) {
			occurences[char.charCodeAt(0) - 65] += 1;
		}
	}
	percentages = [];
	for (let i = 0; i < occurences.length; i++) {
		let num = occurences[i];
		percentages.push(parseFloat((num / ciphertext.length * 100).toFixed(2)));
	}
}

function fitness() {
	difference = [];
	for (let _ = 0; _ < 26; _++) {
		let total = 0;
		for (let i = 0; i < percentages.length; i++) {
			total += Math.abs(percentages[i] - distribution[i]);
		}
		percentages.push(percentages.shift());
		difference.push(total);
	}
}

function solve() {
	plaintext = [];
	for (let i = 0; i < ciphertext.length; i++) {
		let char = ciphertext[i];
		if (65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90) {
			let newChar = char.charCodeAt(0) - difference.indexOf(Math.min(...difference));
			plaintext.push(String.fromCharCode(newChar < 65 ? newChar + 26 : newChar));
		} else {
			plaintext.push(char);
		}
	}
}

function solveCipher() {
	textSize(50);
	text("Ciphertext", 0, windowHeight*(1/7));
	text("Plaintext", windowWidth*(51/100), windowHeight*(1/7));
	line(0, windowHeight*(1/6), windowWidth, windowHeight*(1/6));
	line(windowWidth/2, 0, windowWidth/2, windowHeight);
	textSize(12);
	text(input.value().toUpperCase(), windowWidth*(1/40), windowHeight*(1/5), windowWidth*(18/40), windowHeight*(3/4));
	text(plaintext.join(""), windowWidth*(21/40), windowHeight*(1/5), windowWidth*(18/40), windowHeight*(3/4));
	ciphertext = input.value().toUpperCase();
	stats();
	fitness();
	solve();
}

function copyPlaintext() {
  let decrypt = document.createElement("textarea");
  document.body.appendChild(decrypt);
  decrypt.value = plaintext.join("");
  decrypt.select();
  document.execCommand("copy");
	if (decrypt.hasChildNodes()) {
		document.body.removeChild();
	}
}

function setup() {
	createCanvas(windowWidth-25, windowHeight-10);
	background(255);
	input = createInput("");
  input.position(windowWidth/100, windowHeight/100);
	input.size = (windowWidth);
	button = createButton("Copy");
  button.position(input.x + input.width, input.y);
  button.mousePressed(copyPlaintext);
}

function draw() {
	clear();
	solveCipher();
}
