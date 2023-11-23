// Like some other of my solvers, this also requres "Trigrams.js".
const alpha = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
let cipherFilter = "";
let solution = "";

function fitness(arr) {
  let total = 0;
  for (let i = 0; i < arr.length - 2; i++) {
    total += trigrams[arr.slice(i, i + 3).join("")];
  }
  return total;
}

function vigenere(key, ciphertext) {
  let plaintext = [];
  for (let i = 0; i < cipherLen; i++) {
    let newChar = (ciphertext[i].charCodeAt(0) - key[i % keyLen].charCodeAt(0) + 26) % 26;
    plaintext.push(alpha[newChar]);
  }
  return plaintext;
}

function solve() {
  key = [];
  for (_ = 0; _ < keyLen; _++) {
    key.push(alpha[Math.floor(Math.random() * 26)]);
  }
  let stability = 0;
  while (stability !== keyLen * 3) {
    fitnessArr = [[], [], []];
    let testKey = [...key];
    let randChar = Math.floor(Math.random() * keyLen);
    for (let char of alpha) {
      testKey[randChar] = char;
      let buffer = vigenere(testKey, cipherFilter);
      fitnessArr[0].push(buffer);
      fitnessArr[1].push(fitness(buffer));
      fitnessArr[2].push([...testKey]);
    }
    let best = fitnessArr[1].indexOf(Math.max(...fitnessArr[1]));
    if (fitnessArr[2][best].join("") == key.join("")) {
      stability += 1;
    } else {
      stability = 0;
    }
    key = fitnessArr[2][best];
    buttons.key.value(fitnessArr[2][best].join(""));
    solution = fitnessArr[0][best].join("");
  }
}

function copyPlaintext() {
  let decrypt = document.createElement("textarea");
  document.body.appendChild(decrypt);
  decrypt.value = solution;
  decrypt.select();
  document.execCommand("copy");
  decrypt.remove();
}

function keyPressed() {
  switch (keyCode) {
    case ENTER: copyPlaintext(); break;
    case 32: solve(); break;
  }
}

function setup() {
  textAlign(CENTER);
  textWrap(CHAR);
  buttons = {
    input: createInput(),
    size: createInput("30"),
    key: createInput("AAA"),
    len: createInput("3"),
    copy: createButton("Copy"),
    auto: createButton("Auto-Solve")
  }
  buttons.auto.mousePressed(solve);
  buttons.copy.mousePressed(copyPlaintext);
}

function draw() {
  positions = {
    input: [windowWidth*(32/100), windowWidth/100],
    size: [windowWidth/100, windowHeight*(1.25/6)],
    key: [windowWidth/100, windowHeight/25],
    len: [windowWidth/100, windowHeight*(2.25/6)],
    copy: [windowWidth/100, windowHeight*(3.5/6)],
    auto: [windowWidth/100, windowHeight*(4.75/6)]
  }
  sizes = {
    input: [windowWidth*(67/100), 20],
    size: [windowHeight*(1/7), windowHeight*(1/7)],
    key: [windowWidth*(3/10), windowHeight*(1/7)],
    len: [windowHeight*(1/7), windowHeight*(1/7)],
    copy: [windowWidth*(3/10), windowHeight*(1/6)],
    auto: [windowWidth*(3/10), windowHeight*(1/6)]
  }
  createCanvas(windowWidth-10, windowHeight-10);
  for (let v in buttons) {
    buttons[v].position(positions[v][0], positions[v][1]);
    buttons[v].size(sizes[v][0], sizes[v][1]);
    if (v != "input") {
      buttons[v].style("font-size", `${windowHeight/13.8}px`);
      buttons[v].style("border-radius", "10px");
      buttons[v].style("background-color", "rgb(15,15,15)");
      buttons[v].style("color", "rgb(200,200,200)");
    }
  }	
  background(0);
  fill(200);
  line(windowWidth*(31/100), 0, windowWidth*(31/100), windowHeight);

  textSize(windowHeight/13.8);
  textAlign(LEFT);
  text(": Text Size", windowHeight*(1/7), windowHeight*(1.75/6));
  text(": Key Len", windowHeight*(1/7), windowHeight*(2.75/6));
  textAlign(CENTER);
  textSize(windowHeight/34.5);
  
  ciphertext = Array.from(buttons.input.value().toUpperCase());
  cipherFilter = ciphertext.filter(v => alpha.includes(v));
  cipherLen = cipherFilter.length;
  keyLen = Math.max(Number(buttons.len.value()), 1);
  key = buttons.key.value().toUpperCase();
  if (keyLen !== buttons.key.value().length) {
    key = Array(keyLen).fill("A");
    buttons.key.value(key.join(""));
  }

  solution = vigenere(Array.from(key), cipherFilter).join("");
  textSize(Number(buttons.size.value()));
  text(solution, windowWidth*(32/100), windowWidth/30, windowWidth*(67/100));
}
