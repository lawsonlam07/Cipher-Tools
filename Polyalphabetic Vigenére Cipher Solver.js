/* Python solver!
alpha = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
cipherFilter = [v for v in ciphertext if v in alpha]

key = random.choices(alpha, k=5)
#key = ["K", "E", "Y"]

def fitness(arr):
  total = 0
  for i in range(len(arr) - 2):
    total += trigrams["".join(arr[i: i + 3])]
  return total

def solve(key, ciphertext):
  plaintext = []
  for i, v in enumerate(ciphertext):
    newChar = ord(v) - ord(key[i % len(key)])
    newChar %= 26
    plaintext.append(alpha[newChar])
  return plaintext

stability = 0
while stability != len(key) * 5:
  testKey = key.copy()
  fitnessArr = [[], [], []]
  randChar = random.randint(0, len(key) - 1)

  for char in alpha:
    testKey[randChar] = char
    buffer = solve(testKey, cipherFilter)

    fitnessArr[0].append(buffer)
    fitnessArr[1].append(fitness(buffer))
    fitnessArr[2].append(testKey.copy())

  best = fitnessArr[1].index(max(fitnessArr[1]))
  print("".join(fitnessArr[0][best]) + "\n\n")
  print(fitnessArr[1][best])

  if fitnessArr[2][best] == key:
    stability += 1
  else:
    stability = 0
  print(stability)
  key = fitnessArr[2][best]
  print(key)
  
print("".join(solve(key, cipherFilter)))
print(fitness(solve(key, cipherFilter)))

*/
