<script setup>
import { storeToRefs } from 'pinia'
import { useRequestsStore } from '@/stores/requests'
import BaseContainer from '@/components/BaseContainer.vue'
import RequestItem from '@/components/RequestItem.vue'

const requestsStore = useRequestsStore()
const { requests, hasRequests } = storeToRefs(requestsStore)
</script>

<template>
  <section>
    <BaseContainer>
      <header class="text-center">
        <h2 class="text-3xl font-bold">Requests Recieved</h2>
      </header>
      <ul v-if="hasRequests">
        <RequestItem v-for="request in requests" :key="request.id" :request="request" />
      </ul>
      <h3 v-else>You haven't recieved any requests yet!</h3>
    </BaseContainer>
  </section>
</template>
