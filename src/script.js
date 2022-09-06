import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import * as lil from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Debug
 */
 const gui = new lil.GUI()

 let parameters = {
    spinTop: () => 
    {
        let group = assembleLayer('top')
        spinY(group, -1)
    },
    spinTopInv: () => 
    {
        let group = assembleLayer('top')
        spinY(group, 1)
    },
    spinBot: () => 
    {
        let group = assembleLayer('bot')
        spinY(group, 1)
    },
    spinBotInv: () => 
    {
        let group = assembleLayer('bot')
        spinY(group, -1)
    },
    spinLeft: () => 
    {
        let group = assembleLayer('left')
        spinX(group, 1)
    },
    spinLeftInv: () => 
    {
       let group = assembleLayer('left')
       spinX(group, -1)
    },
    spinRight: () => 
    {
        let group = assembleLayer('right')
        spinX(group, 1)  
    },
    spinRightInv: () => 
    {
        let group = assembleLayer('right')
        spinX(group, -1) 
    },
    spinFront: () => 
    {
       let group = assembleLayer('front')
       spinZ(group, 1)
    },
    spinFrontInv: () => 
    {
       let group = assembleLayer('front')
       spinZ(group, -1)
    },
    spinBack: () => 
    {
       let group = assembleLayer('back')
       spinZ(group, 1)
    },
    spinBackInv: () => 
    {
       let group = assembleLayer('back')
       spinZ(group, -1)
    },
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
const helper = new THREE.AxesHelper(2)
scene.add(helper)


/**
 * Update Moveable Groups
 */
 const assembleLayer = (side) => {
    let layer = []
    console.log(piecesArray)
    for (let i=0; i <= 26; i++)
    {
        const piece = piecesArray[i]
        console.log(piece.position)
        switch (side){
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

const spinY = (layer, direction) => 
{
    const tempGroup = createGroup(layer)
    let timeline = gsap.timeline()
    timeline
        .to(tempGroup.rotation, { duration: 0.5, y: tempGroup.rotation.y + (Math.PI * 0.5 * direction)  })
        .call(updateScene, [tempGroup, layer])
}

const spinX = (layer, direction) => 
{
    const tempGroup = createGroup(layer)
    let timeline = gsap.timeline()
    timeline
        .to(tempGroup.rotation, { duration: 0.5, x: tempGroup.rotation.x + (Math.PI * 0.5 * direction)  })
        .call(updateScene, [tempGroup, layer])
}
const spinZ = (layer, direction) => 
{   
    const tempGroup = createGroup(layer)
    let timeline = gsap.timeline()
    timeline
        .to(tempGroup.rotation, { duration: 0.5, z: tempGroup.rotation.z + (Math.PI * 0.5 * direction)  })
        .call(updateScene, [tempGroup, layer])
}

gui.add(parameters, 'spinTop')
gui.add(parameters, 'spinTopInv')
gui.add(parameters, 'spinBot')
gui.add(parameters, 'spinBotInv')
gui.add(parameters, 'spinRight')
gui.add(parameters, 'spinRightInv')
gui.add(parameters, 'spinLeft')
gui.add(parameters, 'spinLeftInv')
gui.add(parameters, 'spinFront')
gui.add(parameters, 'spinFrontInv')
gui.add(parameters, 'spinBack')
gui.add(parameters, 'spinBackInv')


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
        case "w":
            parameters.spinBack();
            break;
        case "s":
            parameters.spinBot();
            break;
        case "e":
            parameters.spinLeftInv();
            break;
        case "d":
            parameters.spinLeft();
            break;
        case "f":
            parameters.spinTopInv();
            break;
        case "g":
            parameters.spinFrontInv();
            break;
        case "h":
            parameters.spinFront();
            break;
        case "j":
            parameters.spinTop();
            break;
        case "i":
            parameters.spinRight();
            break;
        case "k":
            parameters.spinRightInv();
            break;
        case "o":
            parameters.spinBackInv();
            break;
        case "l":
            parameters.spinBotInv();
            break;
        default:
        console.log(event.key)
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