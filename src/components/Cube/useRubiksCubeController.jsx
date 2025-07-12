import { Group } from 'three'
import { useRef } from 'react'
import gsap from 'gsap'

export function useRubiksCubeController(pieceRefs) {
  const movingRef = useRef(false)
  const animationDuration = 0.3

  const layerSelectors = {
    cube: () => true,
    top: (pos) => pos.y === 1,
    bot: (pos) => pos.y === -1,
    left: (pos) => pos.x === -1,
    right: (pos) => pos.x === 1,
    front: (pos) => pos.z === 1,
    back: (pos) => pos.z === -1,
    mid: (pos) => pos.x === 0,
    l: (pos) => pos.x === 0 || pos.x === -1,
    r: (pos) => pos.x === 0 || pos.x === 1,
    f: (pos) => pos.z === 0 || pos.z === 1,
  }

  const roundPositions = () => {
    pieceRefs.current.forEach((piece) => {
      piece.position.set(
        Math.round(piece.position.x),
        Math.round(piece.position.y),
        Math.round(piece.position.z)
      )
    })
  }

  const rotateLayer = (axis, selectorName, direction) => {
    if (movingRef.current) return

    const selector = layerSelectors[selectorName]
    if (!selector) return

    const layer = pieceRefs.current.filter((piece) => selector(piece.position))
    const tempGroup = new Group()
    pieceRefs.current[0]?.parent?.add(tempGroup)

    layer.forEach((piece) => tempGroup.attach(piece))

    const rotationTarget = {}
    rotationTarget[axis] = tempGroup.rotation[axis] + Math.PI * 0.5 * direction

    gsap.timeline({
      onStart: () => (movingRef.current = true),
      onComplete: () => {
        tempGroup.updateMatrixWorld()
        layer.forEach((piece) => tempGroup.parent.attach(piece))
        roundPositions()
        tempGroup.removeFromParent()
        movingRef.current = false
      },
    }).to(tempGroup.rotation, {
      ...rotationTarget,
      duration: animationDuration,
      ease: 'power1.inOut',
    })
  }

  return { rotateLayer }
}
