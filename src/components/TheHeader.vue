<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

const authStore = useAuthStore()

const routerLinkClass = computed(() => {
  return 'relative inline-block transition-all before:transition-all before:content-[""] before:absolute before:opacity-0 before:h-[3px] before:left-0 before:right-0 before:max-w-[40px] before:-bottom-[6px] before:rounded-full before:mx-auto'
})

const routerLinkActiveClass = computed(() => {
  return 'before:bg-blue-500 before:opacity-100 -translate-y-1'
})

const logout = () => {
  authStore.logout()
  router.replace('/coaches')
}
</script>

<template>
  <header class="p-5 bg-blue-50 border-b border-b-blue-300 mb-8">
    <nav class="flex items-center justify-between gap-4 max-w-screen-md mx-auto rounded-full">
      <h1 class="text-2xl font-bold"><RouterLink to="/">Find a Coach</RouterLink></h1>
      <ul class="flex items-center gap-5">
        <li>
          <RouterLink to="/coaches" :class="routerLinkClass" :active-class="routerLinkActiveClass"
            >All Coaches</RouterLink
          >
        </li>
        <li v-if="authStore.isAuthenticated">
          <RouterLink to="/requests" :class="routerLinkClass" :active-class="routerLinkActiveClass"
            >Requests</RouterLink
          >
        </li>
        <li v-else>
          <RouterLink to="/auth" :class="routerLinkClass" :active-class="routerLinkActiveClass">
            Login
          </RouterLink>
        </li>
        <li v-if="authStore.isAuthenticated">
          <BaseButton @click="logout">Logout</BaseButton>
        </li>
      </ul>
    </nav>
  </header>
</template>
