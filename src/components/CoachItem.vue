<script setup>
import { computed, toRefs } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps(['coach'])

const route = useRoute()
console.log(route)

const { id, firstName, lastName, areas, description, hourlyRate } = toRefs(props.coach)

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
const coachContactLink = computed(() => {
  return `${route.path}/${id.value}/contact`
})
const coachDetailsLink = computed(() => {
  return `${route.path}/${id.value}`
})
</script>

<template>
  <li class="flex flex-col gap-4 border-2 border-blue-300 rounded-2xl p-6">
    <div class="flex justify-between">
      <h3 class="text-2xl font-bold">{{ fullName }}</h3>
      <h4 class="text-xl font-bold">${{ hourlyRate }}/hour</h4>
    </div>
    <h5>{{ description }}</h5>
    <div class="flex gap-4">
      <span v-for="area in areas" :key="area">{{ area }}</span>
    </div>
    <div class="flex gap-4">
      <RouterLink :to="coachContactLink">Contact</RouterLink>
      <RouterLink :to="coachDetailsLink">View Details</RouterLink>
    </div>
  </li>
</template>
