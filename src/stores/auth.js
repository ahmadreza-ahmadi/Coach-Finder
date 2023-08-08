import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {
  const coachId = ref(null)

  const setCoachId = (id) => {
    coachId.value = id
  }

  return { coachId, setCoachId }
})