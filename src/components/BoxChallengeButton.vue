<script setup>
import { ref, onMounted } from 'vue'
import lottie from 'lottie-web'
import animationData from '../assets/animations/delivery-box-close.json'

const container = ref(null)

onMounted(() => {
  lottie.loadAnimation({
    container: container.value,
    animationData,
    renderer: 'svg',
    loop: true,
    autoplay: true,
  })
})
</script>

<template>
  <div ref="container" class="w-20 h-20"></div>
</template>
