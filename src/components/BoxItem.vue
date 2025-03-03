<script setup lang="ts">
import BoxBackground from '../assets/images/box_background.png'

defineProps<{
  box: {
    id: string
    name: string
    description: string
    price: number
    image: string
    available: boolean
    count: number
  }
}>()
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${BoxBackground})` }"
    class="bg-cover bg-center p-3 rounded-lg shadow-md relative border-[2px] border-[#545351]"
  >
    <div class="flex items-center space-x-4 bg-opacity-50 rounded-lg">
      <div class="w-24 h-24">
        <img
          :src="box.image"
          class="w-full h-full object-cover"
          alt="Box Image"
        />
      </div>
      <div class="flex-1 text-white">
        <h2 class="text-lg">{{ box.name }}</h2>
        <p class="text-xs">{{ box.description }}</p>
      </div>
    </div>

    <div class="mt-4 flex justify-between space-x-4">
      <!-- BUY BUTTON -->
      <button
        v-if="box.price > 0"
        class="bg-[#BBEE53] text-black font-bold px-4 py-2 rounded-lg w-full sm:w-1/2"
      >
        BUY ${{ box.price.toFixed(2) }}
      </button>

      <!-- OPEN BUTTON -->
      <button
        v-if="box.count >= 0"
        :disabled="box.count === 0"
        :class="[
          'font-bold px-4 py-2 rounded-lg w-full sm:w-1/2',
          box.id === 'free' ? 'bg-[#BBEE53] text-black' : 'bg-white text-black',
          box.count === 0 ? 'bg-opacity-50 cursor-not-allowed' : '',
        ]"
      >
        {{ box.id === 'free' ? 'OPEN FREE BOX' : `OPEN | ${box.count}` }}
      </button>
    </div>
  </div>
</template>
