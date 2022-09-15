import * as THREE from 'three'
import gsap from 'gsap'


export default class Cube {
    constructor(scene){
        this.scene = scene
        this.piecesArray = this.createPieces()
        this.animationDuration = 0.3
        this.moving = false
    }

    // Helper
    roundPositions(){
        for (let i=0; i <= 26; i++){
            let piece = this.piecesArray[i]
            piece.position.x = Math.round(piece.position.x)
            piece.position.y = Math.round(piece.position.y)
            piece.position.z = Math.round(piece.position.z)
        }
    }

    /**
     * Base creation
     */

    addToScene(){
        for (let i=0; i <= 26; i++){
            this.scene.add(this.piecesArray[i])
        }
    }

    createPieces() {
        let piecesArray = [] // cubes with plates attached in group
        const rubiksMaterial = new THREE.MeshStandardMaterial({ color: 0xd9d9d9 })
        const rubiksGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9)

        for (let x=0; x <= 26; x++)
        {
            let group = new THREE.Group()

            const cube = new THREE.Mesh(
                rubiksGeometry,
                rubiksMaterial
            )
            
            const xIndex = (x % 3) -1
            const yIndex = Math.floor(x / 9) -1
            const zIndex = Math.floor(x / 3) % 3 -1

            group.add(cube)
            group = this.addPlates(group, xIndex, yIndex, zIndex)    
            
            group.name = x
            group.position.x = xIndex
            group.position.y = yIndex
            group.position.z = zIndex

            piecesArray[x] = group
        }
        return piecesArray
    }

    addPlates(group, xIndex, yIndex, zIndex) {    
        if (yIndex === 1){   
            group.add( 
                this.createPlate({
                    geometry: new THREE.BoxGeometry(0.8, 0.1, 0.8),
                    color: 0xf6d32d,   
                    side: 'top' })
                    )
            }
        if (yIndex === -1){   
            group.add( 
                this.createPlate({
                    geometry: new THREE.BoxGeometry(0.8, 0.1, 0.8),
                    color: 0xEDEDED,   
                    side: 'bot' })
                    )
            }
        if (xIndex === 1){   
            group.add( 
                this.createPlate({
                    geometry: new THREE.BoxGeometry(0.1, 0.8, 0.8),
                    color: 0x3584e4,   
                    side: 'right' })
                    )
            }
        if (xIndex === -1){   
            group.add( 
                this.createPlate({
                    geometry: new THREE.BoxGeometry(0.1, 0.8, 0.8),
                    color: 0x26a269,   
                    side: 'left' })
                    )
            }
        if (zIndex === -1){   
            group.add( 
                this.createPlate({
                    geometry: new THREE.BoxGeometry(0.8, 0.8, 0.1),
                    color: 0xff7800,   
                    side: 'front' })
                    )
            }
        if (zIndex === 1){   
            group.add( 
                this.createPlate({
                    geometry: new THREE.BoxGeometry(0.8, 0.8, 0.1),
                    color: 0xe01b24,   
                    side: 'back' })
                    )
            }
    
        return group 
    }

    createPlate({ geometry, color, side}) {
        const plane = new THREE.Mesh
        (
            geometry,
            new THREE.MeshStandardMaterial({ color: color })
        )
    
        if (side === 'top')     { plane.position.y = 0.5}
        if (side === 'bot')     { plane.position.y = -0.5}
        if (side === 'left')    { plane.position.x = -0.5}
        if (side === 'right')   { plane.position.x = 0.5}
        if (side === 'back')    { plane.position.z = 0.5}
        if (side === 'front')   { plane.position.z = -0.5 }
        return plane
    }

    /**
    * Spin Functions
    */
    delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    spin(axis, layer, direction){
        if (this.moving === true){return}

        const tempGroup = this.createGroup(layer);
        let rotationAnimation = {duration : this.animationDuration}
        rotationAnimation[axis] = tempGroup.rotation[axis] + (Math.PI * 0.5 * direction)
        
        const timeline = gsap.timeline(
            { 
                onStart: ()=>{ this.moving = true;},
                onComplete:()=>{ this.moving = false;}
            })
        
        timeline
            .to(tempGroup.rotation, rotationAnimation, ">")
            .add(()=>
            {
                tempGroup.updateMatrixWorld()
                for ( var i in layer ) {
                    this.scene.attach( layer[ i ] );
                }
                this.roundPositions()
                this.scene.remove(tempGroup)
                rotationAnimation[axis] = 0
            }, ">")

        return true
        }

    
    createGroup(layer){
        const group = new THREE.Group()
        this.scene.attach(group)
        
        for ( let i in layer ) {
            group.attach( layer[ i ] );
        }
        return group
    }
    
    assembleLayer(side) {
        let layer = []
        for (let i=0; i <= 26; i++)
        {
            const piece = this.piecesArray[i]
            switch (side){
                case "cube":
                    layer.push(this.piecesArray[i])
                case "top":
                    if (piece.position.y === 1){
                        layer.push(this.piecesArray[i])
                    }
                    break;
                case "bot":
                    if (piece.position.y === -1){
                        layer.push(this.piecesArray[i])
                    }
                    break;
                case "left":
                    if (piece.position.x === -1){
                        layer.push(this.piecesArray[i])
                    }
                    break;
                case "right":
                    if (piece.position.x === 1){
                        layer.push(this.piecesArray[i])
                    }
                    break;
                case "front":
                    if (piece.position.z === 1){
                        layer.push(this.piecesArray[i])
                    }
                    break;
                case "back":
                    if (piece.position.z === -1){
                        layer.push(this.piecesArray[i])
                    }
                    break;
                case "mid":
                    if (piece.position.x === 0){
                        layer.push(this.piecesArray[i])
                    }
                    break;
                case "r":
                    if (piece.position.x === 0 || piece.position.x === 1){
                        layer.push(this.piecesArray[i])
                    }
                    break;
                case "l":
                    if (piece.position.x === 0 || piece.position.x === -1){
                        layer.push(this.piecesArray[i])
                    }
                    break;
                case "f":
                    if (piece.position.z === 0 || piece.position.z === 1){
                        layer.push(this.piecesArray[i])
                    }
                    break;
                default:
                    return
            }
        }
        return layer
    }

    spinTop(){
        let group = this.assembleLayer('top')
        this.spin('y', group, -1)
    }

    spinTopInv(){
        let group = this.assembleLayer('top')
        this.spin('y', group, 1)
    }

    spinBot(){
        let group = this.assembleLayer('bot')
        this.spin('y', group, 1)
    }

    spinBotInv(){
        let group = this.assembleLayer('bot')
        this.spin('y', group, -1)
    }

    spinLeft(){
        let group = this.assembleLayer('left')
        this.spin('x', group, 1)
    }

    spinleft(){
        let group = this.assembleLayer('l')
        this.spin('x', group, 1)
    }

    spinLeftInv(){
        let group = this.assembleLayer('left')
        this.spin('x', group, -1)
    }

    spinleftInv(){
        let group = this.assembleLayer('l')
        this.spin('x', group, -1)
    }

    spinRight(){
        let group = this.assembleLayer('right')
        this.spin('x', group, -1)  
    }

    spinright(){
        let group = this.assembleLayer('r')
        this.spin('x', group, -1)  
    }

    spinRightInv(){
        let group = this.assembleLayer('right')
        this.spin('x', group, 1) 
    }

    spinrightInv(){
        let group = this.assembleLayer('r')
        this.spin('x', group, 1) 
    }

    spinFront(){
        let group = this.assembleLayer('front')
        this.spin('z', group, -1)
    }

    spinfront(){
        let group = this.assembleLayer('f')
        this.spin('z', group, -1)
    }

    spinFrontInv(){
        let group = this.assembleLayer('front')
        this.spin('z', group, 1)
    }

    spinfrontInv(){
        let group = this.assembleLayer('f')
        this.spin('z', group, 1)
    }

    spinBack(){
        let group = this.assembleLayer('back')
        this.spin('z', group, 1)
    }

    spinBackInv(){
        let group = this.assembleLayer('back')
        this.spin('z', group, -1)
    }

    spinMid(){
        let group = this.assembleLayer('mid')
        this.spin('x', group, 1)
    }

    spinMidInv(){
        let group = this.assembleLayer('mid')
        this.spin('x', group, -1)
    }

    spinCubeX(){
        let group = this.assembleLayer('cube')
        this.spin('x', group, -1)
    }

    spinCubeXInv(){
        let group = this.assembleLayer('cube')
        this.spin('x', group, 1)
    }

    spinCubeY(){
        let group = this.assembleLayer('cube')
        this.spin('y', group, 1)
    }

    spinCubeYInv(){
        let group = this.assembleLayer('cube')
        this.spin('y', group, -1)
    }

    spinCubeZ(){
        let group = this.assembleLayer('cube')
        this.spin('z', group, 1)
    }

    spinCubeZInv(){
        let group = this.assembleLayer('cube')
        this.spin('z', group, -1)
    }

    async algorithmInterpreter(moveArray){
        for ( let i=0; i<=moveArray.length-1; i++){
            let move = moveArray[i]
            let repeat = 0

            if(move.charAt(1) === "2"){
                repeat = 1
                move = move.slice(0,1) + move.slice(2)
            }
            
            for(let r=0; r<=repeat; r++){
                switch (move) {
                    case "U":
                        this.spinTop();
                        break;
                    case "U'":
                        this.spinTopInv();
                        break;
                    case "D":
                        this.spinBot();
                        break;
                    case "D'":
                        this.spinBotInv();
                        break;
                    case "F":
                        this.spinFront();
                        break;
                    case "f":
                        this.spinfront();
                        break;
                    case "F'":
                        this.spinFrontInv();
                        break;
                    case "f'":
                        this.spinfrontInv();
                        break;
                    case "B":
                        this.spinBack();
                        break;
                    case "B'":
                        this.spinBackInv();
                        break;
                    case "L":
                        this.spinLeft();
                        break;
                    case "l":
                        this.spinleft();
                        break;
                    case "L'":
                        this.spinLeftInv();
                        break;
                    case "l'":
                        this.spinleftInv();
                        break;
                    case "M":
                        this.spinMid();
                        break;
                    case "M'":
                        this.spinMidInv();
                        break;
                    case "R":
                        this.spinRight();
                        break;
                    case "r":
                        this.spinright();
                        break;
                    case "R'":
                        this.spinRightInv();
                        break;
                    case "r'":
                        this.spinrightInv();
                        break;
                    case "z":
                        this.spinCubeZ();
                        break;
                    case "z'":
                        this.spinCubeZInv();
                        break;
                    case "y":
                        this.spinCubeY();
                        break;
                    case "y'":
                        this.spinCubeYInv();
                        break;
                    case "x'":
                        this.spinCubeXInv();
                        break;
                    case "x":
                        this.spinCubeX();
                        break;
                    default:
                        return;
                }
                await this.delay((this.animationDuration + 0.1) * 1000)
            }
        }
    }
}



