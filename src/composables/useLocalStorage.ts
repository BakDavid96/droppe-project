import { ref, watch } from 'vue'

// Define the return type for the composable
export function useLocalStorage<T>(key: string, defaultValue: T) {
  // Try to get the value from localStorage and parse it, or use the defaultValue
  const storedValue = localStorage.getItem(key)
  const value = ref<T>(storedValue ? JSON.parse(storedValue) : defaultValue)

  // Watch the value and update localStorage whenever it changes
  watch(
    value,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
  )

  return value
}
