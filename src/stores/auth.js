import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {
  const userId = ref('1')

  return { userId }
})