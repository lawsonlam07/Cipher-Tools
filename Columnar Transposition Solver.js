// Once again, "Trigrams.js" is used to evaluate permutations.
const alpha = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

function permutations(lim, n=0, used=[]) {
  for (let v of choices) {
    while (used.length !== n) {
      used.pop();
    }
    if (!used.includes(v)) {
      used.push(v);
      if (n + 1 === lim) {
        perms.push([...used]);
      } else {
        permutations(lim, n + 1, used);
      }
    }
  }
}

function fitness(arr) {
  let total = 0;
  for (let i = 0; i < arr.length - 2; i++) {
    total += trigrams[arr.slice(i, i + 3).join("")];
  }
  return total;
}

function step(key, columns) {
  const plaintext = [];
  for (let i = 0; i < block; i++) {
    for (let j of key) {
      plaintext.push(columns[j][i]);
    }
  }
  return plaintext;
}

function solve() {
  let columns = [];
  let solutions = [[], []];
  choices = Array.from({ length: keyLen }, (_, i) => i);
  for (let i = 0; i < keyLen; i++) {
    columns.push(ciphertext.slice(block * i, block * (i + 1)));
  }
  perms = [];
  permutations(keyLen);
  for (let key of perms) {
    let plaintext = step(key, columns);
    solutions[0].push(plaintext);
    solutions[1].push(fitness(plaintext));
  }
  let best = solutions[1].indexOf(Math.max(...solutions[1]))
  solution = solutions[0][best].join("");
}

function drawUI() {
  fill(200);
  stroke(200);
  rect(windowWidth*(3/4), 0, windowWidth/4, windowHeight);
  fill(50, 100);
  rect(windowWidth/100, windowHeight/50+20, windowWidth*(72/100), windowHeight*(46/50)-20, 10);
  stroke(0, 0);
  fill(200);
  text(solution, windowWidth/100+5, windowHeight/50+25, windowWidth*0.72-10, windowHeight*0.92-5);
  fill(0);
  textSize(windowHeight/13.8);
  text("Text Size:", windowWidth*(76/100), windowHeight*(1.75/6))
  text("Key Len:", windowWidth*(76/100), windowHeight*(2.75/6))
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
    case 32: solve(); break;
    case ENTER: copyPlaintext(); break;
  }
}

function setup() {
  textWrap(CHAR);
  solution = "";
  buttons = {
    input: createInput(),
    key: createInput(" Enter a key:"),
    size: createInput("30"),
    len: createInput("5"),
    copy: createButton("Copy"),
    auto: createButton("Auto-Solve")
  }
  buttons.auto.mousePressed(solve);
  buttons.copy.mousePressed(copyPlaintext);
}

function draw() {
  positions = {
    input: [windowWidth/100, windowHeight/100],
    key: [windowWidth*(77/100), windowHeight/25],
    size: [windowWidth - windowHeight*(1/5), windowHeight*(1.25/6)],
    len: [windowWidth - windowHeight*(1/5), windowHeight*(2.25/6)],
    copy: [windowWidth*(77/100), windowHeight*(4/6)],
    auto: [windowWidth*(77/100), windowHeight*(5/6)]
  }
  sizes = {
    input: [windowWidth*(73/100), 20],
    key: [windowWidth*(21/100), windowHeight*(1/7)],
    size: [windowHeight*(1/7), windowHeight*(1/7)],
    len: [windowHeight*(1/7), windowHeight*(1/7)],
    copy: [windowWidth*(21/100), windowHeight*(1/7)],
    auto: [windowWidth*(21/100), windowHeight*(1/7)]
  }
  for (let v in buttons) {
    buttons[v].position(positions[v][0], positions[v][1]);
    buttons[v].size(sizes[v][0], sizes[v][1]);
    if (v != "input") {
      buttons[v].style("font-size", `${windowHeight/13.8}px`);
      buttons[v].style("border-radius", "10px");
    }
  }	
  createCanvas(windowWidth-20, windowHeight-20);
  background(100);
  textSize(Number(buttons.size.value()));
  drawUI();
  ciphertext = Array.from(buttons.input.value().toUpperCase());
  ciphertext = ciphertext.filter(v => alpha.includes(v)).join("");
  keyLen = Number(buttons.len.value());
  block = Math.floor(ciphertext.length/keyLen);
}
