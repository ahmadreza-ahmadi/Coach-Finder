<script setup>
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import BaseContainer from '@/components/BaseContainer.vue'
import BaseButton from '@/components/BaseButton.vue'

const authStore = useAuthStore()

const mode = ref('login')
const errorMessage = ref(null)
const formData = reactive({
  email: '',
  password: ''
})

const submitButtonCaption = computed(() => {
  if (mode.value === 'login') return 'Login'
  return 'Signup'
})

const switchModeButtonCaption = computed(() => {
  if (mode.value === 'login') return 'Signup instead'
  return 'Login instead'
})

const switchAuthMode = () => {
  if (mode.value === 'login') mode.value = 'signup'
  else mode.value = 'login'
}

const submitForm = async () => {
  try {
    if (mode.value === 'login') {
      // ...
    } else {
      await authStore.signup({
        email: formData.email,
        password: formData.password
      })
    }
  } catch (error) {
    errorMessage.value = error
  }
}
</script>

<template>
  <BaseContainer>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">E-Mail</label>
        <input v-model.trim="formData.email" type="email" autocomplete="username" id="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          v-model.trim="formData.password"
          type="password"
          autocomplete="current-password"
          id="password" />
      </div>
      <BaseButton type="submit">{{ submitButtonCaption }}</BaseButton>
      <BaseButton type="button" @click="switchAuthMode">{{ switchModeButtonCaption }}</BaseButton>
    </form>
    <p>Email: {{ formData.email }}</p>
    <p>Password: {{ formData.password }}</p>
    <p class="text-red-500">{{ errorMessage }}</p>
  </BaseContainer>
</template>
