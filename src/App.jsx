import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import RubiksCube from './components/RubiksCube'

export default function App() {
  return (
    <Canvas className="w-[calc(100vw-400px)] h-screen" camera={{ position: [5, 5, 5], fov: 50 }}>
      {/* <ambientLight intensity={0.6} /> */}
      {/* <directionalLight position={[10, 10, 10]} intensity={1} /> */}
      <Environment preset="apartment" />
      <OrbitControls />
      <RubiksCube />
    </Canvas>
  )
}