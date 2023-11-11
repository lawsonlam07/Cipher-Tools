//This solver requires "trigrams.js" to analyse and give values to each trigram.
function permutations(lim, n = 0, used = []) {
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

function plaintext(key) {
  let ans = [];
  for (let v of ciphertext) {
    for (let i of key) {
      ans.push(v[i]);
    }
  }
  return ans.join("");
}

function fitness(key) {
  let total = 0;
  let ans = plaintext(key);
  for (let i = 0; i < ans.length - 2; i++) {
    total += trigrams[ans.slice(i, i + 3)];
  }
  weights.push(total);
}

function solve() {
  perms = []; weights = [];
  choices = Array.from({length: ciphertext[0].length}, (_, i) => i);
  permutations(ciphertext[0].length);
  for (let v of perms) {
    fitness(v);
  }
  let shift = weights.indexOf(Math.max(...weights));
  buttons.key.value(perms[shift]);
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
  background(100);
  solution = "";
  buttons = {
    input: createInput(sample),
    key: createInput(" Enter a key:"),
    size: createInput("30"),
    copy: createButton("Copy"),
    auto: createButton("Auto-Solve")
  }
  buttons.auto.mousePressed();
  buttons.copy.mousePressed(copyPlaintext);
}

function draw() {
  positions = {
    input: [windowWidth/100, windowHeight/100],
    key: [windowWidth*(77/100), windowHeight/25],
    size: [windowWidth - windowHeight*(1/5), windowHeight*(1.25/6)],
    copy: [windowWidth*(77/100), windowHeight*(4/6)],
    auto: [windowWidth*(77/100), windowHeight*(5/6)]
  }
  sizes = {
    input: [windowWidth*(73/100), 20],
    key: [windowWidth*(21/100), windowHeight*(1/7)],
    size: [windowHeight*(1/7), windowHeight*(1/7)],
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
  textSize(Number(buttons.size.value()));
  drawUI();
  ciphertext = buttons.input.value().toUpperCase().split(" ");
  solution = plaintext(buttons.key.value());
}
