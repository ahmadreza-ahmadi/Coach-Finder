import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

export const useCoachesStore = defineStore('coaches', () => {
  const { userId, token } = storeToRefs(authStore)
  const coaches = ref([])
  const lastFetch = ref(null)
  const dataIsLoading = ref(false)
  const dataIsSending = ref(false)

  const hasCoaches = computed(() => {
    return coaches.value && coaches.value
  })

  const shouldUpdate = computed(() => {
    if (!lastFetch.value) {
      return true
    }

    const currentTimestamp = new Date().getTime()
    return (currentTimestamp - lastFetch.value) / 1000 > 60
  })

  const setCoaches = (coachesList) => {
    coaches.value = coachesList
  }

  const setFetchTimestamp = () => {
    lastFetch.value = new Date().getTime()
  }

  const loadCoaches = async (forceRefresh) => {
    if (!shouldUpdate.value && !forceRefresh) {
      return
    }

    dataIsLoading.value = true

    const response = await axios.get(
      `https://vue-http-demo-f1200-default-rtdb.firebaseio.com/coaches.json`
    )
    const responseData = await response.data

    if (response.statusText !== 'OK') {
      const error = new Error(responseData.message || 'Faild to fetch.')
      throw error
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

    setFetchTimestamp()

    dataIsLoading.value = false
  }

  const registerCoach = async (coachData) => {
    const newCoach = {
      ...coachData
    }

    dataIsSending.value = true
    const response = await axios.put(
      `https://vue-http-demo-f1200-default-rtdb.firebaseio.com/coaches/${userId.value}.json?auth=${token.value}`,
      newCoach
    )
    dataIsSending.value = false

    if (response.statusText !== 'OK') {
      console.log(response.data.message)
    }
  }

  return { coaches, dataIsLoading, dataIsSending, hasCoaches, registerCoach, loadCoaches }
})
