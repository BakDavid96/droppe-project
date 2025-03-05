<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { confetti } from '@tsparticles/confetti'
import firstPlace from '../assets/animations/first_place.gif'
import secondPlace from '../assets/animations/second_place.gif'
import thirdPlace from '../assets/animations/third_place.gif'
import sadDuck from '../assets/animations/sad_duck.gif'

// Props (Pass `won` as true/false)
const props = defineProps<{ won: boolean }>()

// Emit event for closing modal
const emit = defineEmits(['close'])

// Randomly select a badge if the user wins
const badgeGifs = [firstPlace, secondPlace, thirdPlace]
const selectedBadge = ref<string | null>(null)

// Function to play confetti
const playConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  })
}

onMounted(() => {
  if (props.won) {
    // Randomly select a badge
    selectedBadge.value =
      badgeGifs[Math.floor(Math.random() * badgeGifs.length)]
    playConfetti() // Only play confetti when the user wins
    // document.getElementById('confetti').style.zIndex = '-10'
  } else {
    selectedBadge.value = sadDuck // Sad duck GIF for losers
  }
})
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
  >
    <!-- Close Button -->
    <button
      @click="emit('close')"
      class="absolute top-2 right-2 text-white border rounded-full w-6 h-6 flex items-center justify-center"
    >
      X
    </button>
    <div class="relative w-80 h-96 rounded-2xl p-6 flex flex-col items-center">
      <!-- Win/Loss Message -->
      <h2 class="text-2xl font-bold mt-4 text-white-400 text-center">
        {{ props.won ? 'Congrats, you won a badge!' : "YOU DIDN'T WIN" }}
      </h2>

      <!-- Badge/Sad Duck GIF Container -->
      <div
        :class="[
          'w-50 h-50 mt-6 flex items-center justify-center rounded-full bg-black border-gray-500',
          selectedBadge === sadDuck ? '' : 'border-4',
        ]"
      >
        <img
          v-if="selectedBadge"
          :src="selectedBadge"
          :class="[
            'w-48 h-48 border-4 rounded-full border-gray-500 ',
            selectedBadge === sadDuck ? 'border-1 p-8' : 'border-4 p-4',
          ]"
        />
      </div>
    </div>
  </div>
</template>
