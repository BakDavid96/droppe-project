<script setup lang="ts">
defineProps<{ show: boolean; prize: string; remainingBoxes: number }>()
const emit = defineEmits(['close', 'buyBox', 'startOpening'])

const handleOpenAgain = () => {
  emit('startOpening')
  emit('close')
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 top-[-20px]"
  >
    <div
      class="relative bg-black p-6 rounded-lg text-center shadow-lg w-96 border-[1px] border-white"
    >
      <!-- Close Button -->
      <button
        @click="emit('close')"
        class="absolute top-2 right-2 text-white text-lg font-bold border border-white rounded-full w-8 h-8 flex items-center justify-center"
      >
        X
      </button>

      <!-- Prize Title -->
      <h2 class="text-2xl font-bold text-white">Yay! Box Opened!</h2>
      <p class="text-gray-400 mt-1">Your box contains:</p>

      <!-- Prize Display -->
      <div class="flex items-center bg-gray-900 text-white p-3 mt-4 rounded-lg">
        <span class="text-lg font-semibold">{{ prize }}</span>
      </div>

      <!-- Dynamic Button Logic -->
      <div class="mt-6 space-y-3">
        <button
          v-if="remainingBoxes > 0"
          @click="handleOpenAgain"
          class="w-full bg-white text-black border border-[#BBEE53] font-bold px-4 py-4 rounded-lg"
        >
          OPEN BOX ({{ remainingBoxes }} LEFT)
        </button>
        <button
          v-else
          @click="emit('buyBox')"
          class="w-full bg-white text-black border border-[#BBEE53] font-bold px-4 py-4 rounded-lg"
        >
          BUY BOX
        </button>
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
