<script setup lang="ts">
import { ref, computed } from 'vue'
import trophyAnimation from '../assets/animations/trophy_jump.gif'
import firstPlace from '../assets/animations/first_place.gif'
import secondPlace from '../assets/animations/second_place.gif'
import thirdPlace from '../assets/animations/third_place.gif'
import memeCoinHeader from '../assets/images/meme_coin_header.png'
import stars from '../assets/images/stars.png'
import profile from '../assets/images/profile.png'
import { useDayCountDown } from '../composables/useDayCountDown'

const emit = defineEmits(['close'])

const selectedFilter = ref<'daily' | 'all-time'>('daily')
const countdown = useDayCountDown()

const leaderboard = ref([
  { id: 1, name: 'Alice', score: 1200, image: profile, ribbon: firstPlace },
  { id: 2, name: 'Bob', score: 1150, image: profile, ribbon: secondPlace },
  { id: 3, name: 'Charlie', score: 980, image: profile, ribbon: thirdPlace },
  { id: 4, name: 'Dave', score: 900, image: profile, ribbon: '' },
  { id: 5, name: 'Eve', score: 870, image: profile, ribbon: '' },
  {
    id: 6,
    name: 'Cickany David',
    score: 860,
    image: profile,
    ribbon: '',
    selected: true,
  },
  { id: 7, name: 'Frank', score: 850, image: profile, ribbon: '' },
])

const filteredLeaderboard = computed(() => leaderboard.value)
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10"
  >
    <div
      class="relative w-[90vw] h-[70vh] bg-black rounded-xl p-6 shadow-xl border-2 border-green-500/30 backdrop-blur-md"
    >
      <!-- Close Button (Top Right) -->
      <button
        @click="emit('close')"
        class="absolute top-0 right-0 text-white bg-[#FF0000] text-lg font-bold rounded-full w-6 h-6 flex items-center justify-center z-10"
      >
        x
      </button>
      <!-- Trophy Animation (Moved Up) -->
      <img
        :src="trophyAnimation"
        alt="Trophy Animation"
        class="w-[9em] h-[9em] mx-auto absolute -top-16 left-1/2 transform -translate-x-1/2 z-20"
      />

      <!-- Gradient Background (Fading Bottom) -->
      <div
        class="absolute top-0 left-0 w-full h-40 rounded-t-xl bg-gradient-to-b from-[#8EB979] via-[#679A96] to-transparent"
      ></div>

      <!-- Meme Image & Stars -->
      <img
        :src="memeCoinHeader"
        alt="Meme Coin Header"
        class="absolute top-[-80px] left-1/2 transform -translate-x-1/2 w-80 z-[-10]"
      />
      <img
        :src="stars"
        alt="Stars"
        class="absolute top-[-60px] left-1/2 transform -translate-x-1/2 w-44 z-10"
      />

      <!-- Leaderboard -->
      <div class="mt-4 bg-black rounded-lg h-full overflow-y-auto">
        <!-- Title -->
        <h2 class="text-center text-xl font-bold text-white mt-12 relative">
          Box Challenge
        </h2>

        <!-- Check If You Won Button -->
        <button
          class="mt-4 text-black py-2 px-6 rounded-lg w-full relative"
          style="
            background: linear-gradient(
              90deg,
              #fff246 0%,
              #e5b80b 37%,
              #fff571 68.5%,
              #e5b80b 100%
            );
          "
        >
          CHECK IF YOU WON
        </button>

        <!-- Daily / All-Time Toggle -->
        <div class="flex mt-4 text-white">
          <button
            :class="[
              'w-1/2 py-2 text-center rounded-l-lg',
              selectedFilter === 'daily'
                ? 'bg-[#3A3A3C] text-[#FFFEF9]'
                : 'bg-[#1C1C1E] text-white',
            ]"
            @click="selectedFilter = 'daily'"
          >
            Daily
          </button>
          <button
            :class="[
              'w-1/2 py-2 text-center rounded-r-lg',
              selectedFilter === 'all-time'
                ? 'bg-[#3A3A3C] text-[#FFFEF9]'
                : 'bg-[#1C1C1E] text-white',
            ]"
            @click="selectedFilter = 'all-time'"
          >
            All-time
          </button>
        </div>

        <!-- Countdown Timer (Below Buttons, Green Text) -->
        <div class="text-center text-[#BBEE53] text-sm mt-2 mb-2 float-right">
          Resets in {{ countdown }}
        </div>
        <br />
        <div
          v-for="user in filteredLeaderboard"
          :key="user.id"
          :class="[
            'flex items-center p-1 w-full  border-[1px] bg-[#1C1C1E] rounded-lg mt-3',
            user?.selected ? 'border-[#BBEE53]' : 'border-[#1C1C1E]',
          ]"
        >
          <!-- Placement Number -->
          <span class="text-lg font-bold text-white w-6 pr-2 text-center">{{
            `${user.id}.`
          }}</span>

          <!-- Profile Image & Name (Shifted Left) -->
          <div class="flex items-center space-x-3 flex-1">
            <img
              :src="user.image"
              class="w-6 h-6 rounded-full border-2 border-gray-500"
            />
            <span class="text-white font-medium">{{ user.name }}</span>
            <span v-if="user.ribbon">
              <img :src="user.ribbon" alt="Badge" class="w-6 h-6" />
            </span>
          </div>

          <!-- Score -->
          <span class="text-white w-12 text-right">{{ user.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
