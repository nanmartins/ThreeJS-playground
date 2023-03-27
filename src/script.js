import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 0.9)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)


/**
 * Textures
 */
// const textureLoader = new THREE.TextureLoader()

// const AbstractAmbientOcclusion = textureLoader.load('/textures/AbstractAmbientOcclusion.jpg')
// const AbstractBaseColor = textureLoader.load('/textures/AbstractBaseColor.jpg')
// const AbstractHeight = textureLoader.load('/textures/AbstractHeight.png')
// const AbstractMetallic = textureLoader.load('/textures/AbstractMetallic.jpg')
// const AbstractNormal = textureLoader.load('/textures/AbstractNormal.jpg')
// const AbstractRoughness = textureLoader.load('/textures/AbstractRoughness.jpg')

// const matcapTexture = textureLoader.load('textures/matcaps/7.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()

// let text
// let text2

fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json', (font) => {
    // Material
    const textMaterial = new THREE.MeshNormalMaterial()

    // gui.add(textMaterial, 'metalness').min(0).max(1).step(0.001)
    // gui.add(textMaterial, 'roughness').min(0).max(1).step(0.001)


    // textMaterial.roughness = 0.2
    // textMaterial.metalness = 0.7
    // textMaterial.normalMap = AbstractNormal
    // textMaterial.map = AbstractBaseColor
    // textMaterial.aoMap = AbstractAmbientOcclusion
    // textMaterial.aoMapIntensity = 0.85
    // // textMaterial.displacementMap = AbstractHeight
    // // textMaterial.displacementScale = 0.01
    // textMaterial.normalScale.set(0.4, 0.4)

      // Text
    const textGeometry = new TextGeometry('Hello World', {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 8
      }
    )
    const text2Geometry = new TextGeometry('welcome to my WebGL playground', {
        font: font,
        size: 0.06,
        height: 0.2,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 4
      }
    )
    textGeometry.center()

    const text = new THREE.Mesh(textGeometry, textMaterial)
    const text2 = new THREE.Mesh(text2Geometry, textMaterial)

    text2.position.x = 0.485
    text2.position.y = - 0.383
    text2.position.z = -0.1


    scene.add(text, text2)

    // Donuts
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64)
    const donutMaterial = new THREE.MeshDepthMaterial()

    for(let i = 0; i < 150; i++) {
      const donut = new THREE.Mesh(donutGeometry, donutMaterial)
      donut.position.x = (Math.random() - 0.5) * 10
      donut.position.y = (Math.random() - 0.5) * 10
      donut.position.z = (Math.random() - 0.5) * 10

      // checking distance between donut and text
      const distanceToText = donut.position.distanceTo(text.position)

      if (distanceToText > 1.5) {
        const scale = Math.random()
        donut.scale.set(scale, scale, scale)
        scene.add(donut)
      }
    }
  }
)

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
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.15, 100)
camera.position.x = 0.1
camera.position.y = -0.8
camera.position.z = 2

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
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()





// Dat Gui

// gui.add(material, 'metalness').min(0).max(1).step(0.001)
// gui.add(material, 'roughness').min(0).max(1).step(0.001)
// gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.001)
// gui.add(material, 'displacementScale').min(0).max(1).step(0.001)
