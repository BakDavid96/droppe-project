<script setup lang="ts">
import TrophyGif from '@/assets/animations/trophy_jump.gif'
import { useDayCountDown } from '../composables/useDayCountDown'

const timeLeft = useDayCountDown()
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
