import React, { useMemo } from 'react'
import CubePiece from '../CubePiece'

export default function Cube({ pieceRefs }) {
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
    <group name="Cube">
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
