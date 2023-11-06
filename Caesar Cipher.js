const distribution = [
  8.55, 1.60, 3.16, 3.87, 12.10, 2.18, 2.09, 4.96, 7.33, 0.22, 0.81, 4.21, 2.53,
  7.17, 7.47, 2.07, 0.10, 6.33, 6.73, 8.94, 2.68, 1.06, 1.83, 0.19, 1.72, 0.11
];
let plaintext = [];
let shiftNo = 0

function updateShiftNo(sign) {
  shiftNo += sign
  switch (shiftNo) {
    case 26: shiftNo = 0; break;
    case -1: shiftNo = 25; break;
  }
}

function rightButton() {
  updateShiftNo(1)
}

function leftButton() {
  updateShiftNo(-1)
}

function stats() {
  occurences = Array(26).fill(0);
  for (let i = 0; i < cipherLen; i++) {
    let char = ciphertext[i];
    if (65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90) {
      occurences[char.charCodeAt(0) - 65] += 1;
    }
  }
  percentages = [];
  for (let i = 0; i < 26; i++) {
    percentages.push(parseFloat((occurences[i] / cipherLen * 100).toFixed(2)));
  }
}

function fitness() {
  difference = [];
  for (let _ = 0; _ < 26; _++) {
    let total = 0;
    for (let i = 0; i < 26; i++) {
      total += Math.abs(percentages[i] - distribution[i]);
    }
    percentages.push(percentages.shift());
    difference.push(total);
  }
  return difference.indexOf(Math.min(...difference));
}

function shift(pos) {
  plaintext = [];
  for (let i = 0; i < ciphertext.length; i++) {
    let char = ciphertext[i];
    if (65 <= char.charCodeAt(0) && char.charCodeAt(0) <= 90) {
      let newChar = char.charCodeAt(0) - pos;
      plaintext.push(String.fromCharCode(newChar < 65 ? newChar + 26 : newChar));
    } else {
      plaintext.push(char);
    }
  }
}

function drawUI() {
  textSize(windowHeight/13.8);
  text(shiftNo, windowWidth*(99/100)-windowHeight*(1.55/7), windowHeight*(5.65/6));
  textStyle(BOLD);
  text("Ciphertext", windowWidth/4, windowHeight*(1/7));
  text("Plaintext", windowWidth*(3/4), windowHeight*(1/7));
  textStyle(NORMAL);
  line(1, 35, 1, windowHeight*(5/6));
  line(windowWidth-11, 35, windowWidth-11, windowHeight*(5/6));
  line(0, windowHeight*(1/6), windowWidth, windowHeight*(1/6));
  line(0, windowHeight*(5/6), windowWidth, windowHeight*(5/6));
  line(0, 35, windowWidth, 35);
  line(windowWidth/2, 35, windowWidth/2, windowHeight*(5/6));
  textSize(windowHeight/57.5);
  let textLength = windowWidth*(9/20), textWidth = windowHeight*(9/14);
  text(buttons.input.value().toUpperCase(), windowWidth/40, windowHeight*0.2, textLength, textWidth);
  text(plaintext.join(""), windowWidth*(21/40), windowHeight*0.2, textLength, textWidth);
}

function solveCipher() {
  stats();
  shiftNo = fitness();
}

function copyPlaintext() {
  let decrypt = document.createElement("textarea");
  document.body.appendChild(decrypt);
  decrypt.value = plaintext.join("");
  decrypt.select();
  document.execCommand("copy");
  decrypt.remove();
}

function keyPressed() {
  switch (keyCode) {
    case ENTER: copyPlaintext(); break;
    case LEFT_ARROW: updateShiftNo(-1); break;
    case RIGHT_ARROW: updateShiftNo(1); break;
    case 32: solveCipher(); break;
  }
}

function setup() {
  textAlign(CENTER);
  background(255);
  buttons = {
    input: createInput(),
    copy: createButton("Copy"),
    left: createButton("<"),
    right: createButton(">"),
    auto: createButton("Auto-Solve")
  }
  buttons.copy.mousePressed(copyPlaintext);
  buttons.left.mousePressed(leftButton);
  buttons.right.mousePressed(rightButton);
  buttons.auto.mousePressed(solveCipher);
}

function draw() {
  createCanvas(windowWidth-10, windowHeight-10);
  positions = {
    input: [windowWidth/100, windowHeight/100],
    copy: [windowWidth/100, windowHeight*(5.1/6)],
    left: [windowWidth*(99/100)-windowHeight*(3/7), windowHeight*(5.1/6)],
    right: [windowWidth*(99/100)-windowHeight*(1/7), windowHeight*(5.1/6)],
    auto: [windowWidth/2 - windowHeight*(2/7), windowHeight*(5.1/6)]
  }
  sizes = {
    input: [windowWidth*(97/100), 20],
    copy: [windowHeight*(1.5/7), windowHeight*(1/7)],
    left: [windowHeight*(1/7), windowHeight*(1/7)],
    right: [windowHeight*(1/7), windowHeight*(1/7)],
    auto: [windowHeight*(4/7), windowHeight*(1/7)]
  }
  for (let v in buttons) {
    buttons[v].position(positions[v][0], positions[v][1]);
    buttons[v].size(sizes[v][0], sizes[v][1]);
    if (v != "input") {
      buttons[v].style("font-size", `${windowHeight/13.8}px`);
      buttons[v].style("border-radius", "10px");
    }
  }	
  ciphertext = buttons.input.value().toUpperCase();
  cipherLen = ciphertext.length;
  drawUI();
  shift(shiftNo);
}
