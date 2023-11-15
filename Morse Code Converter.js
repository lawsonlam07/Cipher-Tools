const morse = { 
	toPlaintext: {
		".-": "A", "-...": "B", "-.-.": "C", 
		"-..": "D", ".": "E", "..-.": "F", 
		"--.": "G", "....": "H", "..": "I", 
		".---": "J", "-.-": "K", ".-..": "L", 
		"--": "M", "-.": "N", "---": "O", 
		".--.": "P", "--.-": "Q", ".-.": "R", 
		"...": "S", "-": "T", "..-": "U", 
		"...-": "V", ".--": "W", "-..-": "X", 
		"-.--": "Y", "--..": "Z", "-----": "0",
		".----": "1", "..---": "2", "...--": "3",
		"....-": "4", ".....": "5", "-....": "6",
		"--...": "7", "---..": "8", "----.": "9",
		"--..--": ",", ".-.-.-": ".", "..--..": "?",
		"-....-": "-", "-.--.": "(", '-.--.-': ")",
		".----.": "'", "/": " "
	},
	toCipher: { 
		"A": ".-", "B": "-...", "C": "-.-.", 
		"D": "-..", "E": ".", "F": "..-.", 
		"G": "--.", "H": "....", "I": "..", 
		"J": ".---", "K": "-.-", "L": ".-..", 
		"M": "--", "N": "-.", "O": "---", 
		"P": ".--.", "Q": "--.-", "R": ".-.", 
		"S": "...", "T": "-", "U": "..-", 
		"V": "...-", "W": ".--", "X": "-..-", 
		"Y": "-.--", "Z": "--..", "0": "-----",
		"1": ".----", "2": "..---", "3": "...--",
		"4": "....-", "5": ".....", "6": "-....",
		"7": "--...", "8": "---..", "9": "----.",
		"," :"--..--", ".": ".-.-.-", "?": "..--..",
		"-" :"-....-", "(": "-.--.", ")": '-.--.-',
		"'": ".----.", " ": " / "
  }
}

let mode = true

function cipherChanged() {
	mode = true
	solve();
}
function plainChanged() {
	mode = false
	solve();
}

function solve() {
	if (mode) {
		let initial = buttons.ciphertext.value().split(" ");
		let end = [];
		for (let v of initial) {
			if (v in morse.toPlaintext) {
				end.push(morse.toPlaintext[v]);
			} else {
				end.push(v);
			}
		}
		buttons.plaintext.value(end.join(""));
	} else {
		let initial = Array.from(buttons.plaintext.value().toUpperCase());
		let end = [];
		for (let v of initial) {
			end.push(morse.toCipher[v]);
		}
		buttons.ciphertext.value(end.join(" "));
	}
}

function setup() {
	textWrap(CHAR);
	background(214, 167, 86);
	buttons = {
		ciphertext: createElement("textarea"),
		plaintext: createElement("textarea")
	}
	buttons.ciphertext.value();
	buttons.plaintext.value();
	buttons.ciphertext.changed(cipherChanged);
	buttons.plaintext.changed(plainChanged);
}

function draw() {
	positions = {
    ciphertext: [windowWidth/100, windowHeight*(1/12)],
    plaintext: [windowWidth/100, windowHeight*(7/12)]
  }
  sizes = {
    ciphertext: [windowWidth*(98/100), windowHeight*(4/12)],
    plaintext: [windowWidth*(98/100), windowHeight*(4/12)]
  }
	for (let v in buttons) {
    buttons[v].position(positions[v][0], positions[v][1]);
    buttons[v].size(sizes[v][0], sizes[v][1]);
		buttons[v].style("background-color", "rgb(221,190,129)");
	}
	createCanvas(windowWidth, windowHeight-20);
}
