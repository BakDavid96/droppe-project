import { ref, onMounted, onUnmounted } from 'vue'

export const useDayCountDown = () => {
  const countdown = ref('')

  const updateCountdown = () => {
    const now = new Date()
    const midnight = new Date()
    midnight.setHours(23, 59, 59, 999)

    const diff = midnight.getTime() - now.getTime() // Time difference in ms

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0')
    const minutes = String(
      Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, '0')
    const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(
      2,
      '0'
    )

    countdown.value = `${hours}:${minutes}:${seconds}`
  }

  onMounted(() => {
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000) // Update every second

    onUnmounted(() => clearInterval(interval)) // Cleanup on unmount
  })

  return countdown
}
