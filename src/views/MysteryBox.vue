<script setup lang="ts">
import { ref, watch } from 'vue'
import CountDownTimer from '../components/CountDownTimer.vue'
import BoxItem from '../components/BoxItem.vue'
import PurchaseModal from '../components/PurchaseModal.vue'
import TrophyModal from '../components/TrophyModal.vue'
import GreenBoxGif from '../assets/animations/green_box.gif'
import RedBoxGif from '../assets/animations/red_box.gif'
import YellowBoxGif from '../assets/animations/yellow_box.gif'
import { useLocalStorage } from '../composables/useLocalStorage.ts'

// Define initial boxes data
const initialBoxes = [
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
]

// Use useLocalStorage to persist box counts
const boxCounts = useLocalStorage<{ id: string; count: number }[]>(
  'boxCounts',
  initialBoxes.map((box) => ({ id: box.id, count: box.count }))
)

const boxes = ref([...initialBoxes])
const showPurchaseModal = ref(false)
const showTrophyModal = ref(false)

watch(
  boxCounts,
  (newBoxCounts) => {
    boxes.value = initialBoxes.map((box) => {
      const updatedBox = newBoxCounts.find((b) => b.id === box.id)
      return updatedBox ? { ...box, count: updatedBox.count } : { ...box }
    })
  },
  { deep: true }
)

const handleBuyBox = (boxId: string) => {
  const box = boxCounts.value.find((b) => b.id === boxId)
  if (box) {
    box.count += 1
  }
  showPurchaseModal.value = true
}

const handleOpenBox = (boxId: string) => {
  const box = boxCounts.value.find((b) => b.id === boxId)
  if (box && box.count > 0) {
    box.count -= 1
  }
}
</script>

<template>
  <div
    class="relative min-h-screen bg-black text-white px-4 py-6 overflow-hidden"
  >
    <div class="absolute inset-0">
      <div
        class="absolute top-[-100px] left-[-120px] w-[500px] h-[250px] bg-[#dd4545] blur-[53px] max-w-full"
      ></div>
      <div
        class="absolute top-[-50px] right-[-60px] w-[200px] h-[180px] bg-[#7B7BFF] blur-[53px] max-w-full"
      ></div>
    </div>

    <div class="relative text-center mb-6 z-10">
      <h1 class="text-2xl font-bold">MYSTERY BOXES</h1>
      <p class="text-sm text-400 opacity-70">
        Unlock surprises that boost your journey
      </p>
      <CountDownTimer @click="showTrophyModal = true" />
    </div>

    <div class="relative space-y-4 z-10">
      <BoxItem
        v-for="box in boxes"
        :key="box.id"
        :box="box"
        @buy="handleBuyBox(box.id)"
        @open="handleOpenBox(box.id)"
      />
    </div>

    <!-- Success Modal for Purchasing a Box -->
    <PurchaseModal
      :show="showPurchaseModal"
      @close="showPurchaseModal = false"
    />
    <TrophyModal v-if="showTrophyModal" @close="showTrophyModal = false" />
  </div>
</template>
