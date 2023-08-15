import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

export const useCoachesStore = defineStore('coaches', () => {
  const userId = ref(authStore.userId)
  const coaches = ref([])

  const hasCoaches = computed(() => {
    return coaches.value && coaches.value
  })

  const setCoaches = (coachesList) => {
    coaches.value = coachesList
  }

  const loadCoaches = async () => {
    const response = await axios.get(`https://vue-http-demo-f1200-default-rtdb.firebaseio.com/coaches.json`)
    const responseData = await response.data

    if (response.statusText !== "OK") {
      // Error handling
    }

    const coaches = []
    for (const coachId in responseData) {
      const coach = {
        id: coachId,
        firstName: responseData[coachId].firstName,
        lastName: responseData[coachId].lastName,
        areas: responseData[coachId].areas,
        description: responseData[coachId].description,
        hourlyRate: responseData[coachId].hourlyRate
      }
      coaches.push(coach)
    }

    setCoaches(coaches)
  }

  const registerCoach = async (coachData) => {
    const newCoach = {
      ...coachData
    }

    const response = await axios.put(`https://vue-http-demo-f1200-default-rtdb.firebaseio.com/coaches/${userId.value}.json`, newCoach)

    if (response.statusText !== "OK") {
      // Error handling
    }
  }

  return { coaches, hasCoaches, registerCoach, loadCoaches }
})
