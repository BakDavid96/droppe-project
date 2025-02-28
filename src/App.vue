<script setup lang="ts">
import BoxChallengeButton from './components/BoxChallengeButton.vue'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-center space-x-8 mb-8">
        <a href="https://vitejs.dev" target="_blank">
          <img
            src="/vite.svg"
            class="h-24 hover:scale-110 transition-transform"
            alt="Vite logo"
          />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img
            src="./assets/vue.svg"
            class="h-24 hover:scale-110 transition-transform"
            alt="Vue logo"
          />
        </a>
      </div>
      <HelloWorld msg="Vue 3 + TypeScript + Tailwind" />
      <BoxChallengeButton />
    </div>
  </div>
</template>
