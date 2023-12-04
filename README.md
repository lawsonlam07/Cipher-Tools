# Cipher-Tools

All the tools on here are hosted on openprocessing, and are written with p5js.

### [Monogram Analysis:](https://openprocessing.org/sketch/2041184)
> https://openprocessing.org/sketch/2041184

Yellow bars represent the normal distribution of the letters, and the purple ones represents the distribution of the letters that you input. The input box is in the top of the screen.

### [5-Bit Binary Converter:](https://openprocessing.org/sketch/2096840)
> https://openprocessing.org/sketch/2096840

This can be used to convert between 5-bit binary and English. You can press enter to copy, and there is no hotkey for solve. You can edit either box, so conversion works both ways, as long as you put the right text in the right box.

### [Morse Code Converter:](https://openprocessing.org/sketch/2083491)
> https://openprocessing.org/sketch/2083491

This can be used to convert between Morse code and English. Again, you can press enter to copy, and there is no hotkey for solve. Conversion works both ways, as long as you put the right text in the right box.

### [Polybius Square Converter:](https://openprocessing.org/sketch/2113566)
> https://openprocessing.org/sketch/2113566

This can be used to convert between an A-Y Polybius square and English. If the result after conversion to English is gibberish, try putting it in my substitution cipher solver! Yet again, enter to copy and there is no hotkey for solve. You can edit either box, so conversion works both ways, as long as you put the right text in the right box.

### [Caesar Cipher Decoder:](https://openprocessing.org/sketch/2044449)
> https://openprocessing.org/sketch/2044449

A tool that can be used to decrypt Caesar Ciphers. It works best with longer inputs, and uses monogram analysis to pick the right shift. The input box is in the top, the result is shown on the right of the screen, press "Copy" to copy the plaintext. The hotkeys are: arrows to change the shift amount, space to auto-solve & enter to copy result.

### [Block Transposition Cipher Decoder:](https://openprocessing.org/sketch/2074779)
> https://openprocessing.org/sketch/2074779

A tool to decrypt simple permutation/transposition ciphers. It uses trigram analysis to choose the right key, which is then used to decrypt the ciphertext. It may be prudent to change the key length a couple of times to find the right answer. When entering a custom key, each number should be separated by a comma, and nothing more. Again, the hotkeys are: space to auto-solve & enter to copy result.

### [Columnar Transposition Cipher Decoder:](https://openprocessing.org/sketch/2101787)
> https://openprocessing.org/sketch/2101787

This is a tool to decrypt columnar transposition ciphers. Its workings are very similar to the block transposition solver and again, it uses trigram analysis to choose the right key, which is then used to decrypt the ciphertext. Again, when entering a custom key, each number should be separated by a comma, and nothing more. It may be prudent to try multiple key lengths. The hotkeys are: space to auto-solve & enter to copy result.

### [Substitution Cipher Solver:](https://openprocessing.org/sketch/2090613)
> https://openprocessing.org/sketch/2090613

You may use this to decrypt monoalphabetic substitution ciphers;  it may take multiple tries to get the right answer. It uses randomness to solve the cipher because it would be far too inefficient to search each combination. This means that sometimes the right solution may be skipped over. Increasing the number of iterations means it will take longer, but you will be left with a more accurate result. Hotkeys are: spacebar to solve & enter to copy.

### [Vigenére Cipher Solver:](https://openprocessing.org/sketch/2098220)
> https://openprocessing.org/sketch/2098220

This tool can be used to assist in decrypting Vigenére ciphers. Again, like the substitution cipher solver, it may be prudent to run this multiple times to get a fully accurate result. It also uses the usual hotkeys for copy and autosolve (enter and spacebar respectively). You may also need to bruteforce the key length to find the plaintext. Note that to use a custom key, you must change "Key Len" to match the length of the new key and then paste it in, rather than type it out to maintain continuity in the program.

### [2x2 Hill Cipher Solver:](https://openprocessing.org/sketch/2110644)
> https://openprocessing.org/sketch/2110644

Yet another tool... This one solves 2x2 Hill Ciphers, as the name suggests. Monogram analysis is used initially to find some solutions, but since different solutions can have the same monogram fitness, trigram analysis is used to differentiate between them. Once again, space to auto-solve and enter to copy. Increasing the number of iterations means it will take longer, but you will be left with a more accurate result.
