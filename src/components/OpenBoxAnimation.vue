<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Lottie from 'lottie-web'
import { confetti } from '@tsparticles/confetti'
import firstAnimation from '../assets/animations/delivery-box-close.json'
import secondAnimation from '../assets/animations/delivery-box-open.json'

const emit = defineEmits(['finished'])
const animationContainer = ref<HTMLElement | null>(null)

// Function to start the confetti animation
const playConfetti = () => {
  // Reinitialize confetti every time a box is opened
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  })
}

// Function to clear any previously played confetti
const clearConfetti = () => {
  const confettiCanvas = document.getElementById('confetti')
  if (confettiCanvas) {
    confettiCanvas.remove() // Remove the confetti canvas so it can be reinitialized
  }
}

onMounted(async () => {
  await nextTick()

  if (!animationContainer.value) return

  // First animation (Play for 0.5 seconds)
  const firstAnim = Lottie.loadAnimation({
    container: animationContainer.value,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData: firstAnimation,
  })

  firstAnim.setSpeed(5) // Speed it up for 0.5 seconds
  firstAnim.play()

  firstAnim.addEventListener('complete', () => {
    setTimeout(() => {
      // Destroy the first animation after completion
      firstAnim.destroy()

      if (!animationContainer.value) return

      // Second animation (Play for 1.5 seconds)
      const secondAnim = Lottie.loadAnimation({
        container: animationContainer.value,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: secondAnimation,
      })

      playConfetti() // Start the new confetti animation

      secondAnim.setSpeed(3) // Speed it up for 1.5 seconds

      secondAnim.addEventListener('complete', () => {
        setTimeout(() => {
          clearConfetti() // Clear any previously played confetti
          emit('finished') // Emit finished event to notify the parent
        }, 500)
      })
    }, 500) // Delay before starting the second animation
  })
})
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 top-[-20px]"
  >
    <div ref="animationContainer" class="w-64 h-64"></div>
  </div>
</template>
