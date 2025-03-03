import { createRouter, createWebHistory } from 'vue-router'
import MysteryBox from '@/views/MysteryBox.vue'

const routes = [{ path: '/', component: MysteryBox }]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
