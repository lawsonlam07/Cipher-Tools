//This solver requires "trigrams.js" to analyse and give values to each trigram.
function setup() {
	input = createInput();
	background(100);
	console.log(trigrams["JQZ"]);
}

function draw() {
	createCanvas(windowWidth-20, windowHeight-20);
	input.position(windowWidth/100, windowWidth/100);
	input.size(windowWidth*(97/100));
	let plaintext = input.value().split(" ");
	console.log(plaintext);
}
/* I wrote some python code that I will base the JS code off of.
weights = []
perms = []
choices = [i for i in range(5)]
def permutations(n, lim, used):
  for v in choices:
    while len(used) != n:
      used.pop(-1)
    if v not in used:
      used.append(v)
      if n + 1 == lim:
        perms.append(used.copy())
      else:
        permutations(n + 1, lim, used)

def plaintext(key):
  ans = []
  for v in text:
    for i in key:
      ans.append(v[i])
  return "".join(ans)

def fitness(key):
  total = 0
  ans = plaintext(key)
  for i in range(len(ans)-2):
    total += trigrams[ans[i:i+3]]
  weights.append(total)

permutations(0, 5, [])
for v in perms:
  fitness(v)

shift = weights.index(max(weights))
print(plaintext(perms[shift]))
*/
