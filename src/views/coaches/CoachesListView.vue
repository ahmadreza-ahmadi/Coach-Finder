<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCoachesStore } from '../../stores/coaches'

const { coaches } = storeToRefs(useCoachesStore())

const filteredCoaches = computed(() => {
  return coaches.value
})
</script>

<template>
  <section>FILTER</section>
  <section>
    <div>
      <button>Refresh</button>
      <RouterLink to="/register">Register as Coach</RouterLink>
    </div>
    <ul v-if="filteredCoaches.length">
      <li v-for="coach in filteredCoaches" :key="coach.id">
        <p>{{ coach.firstName }}</p>
      </li>
    </ul>
    <p v-else>No coach found!</p>
  </section>
</template>
