import { useEffect } from 'react'

export function useCubeKeyboardControls(rotateLayer) {
  useEffect(() => {
    if (!rotateLayer) return

    const keyMap = {
      // Front face (z axis)
      f: () => rotateLayer('z', 'front', 1),
      F: () => rotateLayer('z', 'front', -1),

      // Back face (z axis)
      b: () => rotateLayer('z', 'back', 1),
      B: () => rotateLayer('z', 'back', -1),

      // Up face (y axis)
      u: () => rotateLayer('y', 'top', 1),
      U: () => rotateLayer('y', 'top', -1),

      // Down face (y axis)
      d: () => rotateLayer('y', 'bot', 1),
      D: () => rotateLayer('y', 'bot', -1),

      // Right face (x axis)
      r: () => rotateLayer('x', 'right', 1),
      R: () => rotateLayer('x', 'right', -1),

      // Left face (x axis)
      l: () => rotateLayer('x', 'left', 1),
      L: () => rotateLayer('x', 'left', -1),

      // Middle slice (x axis), between left and right
      m: () => rotateLayer('x', 'mid', 1),
      M: () => rotateLayer('x', 'mid', -1),

      // Rotate the cube
      x: () => rotateLayer('x', 'cube', 1),
      X: () => rotateLayer('x', 'cube', -1),

      // Rotate the cube
      y: () => rotateLayer('y', 'cube', 1),
      Y: () => rotateLayer('y', 'cube', -1),

      // Rotate the cube
      z: () => rotateLayer('z', 'cube', 1),
      Z: () => rotateLayer('z', 'cube', -1),
    };
    const handleKeyDown = (event) => {
      const action = keyMap[event.key]; // Use event.key directly
      if (action) {
        event.preventDefault();
        action();
      }
    };

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [rotateLayer])
}
