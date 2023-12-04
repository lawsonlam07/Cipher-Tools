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
    joiner = "";
    initial = buttons.ciphertext.value().split(" ");
    toText = "toPlaintext";
    result = "plaintext";
  } else {
    joiner = " ";
    initial = Array.from(buttons.plaintext.value().toUpperCase());
    toText = "toCipher";
    result = "ciphertext";
  }
  let end = [];
  for (let v of initial) {
    if (v in morse[toText]) {
      end.push(morse[toText][v]);
    } else {
      end.push(v);
    }
  }
  buttons[result].value(end.join(joiner));
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
  background(214, 167, 86);
  buttons = {
    ciphertext: createElement("textarea"),
    plaintext: createElement("textarea"),
    auto: createButton("Solve"),
    copy: createButton("Copy")
  }
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
    buttons[v].style("background-color", "rgb(221,190,129)");
    buttons[v].style("border-radius", "10px");
    if (v == "auto" || v == "copy") {
      buttons[v].style("font-size", `${windowHeight/13.8}px`)
    }
  }
  createCanvas(windowWidth, windowHeight-20);
  textSize(windowHeight/20);
  fill(112, 45, 0);
  text("Ciphertext", 0, 0, windowWidth);
  text("Plaintext", 0, windowHeight*(11/12), windowWidth);
  textSize(windowHeight/10);
  text("Morse Code Converter", 0, windowHeight*(5.175/12), windowWidth, windowHeight/7);
}
