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
  let end = [];
  if (mode) {
    let ciphertext = Array.from(buttons.ciphertext.value());
    ciphertext = ciphertext.filter(v => v == "0" || v == "1").join("");
    ciphertext = ciphertext.match(/.{1,5}/g);
    for (let bin of ciphertext) {
      chr = parseInt(bin, 2);
      if (chr >= 0 && chr <= 25) {
        end.push(String.fromCharCode(chr + 65));
      }
    }
    buttons["plaintext"].value(end.join(""));
  } else {
    plaintext = Array.from(buttons.plaintext.value().toUpperCase());
    for (let v of plaintext) {
      chr = v.charCodeAt(0) - 65;
      if (chr >= 0 && chr <= 25) {
        end.push(chr.toString(2).padStart(5, "0") + " ");
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
    buttons[v].style("background-color", "rgb(134,190,134)");
    buttons[v].style("border-radius", "10px");
    if (v == "auto" || v == "copy") {
      buttons[v].style("font-size", `${windowHeight/13.8}px`)
    }
  }
  createCanvas(windowWidth, windowHeight-20);
  background(75,125,75);
  textSize(windowHeight/20);
  fill(36,78,36);
  text("Ciphertext", 0, 0, windowWidth);
  text("Plaintext", 0, windowHeight*(11/12), windowWidth);
  textSize(windowHeight/10);
  text("5-bit Binary Converter", 0, windowHeight*(5.175/12), windowWidth, windowHeight/7);
}
