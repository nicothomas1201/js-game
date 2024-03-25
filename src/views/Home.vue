<template>
  <div
    class="flex flex-col items-center justify-center w-screen h-screen gap-2 bg-black"
  >
    <h1 class="text-2xl text-white">Chess Game</h1>
    <router-link to="/chess">
      <button class="bg-purple-800 text-white p-1 w-[80px] rounded-md">
        Start
      </button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
