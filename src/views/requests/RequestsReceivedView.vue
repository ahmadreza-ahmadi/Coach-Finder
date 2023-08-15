<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRequestsStore } from '@/stores/requests'
import BaseContainer from '@/components/BaseContainer.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import RequestItem from '@/components/RequestItem.vue'

const requestsStore = useRequestsStore()
const { requests, hasRequests } = storeToRefs(requestsStore)

const isLoading = ref(false)

const loadRequests = async () => {
  isLoading.value = true
  await requestsStore.fetchRequests()
  isLoading.value = false
}

onMounted(() => {
  loadRequests()
})
</script>

<template>
  <section>
    <BaseContainer>
      <header class="text-center">
        <h2 class="text-3xl font-bold">Requests Recieved</h2>
      </header>
      <BaseSpinner v-if="isLoading" />
      <ul v-else-if="hasRequests">
        <RequestItem v-for="request in requests" :key="request.id" :request="request" />
      </ul>
      <h3 v-else>You haven't recieved any requests yet!</h3>
    </BaseContainer>
  </section>
</template>
