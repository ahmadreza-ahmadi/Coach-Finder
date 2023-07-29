<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const routerLinkClass = computed(() => {
  return 'border border-transparent transition-all duration-500'
})

const routerLinkActiveClass = computed(() => {
  return 'inline-block border-b-blue-400 -translate-y-1'
})
</script>

<template>
  <header class="p-5 bg-blue-50 border-b border-b-blue-300">
    <nav class="flex items-center justify-between gap-4 max-w-screen-md mx-auto">
      <h1 class="text-2xl font-bold"><RouterLink to="/">Find a Coach</RouterLink></h1>
      <ul class="flex items-center gap-5">
        <li>
          <RouterLink to="/coaches" :class="routerLinkClass" :active-class="routerLinkActiveClass"
            >All Coaches</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/requests" :class="routerLinkClass" :active-class="routerLinkActiveClass"
            >Requests</RouterLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
