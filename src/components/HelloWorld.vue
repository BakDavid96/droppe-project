<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ msg }}</h1>

    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <button
        type="button"
        @click="count++"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        count is {{ count }}
      </button>
      <p class="mt-4 text-gray-600">
        Edit
        <code class="bg-gray-100 px-2 py-1 rounded"
          >components/HelloWorld.vue</code
        >
        to test HMR
      </p>
    </div>

    <div class="space-y-4 text-gray-600">
      <p>
        Check out
        <a
          href="https://vuejs.org/guide/quick-start.html#local"
          target="_blank"
          class="text-blue-500 hover:text-blue-600"
          >create-vue</a
        >, the official Vue + Vite starter
      </p>
      <p>
        Learn more about IDE Support for Vue in the
        <a
          href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
          target="_blank"
          class="text-blue-500 hover:text-blue-600"
          >Vue Docs Scaling up Guide</a
        >.
      </p>
    </div>
  </div>
</template>
