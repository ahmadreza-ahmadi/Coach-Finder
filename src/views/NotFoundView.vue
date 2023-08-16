<script setup>
import { RouterLink } from 'vue-router'
import BaseContainer from '@/components/BaseContainer.vue'
</script>

<template>
  <BaseContainer>
    <section class="text-center">
      <h2 class="text-3xl font-bold mb-3">Page not found</h2>
      <p class="text-lg">
        This page could not be found. Maybe check out all our
        <RouterLink to="/coaches" class="text-blue-500">coaches</RouterLink>.
      </p>
    </section>
  </BaseContainer>
</template>
