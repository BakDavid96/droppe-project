<script setup lang="ts">
import { ref } from 'vue'
import BoxBackground from '../assets/images/box_background.png'
import OpenBoxAnimation from './OpenBoxAnimation.vue'
import { useDayCountDown } from '../composables/useDayCountDown'
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
const countdown = useDayCountDown()

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
        v-if="box.id === 'free' && box.count === 0"
        disabled
        class="font-bold px-4 py-2 rounded-lg w-full sm:w-1/2 bg-white text-black bg-opacity-50 cursor-not-allowed"
      >
        NEXT IN {{ countdown }}
      </button>

      <button
        v-else-if="box.count > 0 && box.id === 'free'"
        @click="handleOpen"
        class="font-bold px-4 py-2 rounded-lg w-full sm:w-1/2 bg-[#BBEE53] text-black"
      >
        OPEN FREE BOX
      </button>

      <button
        v-else-if="box.count >= 0"
        :disabled="box.count === 0"
        @click="handleOpen"
        :class="[
          'font-bold px-4 py-2 rounded-lg w-full sm:w-1/2',
          'bg-white text-black',
          box.count === 0 ? 'bg-opacity-50 cursor-not-allowed' : '',
        ]"
      >
        {{ `OPEN | ${box.count}` }}
      </button>
    </div>
  </div>

  <OpenBoxAnimation v-if="isOpening" @finished="handleAnimationFinished" />
  <Modal
    :show="showModal"
    :prize="prize"
    :remainingBoxes="box.count"
    :id="box.id"
    @close="showModal = false"
    @startOpening="handleOpen"
    @buyBox="emit('buy')"
  />
</template>
