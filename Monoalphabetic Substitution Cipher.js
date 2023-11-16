// This solver also requires "Trigrams.js"

// Again, I wrote a draft in python first.
// def fitness(arr):
//   total = 0
//   for i in range(len(arr) - 2):
//     total += trigrams["".join(arr[i: i + 3])]
//   return total

// cipherLen = len(ciphertext)
// cipherFilter = "".join([v for v in ciphertext if v in alpha])
// print()

// distribution = alpha.copy()
// random.shuffle(distribution)

// while True:
//   fitnessArr = [[], []]
//   randChar = random.choice(alpha)
  
//   for char in alpha:
//     buffer = cipherFilter.replace(randChar, "-")
//     buffer = buffer.replace(char, randChar)
//     buffer = buffer.replace("-", char)
    
//     fitnessArr[0].append(buffer)
//     fitnessArr[1].append(fitness(list(buffer)))

//   print(cipherFilter + "\n\n")
//   cipherFilter = fitnessArr[0][fitnessArr[1].index(max(fitnessArr[1]))]
