const alpha = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const randomQuotes = ["Making things up...", "Just solve it yourself...", "Deleting the text..."];
const quoteLen = randomQuotes.length;
let plaintext = "";
let size = 30;
let solutions = [[], []];
let limit = 10;
let n = 0;

function fitness(arr) {
  let total = 0;
  for (let i = 0; i < arr.length - 2; i++) {
    total += trigrams[arr.slice(i, i + 3).join("")];
  }
  return total;
}

function findBest(arr) {
  return arr[1].indexOf(Math.max(...arr[1]));
}

function step() {
  let stability = 0;
  while (stability !== 75) {
    fitnessArr = [[], []];
    let randChar = alpha[Math.floor(Math.random() * alpha.length)];
    for (let char of alpha) {
      let buffer = cipherTest.replaceAll(randChar, "-");
      buffer = buffer.replaceAll(char, randChar);
      buffer = buffer.replaceAll("-", char);
      fitnessArr[0].push(buffer);
      fitnessArr[1].push(fitness(buffer.split("")));
    }

    best = findBest(fitnessArr);
    if (fitnessArr[0][best] === cipherTest) {
      stability += 1;
    } else {
      stability = 0;
    }

    cipherTest = fitnessArr[0][best];
  }
  return [cipherTest, fitnessArr[1][best]]
}

function solve() {
  cipherFilter = Array.from(buttons.input.value().toUpperCase());
  cipherFilter = cipherFilter.filter(v => alpha.includes(v)).join("")

  cipherTest = cipherFilter;
  let possibility = step();
  solutions[0].push(possibility[0]);
  solutions[1].push(possibility[1]);

  plaintext = solutions[0][findBest(solutions)];
}

function getKey() {
  let cipherKey = Array.from(new Set(cipherFilter));
  cipherKey.push(...alpha.filter(v => !cipherKey.includes(v)));

  let plainKey = Array.from(new Set(plaintext));
  plainKey.push(...alpha.filter(v => !plainKey.includes(v)));

  let key = {};
  for (let i = 0; i < 26; i++) {
    key[cipherKey[i]] = plainKey[i];
  }
  key = Object.entries(key).sort((a, b) => a[0].localeCompare(b[0]));

  return key;
}

function copyPlaintext() {
  let decrypt = document.createElement("textarea");
  document.body.appendChild(decrypt);
  decrypt.value = plaintext;
  decrypt.select();
  document.execCommand("copy");
  decrypt.remove();
}

function reset() {
  n = 0;
  solutions = [[], []];
  plaintext = "";
}

function keyPressed() {
  switch (keyCode) {
    case ENTER: copyPlaintext(); break;
    case 32: reset(); break;
  }
}

function setup() {
  textAlign(CENTER);
  textWrap(CHAR);
  buttons = {
    input: createInput(),
    size: createInput("30"),
    iter: createInput("10"),
    copy: createButton("Copy"),
    auto: createButton("Auto-Solve")
  }
  buttons.auto.mousePressed(reset);
  buttons.copy.mousePressed(copyPlaintext);
}

function draw() {
  limit = Number(buttons.iter.value());
  positions = {
    input: [windowWidth*(32/100), windowWidth/100],
    size: [windowWidth/100, windowHeight*(1.25/6)],
    iter: [windowWidth/100, windowHeight*(2.25/6)],
    copy: [windowWidth/100, windowHeight*(3.5/6)],
    auto: [windowWidth/100, windowHeight*(4.75/6)]
  }
  sizes = {
    input: [windowWidth*(67/100), 20],
    size: [windowHeight*(1/7), windowHeight*(1/7)],
    iter: [windowHeight*(1/7), windowHeight*(1/7)],
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
      buttons[v].style("background-color", "rgb(57,57,57)");
      buttons[v].style("color", "rgb(174,174,174)");
      buttons[v].style("text-shadow", "-2px -2px rgb(0,0,0)");
    }
  }	
  background(50);
  fill(100);
  let loading = [windowWidth/100, windowWidth/100, windowWidth*(29/100), windowHeight/10];
  rect(...loading);
  fill(158, 235, 52);
  rect(loading[0]+5, loading[1]+5, (loading[2]-10)*(n/limit), loading[3]-10);
  fill(150);
  line(windowWidth*(31/100), 0, windowWidth*(31/100), windowHeight);

  textSize(windowHeight/13.8);
  textAlign(LEFT);
  text(": Text Size", windowHeight*(1/7), windowHeight*(1.75/6));
  text(": Iterations", windowHeight*(1/7), windowHeight*(2.75/6));
  textAlign(CENTER);
  textSize(windowHeight/34.5);
  if (n < limit) {
    let quote = randomQuotes[Math.floor(Math.random()*quoteLen)];
    text(quote, windowWidth*(15.5/100), windowHeight*(1.5/10));
    solve();
    n++;
  } else {
    let key = getKey();
    let plainKey = [];
    let cipherKey = [];

    for (i = 0; i < 26; i++) {
      plainKey.push(key[i][0]);
      cipherKey.push(key[i][1]);
    }
    key = plainKey.join("") + "\n" + cipherKey.join("");
    text(key, windowWidth*(15.5/100), windowHeight*(1.5/10));
    textSize(Number(buttons.size.value()));
    text(plaintext, windowWidth*(32/100), windowWidth/30, windowWidth*(67/100));
  }
}
