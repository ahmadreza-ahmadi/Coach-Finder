<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCoachesStore } from '../../stores/coaches'
import BaseContainer from '@/components/BaseContainer.vue'
import BaseButton from '../../components/BaseButton.vue'
import CoachItem from '@/components/CoachItem.vue'

const { coaches } = storeToRefs(useCoachesStore())

const filteredCoaches = computed(() => {
  return coaches.value
})
</script>

<template>
  <section>
    <BaseContainer>FILTER</BaseContainer>
  </section>
  <section>
    <BaseContainer>
      <div class="flex items-center justify-between mb-4">
        <BaseButton mode="outline">Refresh</BaseButton>
        <BaseButton type="router-link" to="/register">Register as Coach</BaseButton>
      </div>
      <ul v-if="filteredCoaches.length" class="flex flex-col gap-6">
        <CoachItem v-for="coach in filteredCoaches" :key="coach.id" :coach="coach" />
      </ul>
      <p v-else>No coach found!</p>
    </BaseContainer>
  </section>
</template>
