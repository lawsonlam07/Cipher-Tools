/* Python solver!
alpha = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
ciphertext = [v for v in ciphertext if v in alpha]

plaintext = []
for i, v in enumerate(ciphertext):
  newChar = ord(v) - ord(key[i % len(key)])
  newChar %= 26
  plaintext.append(alpha[newChar])

print("".join(plaintext))
*/
