import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Cube from './components/Cube/Cube'
import AlgorithmSidebar from './components/AlgorithmSidebar'
import { useRubiksCubeController } from './components/Cube/useRubiksCubeController'
import { useAlgorithmInterpreter } from './components/Cube/useAlgorithmInterpreter'
import { useCubeKeyboardControls } from './components/Cube/useCubeKeyboardControls'
import Keyboard from './components/Keyboard/Keyboard'

export default function App() {
  const pieceRefs = useRef([])
  const { rotateLayer } = useRubiksCubeController(pieceRefs)
  const interpreter = useAlgorithmInterpreter(rotateLayer)
  useCubeKeyboardControls(rotateLayer)

  return (
    <div className="flex h-screen w-screen">
      <AlgorithmSidebar
        onAlgorithmClick={(algo) => interpreter(algo.algorithm)}
      />
      <div className="flex-1">
        <Canvas className="w-full h-full" camera={{ position: [5, 5, 5], fov: 50 }}>
          <Environment preset="apartment" />
          <OrbitControls />
          <group scale={1.5}>
            <Cube pieceRefs={pieceRefs} />
          </group>
          <group position={[0, -6, 5]} rotation={[-1 / 4 * Math.PI, 0, 0]}>
            <Keyboard />
          </group>
        </Canvas>
      </div>
    </div>
  )
}