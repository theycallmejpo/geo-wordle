function diff(target, guess) {
  // power
  // rpowe
  // erpow
  let result = guess.split('')
  target = target.split('')

  // diff greens
  for (let i = 0; i < result.length; i++) {
    if (target[i] === guess[i]) {
      result[i] = 1
      target[i] = 1 // 1 = seen
    }
  }

  for (let i = 0; i < result.length; i++) {
    const c = result[i]
    if (typeof c === 'string') {
      const idx = target.findIndex((e) => e === c)
      if (idx !== -1) {
        target[idx] = 1
        result[i] = -1
      }
    }
  }

  for (let i = 0; i < result.length; i++) {
    if (typeof result[i] !== 'number') {
      result[i] = 0
    }
  }
  

  console.log(guess)
  console.log(result)
  console.log('---')

  // diff original

}

// let guesses = ["power", "milds", "brink", "trait"]
// guesses.forEach((g) => diff("trait", g))

function diff_2(target, guess) {
  // go through once, marking greens and storing non greens (leftovers) in a dictionary { "k": [0, 2], "n": [1] }
  // go through once again looking for the keys in the dictionary
  
  guess = guess.split('')
  let dict = {}

  guess.forEach((letter, idx) => {
    if (letter === target[idx]) {
      guess[idx] = 1
    } else {
      dict[letter] = dict[letter] ? [...dict[letter], idx] : [idx]
    }
  })

  console.log(dict)
  console.log(guess)
  console.log('---')

  target.split('').forEach((letter, idx) => {
    if (dict[letter] && dict[letter].length > 0 && guess[idx] !== 1) {
      const idx = dict[letter].shift()
      guess[idx] = -1
    }
  })

  console.log(target.split(''))
  console.log(guess)
  console.log(dict)
}

diff_2("pppoo", "ooott")
