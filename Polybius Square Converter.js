let alpha = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXY");
let numbers = ["1", "2", "3", "4" ,"5"];
let mode = true
let square = [
  Array.from("ABCDE"),
  Array.from("FGHIJ"),
  Array.from("KLMNO"),
  Array.from("PQRST"),
  Array.from("UVWXY")
];

function cipherChanged() {
  mode = true
  solve();
}
function plainChanged() {
  mode = false
  solve();
}

function solve() {
	let end = [];
  if (mode) {
		let ciphertext = Array.from(buttons.ciphertext.value());
		ciphertext = ciphertext.filter(v => numbers.includes(v)).join("");
    ciphertext = ciphertext.match(/.{1,2}/g);
  	for (let pair of ciphertext) {
      end.push(square[Number(pair[0])-1][pair[1]-1]);
  	}
  	buttons["plaintext"].value(end.join(""));
  } else {
    plaintext = Array.from(buttons.plaintext.value().toUpperCase());
		plaintext = plaintext.filter(v => alpha.includes(v));
  	for (let v of plaintext) {
			for (let [i, block] of square.entries()) {
				if (block.includes(v)) {
					end.push(`${i+1}${block.indexOf(v)+1} `);
				}
			}
    }
		buttons["ciphertext"].value(end.join(""));
  }
}

function copyText() {
  let decrypt = document.createElement("textarea");
  document.body.appendChild(decrypt);
  if (mode) {
    decrypt.value = buttons.plaintext.value();
  } else {
    decrypt.value = buttons.ciphertext.value();
  }
  decrypt.select();
  document.execCommand("copy");
  decrypt.remove();
}

function keyPressed() {
  if (keyCode == ENTER) {copyText()}
}

function setup() {
  textWrap(CHAR);
  textAlign(CENTER);
  buttons = {
    ciphertext: createElement("textarea"),
    plaintext: createElement("textarea"),
    auto: createButton("Solve"),
    copy: createButton("Copy")
  }
	buttons.ciphertext.value();
	buttons.plaintext.value();
  buttons.ciphertext.changed(cipherChanged);
  buttons.plaintext.changed(plainChanged);
  buttons.copy.mousePressed(copyText);
}

function draw() {
  positions = {
    ciphertext: [windowWidth/100, windowHeight/12],
    plaintext: [windowWidth/100, windowHeight*(7/12)],
    auto: [windowWidth/100, windowHeight*(5.175/12)],
    copy: [windowWidth*(86.5/100), windowHeight*(5.175/12)]
  }
  sizes = {
    ciphertext: [windowWidth*(98/100), windowHeight*(4/12)],
    plaintext: [windowWidth*(98/100), windowHeight*(4/12)],
    auto: [windowWidth/8, windowHeight/7],
    copy: [windowWidth/8, windowHeight/7]
  }
  for (let v in buttons) {
    buttons[v].position(positions[v][0], positions[v][1]);
    buttons[v].size(sizes[v][0], sizes[v][1]);
    buttons[v].style("background-color", "rgb(122,104,104)");
    buttons[v].style("border-radius", "10px");
    if (v == "auto" || v == "copy") {
      buttons[v].style("font-size", `${windowHeight/13.8}px`)
    }
  }
  createCanvas(windowWidth, windowHeight-20);
  background(166,138,138);
  textSize(windowHeight/20);
  fill(75);
  text("Ciphertext", 0, 0, windowWidth);
  text("Plaintext", 0, windowHeight*(11/12), windowWidth);
  textSize(windowHeight/10);
  text("Polybius Square Converter", 0, windowHeight*(5.175/12), windowWidth, windowHeight/7);
}
