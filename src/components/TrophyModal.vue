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

// Dummy leaderboard data
const leaderboard = ref([
  {
    id: 1,
    name: 'Alice',
    score: 1200,
    image: profile,
    ribbon: firstPlace,
  },
  {
    id: 2,
    name: 'Bob',
    score: 1150,
    image: profile,
    ribbon: secondPlace,
  },
  {
    id: 3,
    name: 'Charlie',
    score: 980,
    image: profile,
    ribbon: thirdPlace,
  },
  {
    id: 4,
    name: 'Dave',
    score: 900,
    image: profile,
    ribbon: '',
  },
  {
    id: 5,
    name: 'Dave',
    score: 900,
    image: profile,
    ribbon: '',
  },
  {
    id: 6,
    name: 'Dave',
    score: 900,
    image: profile,
    ribbon: '',
  },
])

const filteredLeaderboard = computed(() => {
  return leaderboard.value // Placeholder for filtering logic if needed
})
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
  >
    <div
      class="relative w-[400px] bg-[#1E2D2F] rounded-xl p-6 shadow-xl border-2 border-green-500/30 backdrop-blur-md"
    >
      <img
        :src="trophyAnimation"
        alt="Trophy Animation"
        class="w-40 h-40 mx-auto relative mt-6 z-20"
      />

      <!-- Gradient Background -->
      <div
        class="absolute top-0 left-0 w-full h-40 rounded-t-xl bg-gradient-to-b from-[#8EB979] via-[#679A96] to-[#466B78] z-10"
      ></div>

      <!-- Image Above Modal -->
      <img
        :src="memeCoinHeader"
        alt="Trophy Icon"
        class="absolute top-[-110px] left-1/2 transform -translate-x-1/2 w-50 h-50 z-1"
      />

      <img
        :src="stars"
        alt="Stars"
        class="absolute top-[-80px] left-1/2 transform -translate-x-1/2 w-50 h-50 z-10"
      />

      <!-- Box Challenge Text -->
      <h2 class="text-center text-xl font-bold text-white mt-4">
        Box Challenge
      </h2>

      <!-- Check if you won button -->
      <button
        class="mt-4 bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg w-full hover:bg-yellow-600"
      >
        CHECK IF YOU WON
      </button>

      <!-- Daily / All-time Toggle -->
      <div class="flex justify-between items-center mt-4 text-white">
        <div class="flex space-x-4">
          <button
            :class="[
              'px-4 py-1 rounded-lg font-bold',
              selectedFilter === 'daily'
                ? 'bg-green-500 text-black'
                : 'bg-gray-700',
            ]"
            @click="selectedFilter = 'daily'"
          >
            Daily
          </button>
          <button
            :class="[
              'px-4 py-1 rounded-lg font-bold',
              selectedFilter === 'all-time'
                ? 'bg-green-500 text-black'
                : 'bg-gray-700',
            ]"
            @click="selectedFilter = 'all-time'"
          >
            All-time
          </button>
        </div>

        <span class="text-sm opacity-80">Resets in {{ countdown }}</span>
      </div>

      <!-- Leaderboard -->
      <div class="mt-4 bg-gray-800 p-4 rounded-lg max-h-60 overflow-y-auto">
        <div
          v-for="user in filteredLeaderboard"
          :key="user.id"
          class="flex justify-between items-center p-2 border-b border-gray-700"
        >
          <!-- Placement Number -->
          <span class="text-lg font-bold text-white">{{ user.id }}</span>

          <!-- Profile Picture and Name -->
          <div class="flex items-center space-x-3">
            <img
              :src="user.image"
              class="w-10 h-10 rounded-full border-2 border-gray-500"
            />
            <span class="text-white font-medium">{{ user.name }}</span>
          </div>

          <!-- Ribbon -->
          <span v-if="user.ribbon" class="text-yellow-400">
            <img :src="user.ribbon" alt="Badge" class="w-8 h-8" />
          </span>

          <!-- Score -->
          <span class="text-white font-semibold">{{ user.score }}</span>
        </div>
      </div>

      <!-- Close Button -->
      <button
        @click="emit('close')"
        class="mt-4 w-full py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
      >
        Close
      </button>
    </div>
  </div>
</template>
