import { defineStore } from "pinia";
import { ref } from "vue";

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([])

  const addRequest = (requestData) => {
    const newRequest = {
      id: Date.now().toString(36),
      ...requestData
    }

    requests.value.unshift(newRequest)
  }

  return { requests, addRequest }
})