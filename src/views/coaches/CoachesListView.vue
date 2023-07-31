<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCoachesStore } from '../../stores/coaches'
import CoachItem from '@/components/CoachItem.vue'

const { coaches } = storeToRefs(useCoachesStore())

const filteredCoaches = computed(() => {
  return coaches.value
})
</script>

<template>
  <section class="max-w-screen-md mx-auto">FILTER</section>
  <section class="max-w-screen-md mx-auto">
    <div>
      <button>Refresh</button>
      <RouterLink to="/register">Register as Coach</RouterLink>
    </div>
    <ul v-if="filteredCoaches.length" class="flex flex-col gap-6">
      <CoachItem v-for="coach in filteredCoaches" :key="coach.id" :coach="coach" />
    </ul>
    <p v-else>No coach found!</p>
  </section>
</template>
