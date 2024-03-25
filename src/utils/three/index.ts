// @ts-ignore
import {
  AnimationMixer,
  BoxGeometry,
  DirectionalLight,
  GridHelper,
  HemisphereLight,
  LoopOnce,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
  WebGLRenderer,
} from 'three'
import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'

let previousAction: any = null
let activeAction: any = null

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

  camera.position.set(-5, 3, 10)
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

// animation
export const fadeToAction = (name: string, duration: number, actions: any) => {
  previousAction = activeAction
  activeAction = actions[name]

  if (previousAction !== activeAction) {
    previousAction.fadeOut(duration)
  }

  activeAction
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(duration)
    .play()
}

// gui
export const createGui = (model: any, animations: any) => {
  const states = [
    'Idle',
    'Walking',
    'Running',
    'Dance',
    'Death',
    'Sitting',
    'Standing',
  ]
  const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']
  const api: any = { state: 'Walking' }

  const gui = new GUI()
  const mixer = new AnimationMixer(model)

  const actions: any = {}

  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i]
    const action = mixer.clipAction(clip)
    actions[clip.name] = action

    if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
      action.clampWhenFinished = true
      action.loop = LoopOnce
    }
  }

  // states
  const statesFolder = gui.addFolder('States')
  const clipCtrl = statesFolder.add(api, 'state').options(states)

  clipCtrl.onChange(() => {
    fadeToAction(api.state, 0.5, actions)
  })

  statesFolder.open()

  // emotes
  const emoteFolder = gui.addFolder('Emotes')

  const createEmoteCallback = (name: string) => {
    api[name] = () => {
      fadeToAction(name, 0.2, actions)
      mixer.addEventListener('finished', restoreState)
    }

    emoteFolder.add(api, name)
  }

  const restoreState = () => {
    mixer.removeEventListener('finished', restoreState)
    fadeToAction(api.state, 0.2, actions)
  }

  for (let i = 0; i < emotes.length; i++) {
    createEmoteCallback(emotes[i])
  }

  // expresions
  const face = model.getObjectByName('Head_4')

  const expressions = Object.keys(face.morphTargetDictionary)
  const expressionFolder = gui.addFolder('Expressions')

  for (let i = 0; i < expressions.length; i++) {
    expressionFolder
      .add(face.morphTargetInfluences, String(i), 0, 1, 0.01)
      .name(expressions[i])
  }

  activeAction = actions['Walking']
  activeAction.play()

  emoteFolder.open()

  return mixer
}

export * from './chess-board'
