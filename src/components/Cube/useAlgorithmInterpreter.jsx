import { useCallback } from 'react'

const wait = (ms) => new Promise((res) => setTimeout(res, ms))

export function useAlgorithmInterpreter(rotateLayer, animationDuration = 0.4) {
  return useCallback(async (algoString) => {
    // Preprocess: Expand "R2" → "R R", "U2'" → "U' U'"
    const moves = algoString.trim().split(/\s+/).flatMap((move) => {
      const match = move.match(/^([RUFLDBxyzrlfm])('?)(2?)$/)
      if (!match) return [] // ignore invalid
      const [, face, prime, two] = match
      const singleMove = face + prime
      return two === '2' ? [singleMove, singleMove] : [singleMove]
    })

    for (const move of moves) {
      const isPrime = move.includes("'")
      const direction = isPrime ? 1 : -1
      const face = move.replace("'", "")

      switch (face) {
        case 'U': rotateLayer('y', 'top', direction); break
        case 'D': rotateLayer('y', 'bot', direction); break
        case 'L': rotateLayer('x', 'left', direction); break
        case 'R': rotateLayer('x', 'right', direction); break
        case 'F': rotateLayer('z', 'front', direction); break
        case 'B': rotateLayer('z', 'back', direction); break
        case 'M': rotateLayer('x', 'mid', direction); break
        case 'x': rotateLayer('x', 'cube', direction); break
        case 'y': rotateLayer('y', 'cube', direction); break
        case 'z': rotateLayer('z', 'cube', direction); break
        case 'l': rotateLayer('x', 'l', direction); break
        case 'r': rotateLayer('x', 'r', direction); break
        case 'f': rotateLayer('z', 'f', direction); break
        default: break
      }

      await wait((animationDuration + 0.1) * 1000)
    }
  }, [rotateLayer, animationDuration])
}
