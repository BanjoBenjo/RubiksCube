import React, { useRef, useMemo } from 'react'
import CubePiece from './CubePiece'

export default function RubiksCube() {
  // Ref-Array für spätere Animation (z. B. durch rotation, attach etc.)
  const pieceRefs = useRef([])

  // Positionen vorbereiten: alle Kombinationen von x, y, z ∈ [-1, 0, 1]
  const cubePositions = useMemo(() => {
    const positions = []
    let i = 0
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          positions.push({ index: i++, position: [x, y, z] })
        }
      }
    }
    return positions
  }, [])

  return (
    <group name="RubiksCube">
      {cubePositions.map(({ index, position }) => (
        <CubePiece
          key={index}
          index={index}
          position={position}
          ref={(el) => (pieceRefs.current[index] = el)}
        />
      ))}
    </group>
  )
}
