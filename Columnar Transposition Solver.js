/* Once again, python!
from itertools import permutations

alpha = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
keyLen = 7
ciphertext = [v for v in ciphertext if v in alpha]
block = len(ciphertext)//keyLen

def fitness(arr):
  total = 0
  for i in range(len(arr) - 2):
    total += trigrams["".join(arr[i: i + 3])]
  return total

def step(key, columns):
  plaintext = []
  for i in range(block):
    for j in key:
      plaintext.append(columns[j][i])
  return plaintext

def solve():
  columns = []
  solutions = [[], []]
  choices = [i for i in range(keyLen)]

  for i in range(keyLen):
    columns.append(ciphertext[block * i: block * (i + 1)])

  for key in permutations(choices, keyLen):
    plaintext = step(key, columns)
    solutions[0].append(plaintext)
    solutions[1].append(fitness(plaintext))

  return solutions[0][solutions[1].index(max(solutions[1]))]

print("".join(solve()))
*/
