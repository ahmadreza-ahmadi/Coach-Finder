import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([])

  const hasRequests = computed(() => {
    return requests.value && requests.value.length > 0
  })

  const addRequest = (requestData) => {
    const newRequest = {
      id: Date.now().toString(36),
      ...requestData
    }

    requests.value.unshift(newRequest)
  }

  return { requests, hasRequests, addRequest }
})