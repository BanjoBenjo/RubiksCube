import './style.css'
import * as THREE from 'three'
import * as lil from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Cube from './cube.js'
import algorithms from './algorithms.json'


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const cube = new Cube(scene)
cube.addToScene()

/**
 * Debug
 */
const gui = new lil.GUI()

let spinFunctions = {
    spinTop: () => { cube.spinTop() },
    spinTopInv: () => { cube.spinTopInv() }, 
    spinBot: () => { cube.spinBot() }, 
    spinBotInv: () => { cube.spinBotInv() },
    spinLeft: () => { cube.spinLeft() }, 
    spinLeftInv: () => { cube.spinLeftInv() }, 
    spinRight: () => { cube.spinRight() }, 
    spinRightInv: () => { cube.spinRightInv() }, 
    spinFront: () => { cube.spinFront() }, 
    spinFrontInv: () => { cube.spinFrontInv() }, 
    spinBack: () => { cube.spinBack() }, 
    spinBackInv: () => { cube.spinBackInv() }, 
    spinMid: () => { cube.spinMid() }, 
    spinMidInv: () => { cube.spinMidInv() }, 
    spinCubeX: () => { cube.spinCubeX() }, 
    spinCubeXInv: () => { cube.spinCubeXInv() }, 
    spinCubeY: () => { cube.spinCubeY() }, 
    spinCubeYInv: () => { cube.spinCubeYInv() }, 
    spinCubeZ: () => { cube.spinCubeZ() }, 
    spinCubeZInv: () => { cube.spinCubeZInv() }
}

const parameters = {
    animationDuration: cube.animationDuration
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

spinFunctionsGui.close()

let algorithmFunctions = {
    "LINE": () => { cube.algorithmInterpreter(algorithms["2LOLL"].EOLL.LINE) },
    "SMALL-L": () => { cube.algorithmInterpreter(algorithms["2LOLL"].EOLL["SMALL-L"]) },
    "DOT": () => { cube.algorithmInterpreter(algorithms["2LOLL"].EOLL.DOT) },
    "SUNE": () => { cube.algorithmInterpreter(algorithms["2LOLL"].OCLL.SUNE) },
    "ANTI-SUNE": () => { cube.algorithmInterpreter(algorithms["2LOLL"].OCLL["ANTI-SUNE"]) },
    "H": () => { cube.algorithmInterpreter(algorithms["2LOLL"].OCLL.H) },
    "P'": () => { cube.algorithmInterpreter(algorithms["2LOLL"].OCLL["P'"]) },
    "HEADLIGHTS": () => { cube.algorithmInterpreter(algorithms["2LOLL"].OCLL.HEADLIGHTS) },
    "T": () => { cube.algorithmInterpreter(algorithms["2LOLL"].OCLL.T) },
    "BOWTIE": () => { cube.algorithmInterpreter(algorithms["2LOLL"].OCLL.BOWTIE) },
    "HEADLIGHTS-BACK": () => { cube.algorithmInterpreter(algorithms["2LOLL"].CPLL["HEADLIGHTS-BACK"]) },
    "NO-HEADLIGHTS": () => { cube.algorithmInterpreter(algorithms["2LOLL"].CPLL["NO-HEADLIGHTS"]) },
    "UA-PERM": () => { cube.algorithmInterpreter(algorithms["2LOLL"].EPLL["UA-PERM"]) },
    "UB-PERM": () => { cube.algorithmInterpreter(algorithms["2LOLL"].EPLL["UB-PERM"]) },
    "Z-PERM": () => { cube.algorithmInterpreter(algorithms["2LOLL"].EPLL["Z-PERM"]) },
    "H-PERM": () => { cube.algorithmInterpreter(algorithms["2LOLL"].EPLL["H-PERM"]) },
}

const algoGui = gui.addFolder( 'Algorithms' )
const eollGui = algoGui.addFolder("EOLL")
eollGui.add(algorithmFunctions, 'LINE')
eollGui.add(algorithmFunctions, "SMALL-L")
eollGui.add(algorithmFunctions, "DOT")

const ocllGui = algoGui.addFolder("OCLL")
ocllGui.add(algorithmFunctions, 'SUNE')
ocllGui.add(algorithmFunctions, 'ANTI-SUNE')
ocllGui.add(algorithmFunctions, 'H')
ocllGui.add(algorithmFunctions, "P'")
ocllGui.add(algorithmFunctions, 'HEADLIGHTS')
ocllGui.add(algorithmFunctions, 'T')
ocllGui.add(algorithmFunctions, 'BOWTIE')

const cpllGui = algoGui.addFolder("cpll")
cpllGui.add(algorithmFunctions, 'HEADLIGHTS-BACK')
cpllGui.add(algorithmFunctions, 'NO-HEADLIGHTS')

const epllGui = algoGui.addFolder("cpll")
epllGui.add(algorithmFunctions, 'UA-PERM')
epllGui.add(algorithmFunctions, 'UB-PERM')
epllGui.add(algorithmFunctions, 'Z-PERM')
epllGui.add(algorithmFunctions, 'H-PERM')


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
            cube.spinCubeZ();
            break;
        case "a":
            cube.spinCubeY();
            break;
        case "w":
            cube.spinBack();
            break;
        case "s":
            cube.spinBot();
            break;
        case "e":
            cube.spinLeftInv();
            break;
        case "d":
            cube.spinLeft();
            break;
        case "f":
            cube.spinTopInv();
            break;
        case "t":
        case "z":
            cube.spinCubeXInv();
            break;
        case "g":
            cube.spinFront();
            break;
        case "b":
        case "n":
            cube.spinCubeX();
            break;
        case "h":
            cube.spinFrontInv();
            break;
        case "j":
            cube.spinTop();
            break;
        case "i":
            cube.spinRightInv();
            break;
        case "k":
            cube.spinRight();
            break;
        case "o":
            cube.spinBackInv();
            break;
        case "l":
            cube.spinBotInv();
            break;
        case "p":
            cube.spinCubeZInv();
            break;
        case "ö":
            cube.spinCubeYInv();
            break;
        case "5":
        case "6":
            cube.spinMid();
            break;
        case "x":
        case ".":
            cube.spinMidInv();
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