# Cipher-Tools

All the tools on here are hosted on openprocessing, and are written with p5js.

### [Monogram Analysis:](https://openprocessing.org/sketch/2041184)
> https://openprocessing.org/sketch/2041184

Yellow bars represent the normal distribution of the letters, and the purple ones represents the distribution of the letters that you input. The input box is in the top of the screen.

### [Caesar Cipher Decoder:](https://openprocessing.org/sketch/2044449)
> https://openprocessing.org/sketch/2044449

A tool that can be used to decrypt Caesar Ciphers. It works best with longer inputs, and uses monogram analysis to pick the right shift. The input box is in the top, the result is shown on the right of the screen, press "Copy" to copy the plaintext. The hotkeys are: arrows to change the shift amount, space to auto-solve & enter to copy result.

### [Block Transposition Cipher Decoder:](https://openprocessing.org/sketch/2074779)
> https://openprocessing.org/sketch/2074779

A tool to decrypt simple permutation/transposition ciphers. It uses trigram analysis to find the key, which is then used to decrypt the ciphertext. Note that only letters A-Z are allowed, and should be split into blocks of the same length, seperated by a space. When entering a custom key, each number should be seperated by a comma, and nothing more. Again, the hotkeys are: arrows to change the shift amount, space to auto-solve & enter to copy result.
