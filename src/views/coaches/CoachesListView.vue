<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCoachesStore } from '@/stores/coaches'
import { useAuthStore } from '@/stores/auth'
import CoachFilter from '@/components/CoachFilter.vue'
import BaseContainer from '@/components/BaseContainer.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import CoachItem from '@/components/CoachItem.vue'

const coachesStore = useCoachesStore()
const authStore = useAuthStore()

const { coaches, dataIsLoading, dataIsSending } = storeToRefs(coachesStore)
const { isAuthenticated } = storeToRefs(authStore)

const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true
})

const loadCoaches = async (refresh = false) => {
  try {
    await coachesStore.loadCoaches(refresh)
  } catch (error) {
    alert(error.message || 'Something went wrong.')
  }
}

onMounted(() => {
  loadCoaches()
})

watch(dataIsSending, () => {
  loadCoaches(true)
})

const filteredCoaches = computed(() => {
  return coaches.value.filter((coach) => {
    if (activeFilters.value.frontend && coach.areas.includes('frontend')) {
      return true
    }
    if (activeFilters.value.backend && coach.areas.includes('backend')) {
      return true
    }
    if (activeFilters.value.career && coach.areas.includes('career')) {
      return true
    }
    return false
  })
})

const setFilters = (updatedFilters) => {
  activeFilters.value = updatedFilters
}
</script>

<template>
  <div>
    <section>
      <BaseContainer>
        <CoachFilter @change-filter="(updatedFilters) => setFilters(updatedFilters)" />
      </BaseContainer>
    </section>
    <section>
      <BaseContainer>
        <div class="flex items-center justify-between mb-4">
          <BaseButton mode="outline" @click="loadCoaches(true)">Refresh</BaseButton>
          <BaseButton v-if="!isAuthenticated" type="router-link" to="/auth?redirect=register"
            >Login to Register as a coach</BaseButton
          >
          <BaseButton v-if="!dataIsLoading && isAuthenticated" type="router-link" to="/register"
            >Register as Coach</BaseButton
          >
        </div>
        <BaseSpinner v-if="dataIsLoading || dataIsSending" />
        <ul v-else-if="filteredCoaches.length" class="flex flex-col gap-6">
          <CoachItem v-for="coach in filteredCoaches" :key="coach.id" :coach="coach" />
        </ul>
        <p v-else>No coach found!</p>
      </BaseContainer>
    </section>
  </div>
</template>
