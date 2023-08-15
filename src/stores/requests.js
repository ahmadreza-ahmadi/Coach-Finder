import { defineStore, storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useAuthStore } from '@/stores/auth.js'
import axios from "axios";

const authStore = useAuthStore()

const { userId } = storeToRefs(authStore)

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([])

  const filteredRequests = computed(() => requests.value.filter((request) => request.userId === userId.value))

  const hasRequests = computed(() => {
    return requests.value && requests.value.length > 0
  })

  const addRequest = async (requestData) => {
    const newRequest = {
      email: requestData.email,
      message: requestData.message
    }

    const response = await axios.post(`https://vue-http-demo-f1200-default-rtdb.firebaseio.com/requests/${requestData.coachId}.json`, newRequest)
    const responseData = await response.data

    if (response.statusText !== 'OK') {
      // Error handling
    }

    newRequest.id = responseData.name
    newRequest.coachId = requestData.coachId

    requests.value.unshift(newRequest)
  }

  const setRequests = (requestList) => {
    requests.value = requestList
  }

  const fetchRequests = async () => {
    const response = await axios.get(`https://vue-http-demo-f1200-default-rtdb.firebaseio.com/requests/${userId.value}.json`)
    const responseData = await response.data

    if (response.statusText !== 'OK') {
      // Error
    }

    const formattedRequests = []
    for (const key in responseData) {
      const request = {
        coachId: userId,
        id: key,
        email: responseData[key].email,
        message: responseData[key].message
      }
      formattedRequests.push(request)
    }

    setRequests(formattedRequests)
  }

  return { requests, filteredRequests, hasRequests, addRequest, fetchRequests }
})