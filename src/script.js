import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import * as lil from 'lil-gui'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { generateUUID } from 'three/src/math/MathUtils'

/**
 * Debug
 */
 const gui = new lil.GUI()

 const parameters = {
     spin: () => 
     {
         gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 0.5  })
     }
 }

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// create all 26 cubes
const rubiksCube = new THREE.Group();

scene.add(rubiksCube)


const createPieces = () => 
{
    let piecesArray = [] // cubes with plates attached in group
    const rubiksMaterial = new THREE.MeshBasicMaterial({ color: 0xd9d9d9 })

    for (let x=0; x <= 26; x++)
    {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.9, 0.9, 0.9),
            rubiksMaterial
        )
        cube.name = x
    
        cube.position.x = (x % 3) -1
        cube.position.y = Math.floor(x / 9) -1
        cube.position.z = Math.floor(x / 3) % 3 -1
    
        const group = addPlates(cube)
    
        piecesArray[x] = group
    }

    // Debug
    gui.addColor(rubiksMaterial, 'color')
        .name('Rubiks Color')
    return piecesArray
}

const addPlates = (cube) => {
    const group = new THREE.Group()
    group.add(cube)

    const xIndex = cube.position.x
    const yIndex = cube.position.y
    const zIndex = cube.position.z

    // if (yIndex === 1) { group.add( createYellowPlate(cube) ) }
    if (yIndex === 1){   
        group.add( 
            createPlate({
                cube: cube, 
                geometry: new THREE.BoxGeometry(0.8, 0.1, 0.8),
                color: 0xf6d32d,   
                side: 'top' })
                )
        }
    if (yIndex === -1){   
        group.add( 
            createPlate({
                cube: cube, 
                geometry: new THREE.BoxGeometry(0.8, 0.1, 0.8),
                color: 0xEDEDED,   
                side: 'bot' })
                )
        }
    if (xIndex === 1){   
        group.add( 
            createPlate({
                cube: cube, 
                geometry: new THREE.BoxGeometry(0.1, 0.8, 0.8),
                color: 0x3584e4,   
                side: 'right' })
                )
        }
    if (xIndex === -1){   
        group.add( 
            createPlate({
                cube: cube, 
                geometry: new THREE.BoxGeometry(0.1, 0.8, 0.8),
                color: 0x26a269,   
                side: 'left' })
                )
        }
    if (zIndex === -1){   
        group.add( 
            createPlate({
                cube: cube, 
                geometry: new THREE.BoxGeometry(0.8, 0.8, 0.1),
                color: 0xff7800,   
                side: 'front' })
                )
        }
    if (zIndex === 1){   
        group.add( 
            createPlate({
                cube: cube, 
                geometry: new THREE.BoxGeometry(0.8, 0.8, 0.1),
                color: 0xe01b24,   
                side: 'back' })
                )
        }

    return group 
}

const createPlate = ({cube, geometry, color, side}) => {
    const plane = new THREE.Mesh
    (
        geometry,
        new THREE.MeshBasicMaterial({ color: color })
    )

    plane.position.x = cube.position.x
    plane.position.y = cube.position.y
    plane.position.z = cube.position.z

    if (side === 'top')     { plane.position.y = 1.5}
    if (side === 'bot')     { plane.position.y = -1.5}
    if (side === 'left')    { plane.position.x = -1.5}
    if (side === 'right')   { plane.position.x = 1.5}
    if (side === 'front')   { plane.position.z = 1.5}
    if (side === 'back')    { plane.position.z = -1.5 }
    return plane
}

// Debug


const piecesArray = createPieces()


piecesArray.forEach((piece)=>{rubiksCube.add(piece);})

// Debug
// gui.add(plane.position, 'x').min(-2).max(2).step(0.01)
// gui.add(plane.position, 'y').min(-2).max(2).step(0.01)
// gui.add(plane.position, 'z').min(-2).max(2).step(0.01)


// Helper
const helper = new THREE.AxesHelper(2)
scene.add(helper)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => 
{
    // Update sizes
    sizes.width= window.innerWidth,
    sizes.height= window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// This code also works on safari
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 5
camera.position.y = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Turn Functions
 */
// Top
const rotateTop = (rubiksCube) =>
{
    const group = new THREE.Group()
    // group.position.y = 0
    // group.rotation.z = Math.PI * 0.5
    scene.add( group )

    rubiksCube.children.forEach((cube) => 
    {
        if(cube.position.y === 1)
        {
            group.add(cube)
        }
    })

    group.rotation.set(0 , Math.PI / 2 , 0);
}

/**
 * Animate
 */
 // gsap.to(getTopGroup().position, {duration: 1, delay:1, rotation: 90})


const tick = () =>
{
    // Update controls
    controls.update()
    rotateTop(rubiksCube)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()