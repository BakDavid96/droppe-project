src/components/Modal.vue
<script setup lang="ts">
defineProps<{ show: boolean }>()
const emit = defineEmits(['close'])
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 top-[-20px]"
  >
    <div
      class="relative bg-black p-6 rounded-xl text-center shadow-lg w-96 border-[1px] border-white"
    >
      <!-- Close Button -->
      <button
        @click="emit('close')"
        class="absolute top-2 right-2 text-white text-lg border border-white rounded-full w-8 h-8 flex items-center justify-center"
      >
        x
      </button>

      <!-- Prize Title -->
      <h2 class="text-2xl text-white">Yay! Box purchased successfully!</h2>

      <!-- Dynamic Button Logic -->
      <div class="mt-6 space-y-3">
        <button
          @click="emit('close')"
          class="w-full bg-black text-white border border-white font-bold px-4 py-4 rounded-lg"
        >
          CLOSE
        </button>
      </div>
    </div>
  </div>
</template>
