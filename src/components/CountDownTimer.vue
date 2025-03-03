<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TrophyGif from '@/assets/animations/trophy_jump.gif'

const timeLeft = ref('')

const updateTimer = () => {
  const now = new Date()
  const nextReset = new Date()
  nextReset.setUTCHours(24, 0, 0, 0) // Next midnight UTC

  const diff = nextReset.getTime() - now.getTime()
  const hours = Math.floor(diff / 1000 / 60 / 60)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  timeLeft.value = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

onMounted(() => {
  updateTimer()
  setInterval(updateTimer, 1000)
})
</script>

<template>
  <div class="mt-6 flex flex-col items-center relative">
    <!-- Trophy Container -->
    <div
      class="flex items-center justify-center w-16 h-16 bg-gradient-to-b from-[#7EC8E4] to-[#16333E] border-[3px] rounded-2xl shadow-md relative z-[10]"
    >
      <div
        class="absolute w-10 h-10 bg-[#E72E6DAD] blur-[10px] rounded-full"
      ></div>
      <img
        :src="TrophyGif"
        alt="Trophy Animation"
        class="w-12 h-12 p-1 z-[11]"
      />
    </div>

    <!-- Timer Display -->
    <div
      class="mt-[-12px] w-14 py-1 bg-white rounded-xl shadow-md text-black text-center text-xs z-[10]"
    >
      {{ timeLeft }}
    </div>
  </div>
</template>
