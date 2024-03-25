// @ts-ignore
import {
  BoxGeometry,
  DirectionalLight,
  GridHelper,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
  WebGLRenderer,
} from 'three'
import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

export const initRenderer = (canvas: HTMLElement) => {
  const renderer = new WebGLRenderer({
    canvas,
  })

  return renderer
}

export const updateRenderer = (
  renderer: any,
  width: number,
  height: number
) => {
  if (!renderer) return

  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
}

export const initCamera = () => {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )

  camera.position.z = 5
  return camera
}

export const updateCamera = (camera: any, aspectRatuio: number) => {
  if (!camera) return

  camera.aspect = aspectRatuio
  camera.updateProjectionMatrix()
}

export const createCube = () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0x00ff00 })

  return new Mesh(geometry, material)
}

export const orbitControls = (camera: any, renderer: any) => {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0.5, 0)
  controls.update()
  controls.enablePan = false
  controls.enableDamping = true

  return controls
}

export const createGround = () => {
  const groundGeometry = new PlaneGeometry(2000, 2000)
  const phongMaterial = new MeshPhongMaterial({
    color: 0xcbcbcb,
    depthWrite: false,
  })

  const ground = new Mesh(groundGeometry, phongMaterial)
  ground.rotation.x = -Math.PI / 2

  return ground
}

export const createGridHelper = () => {
  const grid = new GridHelper(200, 40, 0x000000, 0x000000)
  grid.material.opacity = 0.2
  grid.material.transparent = true
  return grid
}

// lights
export const createHemiLight = () => {
  const hemiLight = new HemisphereLight(0xffffff, 0x8d8d8d, 3)
  hemiLight.position.set(0, 20, 0)
  return hemiLight
}

export const createDirLight = () => {
  const dirLight = new DirectionalLight(0xffffff, 3)
  dirLight.position.set(0, 20, 10)
  return dirLight
}

export * from './chess-board'
