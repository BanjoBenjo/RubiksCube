import React from 'react'
import { Box, RoundedBox } from '@react-three/drei'

/**
 * Props:
 * - position: [x, y, z]
 * - index: number (for .name or .key)
 */
export default function CubePiece({ position = [0, 0, 0], index }) {
  const ref = React.useRef()

  const plateConfigs = [
    { side: 'top', condition: position[1] === 1, color: 0xf6d32d, size: [0.8, 0.02, 0.8], pos: [0, 0.475, 0] },
    { side: 'bot', condition: position[1] === -1, color: 0xededed, size: [0.8, 0.02, 0.8], pos: [0, -0.475, 0] },
    { side: 'left', condition: position[0] === -1, color: 0x26a269, size: [0.02, 0.8, 0.8], pos: [-0.475, 0, 0] },
    { side: 'right', condition: position[0] === 1, color: 0x3584e4, size: [0.02, 0.8, 0.8], pos: [0.475, 0, 0] },
    { side: 'front', condition: position[2] === -1, color: 0xff7800, size: [0.8, 0.8, 0.02], pos: [0, 0, -0.475] },
    { side: 'back', condition: position[2] === 1, color: 0xe01b24, size: [0.8, 0.8, 0.02], pos: [0, 0, 0.475] },
  ]

  return (
    <group ref={ref} position={position} name={`piece-${index}`}>
      {/* Basis-Cube */}

      <RoundedBox
        args={[0.95, 0.95, 0.95]} // width, height, depth
        radius={0.1}          // corner radius
        smoothness={4}         // number of curve segments
      >
        <meshStandardMaterial attach="material" color={0xd9d9d9} />
      </RoundedBox>

      {/* Plates je nach Position */}
      {plateConfigs.map(
        (plate, i) =>
          plate.condition && (
            <RoundedBox key={i} args={plate.size} position={plate.pos} radius={0.01} smoothness={5}>
              <meshStandardMaterial attach="material" roughness={0.3}
                color={plate.color} />
            </RoundedBox>
          )
      )}
    </group>
  )
}
