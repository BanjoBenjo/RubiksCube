import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import * as lil from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Global Variable to check wheter cube is already moving or not
let moving = false

/**
 * Debug
 */
const gui = new lil.GUI()

let spinFunctions = {
    spinTop: () => 
    {
        let group = assembleLayer('top')
        spin('y', group, -1)
    },
    spinTopInv: () => 
    {
        let group = assembleLayer('top')
        spin('y', group, 1)
    },
    spinBot: () => 
    {
        let group = assembleLayer('bot')
        spin('y', group, 1)
    },
    spinBotInv: () => 
    {
        let group = assembleLayer('bot')
        spin('y', group, -1)
    },
    spinLeft: () => 
    {
        let group = assembleLayer('left')
        spin('x', group, 1)
    },
    spinLeftInv: () => 
    {
       let group = assembleLayer('left')
       spin('x', group, -1)
    },
    spinRight: () => 
    {
        let group = assembleLayer('right')
        spin('x', group, 1)  
    },
    spinRightInv: () => 
    {
        let group = assembleLayer('right')
        spin('x', group, -1) 
    },
    spinFront: () => 
    {
       let group = assembleLayer('front')
       spin('z', group, 1)
    },
    spinFrontInv: () => 
    {
       let group = assembleLayer('front')
       spin('z', group, -1)
    },
    spinBack: () => 
    {
       let group = assembleLayer('back')
       spin('z', group, 1)
    },
    spinBackInv: () => 
    {
       let group = assembleLayer('back')
       spin('z', group, -1)
    },
    spinCubeX: () => 
    {
       let group = assembleLayer('cube')
       spin('x', group, 1)
    },
    spinCubeXInv: () => 
    {
       let group = assembleLayer('cube')
       spin('x', group, -1)
    },
    spinCubeY: () => 
    {
       let group = assembleLayer('cube')
       spin('y', group, 1)
    },
    spinCubeYInv: () => 
    {
       let group = assembleLayer('cube')
       spin('y', group, 1)
    },
    spinCubeZ: () => 
    {
       let group = assembleLayer('cube')
       spin('z', group, 1)
    },
    spinCubeZInv: () => 
    {
       let group = assembleLayer('cube')
       spin('z', group, 1)
    },
}

const parameters = {
    animationDuration: 0.3
}

gui.add(parameters, 'animationDuration').min(0).max(0.5)

const spinFunctionsGui = gui.addFolder( 'Spin Functions' )
spinFunctionsGui.add(spinFunctions, 'spinTop').name('Top')
spinFunctionsGui.add(spinFunctions, 'spinTopInv').name('Top Inverted')
spinFunctionsGui.add(spinFunctions, 'spinBot').name('Bot')
spinFunctionsGui.add(spinFunctions, 'spinBotInv').name('Bot Inverted')
spinFunctionsGui.add(spinFunctions, 'spinRight').name('Right')
spinFunctionsGui.add(spinFunctions, 'spinRightInv').name('Right Inverted')
spinFunctionsGui.add(spinFunctions, 'spinLeft').name("Left")
spinFunctionsGui.add(spinFunctions, 'spinLeftInv').name('Left Ivverted')
spinFunctionsGui.add(spinFunctions, 'spinFront').name('Front')
spinFunctionsGui.add(spinFunctions, 'spinFrontInv').name('Front Intverted')
spinFunctionsGui.add(spinFunctions, 'spinBack').name('Back')
spinFunctionsGui.add(spinFunctions, 'spinBackInv').name('Back Ivverted')

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
const createPieces = () => 
{
    let piecesArray = [] // cubes with plates attached in group
    const rubiksMaterial = new THREE.MeshBasicMaterial({ color: 0xd9d9d9 })

    for (let x=0; x <= 26; x++)
    {
        let group = new THREE.Group()

        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.9, 0.9, 0.9),
            rubiksMaterial
        )
        
        const xIndex = (x % 3) -1
        const yIndex = Math.floor(x / 9) -1
        const zIndex = Math.floor(x / 3) % 3 -1

        group.add(cube)
        group = addPlates(group, xIndex, yIndex, zIndex)    
        
        group.name = x
        group.position.x = xIndex
        group.position.y = yIndex
        group.position.z = zIndex

        piecesArray[x] = group
    }
    return piecesArray
}

const addPlates = (group, xIndex, yIndex, zIndex) => {    
    if (yIndex === 1){   
        group.add( 
            createPlate({
                geometry: new THREE.BoxGeometry(0.8, 0.1, 0.8),
                color: 0xf6d32d,   
                side: 'top' })
                )
        }
    if (yIndex === -1){   
        group.add( 
            createPlate({
                geometry: new THREE.BoxGeometry(0.8, 0.1, 0.8),
                color: 0xEDEDED,   
                side: 'bot' })
                )
        }
    if (xIndex === 1){   
        group.add( 
            createPlate({
                geometry: new THREE.BoxGeometry(0.1, 0.8, 0.8),
                color: 0x3584e4,   
                side: 'right' })
                )
        }
    if (xIndex === -1){   
        group.add( 
            createPlate({
                geometry: new THREE.BoxGeometry(0.1, 0.8, 0.8),
                color: 0x26a269,   
                side: 'left' })
                )
        }
    if (zIndex === -1){   
        group.add( 
            createPlate({
                geometry: new THREE.BoxGeometry(0.8, 0.8, 0.1),
                color: 0xff7800,   
                side: 'front' })
                )
        }
    if (zIndex === 1){   
        group.add( 
            createPlate({
                geometry: new THREE.BoxGeometry(0.8, 0.8, 0.1),
                color: 0xe01b24,   
                side: 'back' })
                )
        }

    return group 
}

const createPlate = ({ geometry, color, side}) => {
    const plane = new THREE.Mesh
    (
        geometry,
        new THREE.MeshBasicMaterial({ color: color })
    )

    if (side === 'top')     { plane.position.y = 0.5}
    if (side === 'bot')     { plane.position.y = -0.5}
    if (side === 'left')    { plane.position.x = -0.5}
    if (side === 'right')   { plane.position.x = 0.5}
    if (side === 'back')    { plane.position.z = 0.5}
    if (side === 'front')   { plane.position.z = -0.5 }
    return plane
}

// Debug
let piecesArray = createPieces()
for (let i=0; i <= 26; i++)
{
    scene.add(piecesArray[i])
}


// Helper
// const helper = new THREE.AxesHelper(2)
// scene.add(helper)


/**
 * Update Moveable Groups
 */
 const assembleLayer = (side) => {
    let layer = []
    for (let i=0; i <= 26; i++)
    {
        const piece = piecesArray[i]
        switch (side){
            case "cube":
                layer.push(piecesArray[i])
            case "top":
                if (piece.position.y === 1){
                    layer.push(piecesArray[i])
                }
                break;
            case "bot":
                if (piece.position.y === -1){
                    layer.push(piecesArray[i])
                }
                break;
            case "left":
                if (piece.position.x === -1){
                    layer.push(piecesArray[i])
                }
                break;
            case "right":
                if (piece.position.x === 1){
                    layer.push(piecesArray[i])
                }
                break;
            case "front":
                if (piece.position.z === 1){
                    layer.push(piecesArray[i])
                }
                break;
            case "back":
                if (piece.position.z === -1){
                    layer.push(piecesArray[i])
                }
                break;
            default:
                return
        }
    }
    return layer
}




const createGroup = (layer) => {
    const group = new THREE.Group()
    scene.attach(group)
    
    for ( let i in layer ) {
        group.attach( layer[ i ] );
    }
    return group
}

const updateScene = (tempGroup, layer) =>
{ 
    tempGroup.updateMatrixWorld()
    for ( var i in layer ) {
        scene.attach( layer[ i ] );
    }
    roundPositions()
    
    scene.remove(tempGroup)
} 
    
/**
 * Turn Functions
 */

const roundPositions = () => {
    for (let i=0; i <= 26; i++){
        let piece = piecesArray[i]
        piece.position.x = Math.round(piece.position.x)
        piece.position.y = Math.round(piece.position.y)
        piece.position.z = Math.round(piece.position.z)
    }
}


const spin = (axis, layer, direction) => 
{
    if (moving === true)
        return

    const tempGroup = createGroup(layer)
    let timeline = gsap.timeline()

    const rotationAnimation = {duration : parameters.animationDuration}
    rotationAnimation[axis] = tempGroup.rotation[axis] + (Math.PI * 0.5 * direction) 

    timeline
        .call(()=>{ moving = true })
        .to(tempGroup.rotation, rotationAnimation)
        .call(updateScene, [tempGroup, layer])
        .call(()=>{ moving = false })
}



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

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
        case "q":
            spinFunctions.spinCubeZInv();
            break;
        case "a":
            spinFunctions.spinCubeYInv();
            break;
        case "w":
            spinFunctions.spinBack();
            break;
        case "s":
            spinFunctions.spinBot();
            break;
        case "e":
            spinFunctions.spinLeftInv();
            break;
        case "d":
            spinFunctions.spinLeft();
            break;
        case "f":
            spinFunctions.spinTopInv();
            break;
        case "t":
        case "y":
            spinFunctions.spinCubeX();
            break;
        case "g":
            spinFunctions.spinFrontInv();
            break;
        case "b":
        case "n":
            spinFunctions.spinCubeXInv();
            break;
        case "h":
            spinFunctions.spinFront();
            break;
        case "j":
            spinFunctions.spinTop();
            break;
        case "i":
            spinFunctions.spinRight();
            break;
        case "k":
            spinFunctions.spinRightInv();
            break;
        case "o":
            spinFunctions.spinBackInv();
            break;
        case "l":spinFunctions
            spinFunctions.spinBotInv();
            break;
        case "p":
            spinFunctions.spinCubeZ();
            break;
        case "ö":spinFunctions
            spinFunctions.spinCubeY();
            break;
        default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);
  // the last option dispatches the event to the listener first,
  // then dispatches event to window
  

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
 * Animate
 */


const tick = () =>
{
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()