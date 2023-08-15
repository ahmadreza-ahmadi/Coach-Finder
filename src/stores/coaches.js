import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

export const useCoachesStore = defineStore('coaches', () => {
  const userId = ref(authStore.userId)
  const coaches = ref([
    {
      id: 'c1',
      firstName: 'Maximilian',
      lastName: 'Schwarzmüller',
      areas: ['frontend', 'backend', 'career'],
      description:
        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
      hourlyRate: 30
    },
    {
      id: 'c2',
      firstName: 'Julie',
      lastName: 'Jones',
      areas: ['frontend', 'career'],
      description:
        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
      hourlyRate: 30
    }
  ])

  const hasCoaches = computed(() => {
    return coaches.value && coaches.value
  })

  const registerCoach = async (coachData) => {
    const newCoach = {
      ...coachData
    }

    const response = await axios.put(`https://vue-http-demo-f1200-default-rtdb.firebaseio.com/coaches/${userId.value}.json`, newCoach)

    if (response.statusText !== "OK") {
      // Error handling
    }

    coaches.value.unshift(newCoach)
  }

  return { coaches, hasCoaches, registerCoach }
})
