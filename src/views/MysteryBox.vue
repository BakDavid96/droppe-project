<script setup lang="ts">
import CountDownTimer from '../components/CountDownTimer.vue'
import BoxItem from '../components/BoxItem.vue'
import GreenBoxGif from '../assets/animations/green_box.gif'
import RedBoxGif from '../assets/animations/red_box.gif'
import YellowBoxGif from '../assets/animations/yellow_box.gif'

import { ref } from 'vue'

const boxes = ref([
  {
    id: 'free',
    name: 'FREE BOX',
    description:
      'Get a surprise boost—completely free! Don’t miss out on premium rewards.',
    price: 0,
    image: GreenBoxGif,
    available: true,
    count: 1,
  },
  {
    id: 'box1',
    name: 'NAME 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 0.99,
    image: RedBoxGif,
    available: false,
    count: 0,
  },
  {
    id: 'box2',
    name: 'NAME 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 1.99,
    image: YellowBoxGif,
    available: true,
    count: 3,
  },
])
</script>

<template>
  <!-- Ensure the main container is relative -->
  <div
    class="relative min-h-screen bg-black text-white px-4 py-6 overflow-hidden"
  >
    <!-- Blurred Ellipses (Background) -->
    <div class="absolute inset-0">
      <div
        class="absolute top-[-100px] left-[-120px] w-[500px] h-[250px] bg-[#dd4545] blur-[53px] max-w-full"
      ></div>
      <div
        class="absolute top-[-50px] right-[-60px] w-[200px] h-[180px] bg-[#7B7BFF] blur-[53px] max-w-full"
      ></div>
    </div>

    <!-- Title & Countdown (Ensure z-index is higher) -->
    <div class="relative text-center mb-6 z-10">
      <h1 class="text-2xl font-bold">MYSTERY BOXES</h1>
      <p class="text-sm text-400 opacity-70">
        Unlock surprises that boost your journey
      </p>
      <CountDownTimer />
    </div>

    <!-- Box List (Ensure z-index is higher) -->
    <div class="relative space-y-4 z-10">
      <BoxItem v-for="box in boxes" :key="box.id" :box="box" />
    </div>
  </div>
</template>
