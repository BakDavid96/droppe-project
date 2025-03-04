<script setup lang="ts">
import { ref } from 'vue'
import BoxBackground from '../assets/images/box_background.png'
import OpenBoxAnimation from './OpenBoxAnimation.vue'
import Modal from './Modal.vue'

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

const isOpening = ref(false)
const showModal = ref(false)
const prize = ref('✨ Surprise Reward ✨') // Default prize text

const emit = defineEmits(['buy', 'open'])

const handleOpen = () => {
  if (isOpening.value) return
  isOpening.value = true

  // Simulate winning a random prize
  const prizes = ['$5', 'Free Item', 'Discount Code', '100 Coins']
  prize.value = prizes[Math.floor(Math.random() * prizes.length)]

  emit('open')
}

const handleAnimationFinished = () => {
  isOpening.value = false
  showModal.value = true
}
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
      <button
        v-if="box.price > 0"
        @click="emit('buy')"
        class="bg-[#BBEE53] text-black font-bold px-4 py-2 rounded-lg w-full sm:w-1/2"
      >
        BUY ${{ box.price.toFixed(2) }}
      </button>

      <button
        v-if="box.count >= 0"
        :disabled="box.count === 0"
        @click="handleOpen"
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

  <OpenBoxAnimation v-if="isOpening" @finished="handleAnimationFinished" />
  <Modal
    :show="showModal"
    :prize="prize"
    :remainingBoxes="box.count"
    @close="showModal = false"
    @startOpening="handleOpen"
    @buyBox="emit('buy')"
  />
</template>
