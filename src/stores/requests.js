import { defineStore, storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

const { userId } = storeToRefs(authStore)

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([])

  const filteredRequests = computed(() => requests.value.filter((request) => request.userId === userId.value))

  const hasRequests = computed(() => {
    return filteredRequests.value && filteredRequests.value.length > 0
  })

  const addRequest = (requestData) => {
    const newRequest = {
      id: Date.now().toString(36),
      ...requestData
    }

    requests.value.unshift(newRequest)
  }

  return { requests, filteredRequests, hasRequests, addRequest }
})