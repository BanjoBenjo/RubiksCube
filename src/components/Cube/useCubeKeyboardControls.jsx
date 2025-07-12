import { useEffect } from 'react'

export function useCubeKeyboardControls(rotateLayer) {
  useEffect(() => {
    if (!rotateLayer) return

    const keyMap = {
      q: () => rotateLayer('z', 'cube', -1),
      p: () => rotateLayer('z', 'cube', 1),
      a: () => rotateLayer('y', 'cube', -1),
      ö: () => rotateLayer('y', 'cube', 1),
      z: () => rotateLayer('x', 'cube', 1),
      b: () => rotateLayer('x', 'cube', -1),
      n: () => rotateLayer('x', 'cube', -1),

      w: () => rotateLayer('z', 'back', -1),
      o: () => rotateLayer('z', 'back', 1),
      e: () => rotateLayer('x', 'left', 1),
      d: () => rotateLayer('x', 'left', -1),
      f: () => rotateLayer('y', 'top', 1),
      j: () => rotateLayer('y', 'top', -1),
      g: () => rotateLayer('z', 'front', -1),
      h: () => rotateLayer('z', 'front', 1),
      i: () => rotateLayer('x', 'right', 1),
      k: () => rotateLayer('x', 'right', -1),
      s: () => rotateLayer('y', 'bot', -1),
      l: () => rotateLayer('y', 'bot', 1),
      '5': () => rotateLayer('x', 'mid', -1),
      '6': () => rotateLayer('x', 'mid', -1),
      x: () => rotateLayer('x', 'mid', 1),
      '.': () => rotateLayer('x', 'mid', 1)
    }

    const handleKeyDown = (event) => {
      const action = keyMap[event.key.toLowerCase()]
      if (action) {
        event.preventDefault()
        action()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [rotateLayer])
}
