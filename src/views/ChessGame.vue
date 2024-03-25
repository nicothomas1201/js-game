<template>
  <canvas ref="canvas" />
  <!-- <div class="w-screen h-screen text-white bg-black">Hola</div> -->
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { ref, onMounted, watchEffect, computed } from 'vue'
import { Color, Fog, Scene } from 'three'
import {
  initCamera,
  initRenderer,
  updateCamera,
  updateRenderer,
  createCube,
  orbitControls, // chessBoard,
  createGround,
  createGridHelper,
  createHemiLight,
  createDirLight,
} from '@/utils/three'

const canvas = ref()

const scene = new Scene()
scene.background = new Color(0xe0e0e0)
scene.fog = new Fog(0xe0e0e0, 20, 100)

let renderer: any = null
let camera = null

const cube = createCube()
const ground = createGround()
const grid = createGridHelper()

// lights
const hemiLight = createHemiLight()
const dirLight = createDirLight()

camera = initCamera()
camera.lookAt(scene.position)

const { width, height } = useWindowSize()
const aspectRatio = computed<number>(() => width.value / height.value)

cube.position.y = 0.5

scene.add(camera)
scene.add(ground)
scene.add(cube)
scene.add(grid)
scene.add(hemiLight)
scene.add(dirLight)

watchEffect(() => {
  updateRenderer(renderer, width.value, height.value)
  updateCamera(camera, aspectRatio.value)
})

onMounted(() => {
  if (canvas.value) {
    renderer = initRenderer(canvas.value)
    renderer.render(scene, camera)

    const controls = orbitControls(camera, renderer)

    updateRenderer(renderer, width.value, height.value)
    updateCamera(camera, aspectRatio.value)

    const tick = () => {
      renderer.render(scene, camera)
      window.requestAnimationFrame(tick)
      controls.update()
    }

    tick()
  }
})
// import * as THREE from 'three'

// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// )

// const renderer = new THREE.WebGLRenderer()
</script>

<style scoped>
canvas {
  position: absolute;
  touch-action: none;
}
</style>
