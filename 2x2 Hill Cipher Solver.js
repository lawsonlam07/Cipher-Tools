// You know the drill by now, "Trigrams.js" is required.
const randomQuotes = ["Making things up...", "Just solve it yourself...", "Deleting the text..."];
const quoteLen = randomQuotes.length;
const alpha = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const distribution = [
  8.55, 1.60, 3.16, 3.87, 12.10, 2.18, 2.09, 4.96, 7.33, 0.22, 0.81, 4.21, 2.53,
  7.17, 7.47, 2.07, 0.10, 6.33, 6.73, 8.94, 2.68, 1.06, 1.83, 0.19, 1.72, 0.11
];
const bin = {false: 0, true: 1};
const options = Array.from({length: 26}, (_, i) => i);
let key = [0, 0, 0, 0];
let solutions = [[], [], []];
let plaintext = "";
let limit = 5;
let n = 5;

function fitness(arr) {
  const difference = alpha.map(v => arr.filter(x => x === v).length / arr.length * 100);
  let total = 0;
  for (let i = 0; i < difference.length; i++) {
    total += Math.abs(distribution[i] - difference[i]);
  }
  return 100 - total;
}

function trigramFitness(arr) {
  let total = 0;
  for (let i = 0; i < arr.length - 2; i++) {
    total += trigrams[arr.slice(i, i + 3).join("")];
  }
  return total;
}

function hill(key) {
  const ans = [];
  for (let i = 0; i < cipherFilter.length; i += 2) {
    const x = alpha.indexOf(cipherFilter[i]);
    const y = alpha.indexOf(cipherFilter[i + 1]);
    for (let j = 0; j < 2; j++) {
      ans.push(alpha[(key[2 * j] * x + key[2 * j + 1] * y) % 26]);
    }
  }
  return ans;
}

function findBest(arr) {return arr[1].indexOf(Math.max(...arr[1]))}

function step() {
  let stability = 0;
  let solution = "";
  let parity = Math.random() < 0.5;
  key = Array.from({length: 4}, () => Math.floor(Math.random() * 26));
  while (stability !== 5) {
    parity = !parity;
    const testKey = [...key];
    const fitnessArr = [[], [], []];
    for (const x of options) {
      for (const y of options) {
        testKey[2 * bin[parity]] = x;
        testKey[2 * bin[parity] + 1] = y;
        const buffer = hill(testKey);
        fitnessArr[0].push(buffer);
        fitnessArr[1].push(fitness(buffer));
        fitnessArr[2].push([...testKey]);
      }
    }
    let best = findBest(fitnessArr);
    stability = (fitnessArr[2][best].join("") === key.join("") ? stability + 1 : 0);
    key = [...fitnessArr[2][best]];
    solution = fitnessArr[0][best];
  }
  return solution;
}

function copyPlaintext() {
  let decrypt = document.createElement("textarea");
  document.body.appendChild(decrypt);
  decrypt.value = plaintext;
  decrypt.select();
  document.execCommand("copy");
  decrypt.remove();
}

function keyPressed() {
  switch (keyCode) {
    case ENTER: copyPlaintext(); break;
    case 32: reset(); break;
  }
}

function reset() {
  n = 0;
  solutions = [[], [], []];
  plaintext = "";
}

function setup() {
  textAlign(CENTER);
  textWrap(CHAR);
  buttons = {
    input: createInput(),
    size: createInput("25"),
    iter: createInput("5"),
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

  cipherFilter = Array.from(buttons.input.value().toUpperCase()).filter(v => alpha.includes(v));
  if (n < limit) {
    let quote = randomQuotes[Math.floor(Math.random()*quoteLen)];
    text(quote, windowWidth*(15.5/100), windowHeight*(1.5/10));
    let solution = step();
    solutions[0].push(solution);
    solutions[1].push(trigramFitness(solution));
    solutions[2].push(key);
    n++;
  } else {
    let best = findBest(solutions);
    if (best !== -1) {
      plaintext = solutions[0][best].join("");
      text(solutions[2][best], windowWidth*(15.5/100), windowHeight*(1.5/10));
    } else {
      plaintext = "";
      text("0,0,0,0", windowWidth*(15.5/100), windowHeight*(1.5/10));
    }
    textSize(Number(buttons.size.value()));
    text(plaintext, windowWidth*(32/100), windowWidth/30, windowWidth*(67/100));
  }
}
