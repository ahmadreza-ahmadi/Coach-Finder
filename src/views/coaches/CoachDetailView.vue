<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCoachesStore } from '@/stores/coaches'
import BaseContainer from '@/components/BaseContainer.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'

const props = defineProps(['id'])

const route = useRoute()
const { coaches } = storeToRefs(useCoachesStore())

const selectedCoach = computed(() => {
  return coaches.value.find((coach) => coach.id === props.id)
})

const { firstName, lastName, hourlyRate, description, areas } = selectedCoach.value

const fullName = computed(() => {
  return `${firstName} ${lastName}`
})

const contactLink = computed(() => {
  return `${route.path}/contact`
})
</script>

<template>
  <div>
    <section>
      <BaseContainer class="mb-6">
        <div class="flex items-center justify-between">
          <h2 class="text-3xl font-bold">{{ fullName }}</h2>
          <h3 class="text-2xl font-bold">${{ hourlyRate }}/hour</h3>
        </div>
      </BaseContainer>
    </section>
    <section>
      <BaseContainer>
        <div class="flex gap-2 mb-4">
          <BaseBadge v-for="area in areas" :key="area" :type="area" :text="area" />
        </div>
        <p>{{ description }}</p>
      </BaseContainer>
    </section>
    <section>
      <BaseContainer>
        <header class="flex flex-col items-center">
          <h2 class="text-xl mb-2">Interested? Reach out now!</h2>
          <BaseButton type="router-link" :to="contactLink" class="w-fit">Contact</BaseButton>
        </header>
        <RouterView />
      </BaseContainer>
    </section>
  </div>
</template>
