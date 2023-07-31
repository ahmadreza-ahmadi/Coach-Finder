<script setup>
import { computed, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from './BaseButton.vue'
import BaseBadge from './BaseBadge.vue'

const props = defineProps(['coach'])

const route = useRoute()

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
    <div class="flex gap-2">
      <BaseBadge v-for="area in areas" :key="area" :type="area" :text="area"></BaseBadge>
    </div>
    <div class="flex gap-4">
      <BaseButton type="router-link" :to="coachContactLink">Contact</BaseButton>
      <BaseButton type="router-link" :to="coachDetailsLink" mode="outline">View Details</BaseButton>
    </div>
  </li>
</template>
