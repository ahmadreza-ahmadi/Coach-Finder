<script setup>
import { useRouter } from 'vue-router'
import { useCoachesStore } from '@/stores/coaches'
import BaseContainer from '@/components/BaseContainer.vue'
import CoachForm from '@/components/CoachForm.vue'

const router = useRouter()
const coachesStore = useCoachesStore()

const saveData = (coachData) => {
  coachesStore.registerCoach(coachData)
  router.replace('/')
}
</script>

<template>
  <BaseContainer>
    <section>
      <h2 class="text-3xl mx-auto text-center font-bold mb-6">Register as a coach now!</h2>
      <CoachForm @save-data="saveData" />
    </section>
  </BaseContainer>
</template>
