<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <TheHeader />

  <RouterView />
</template>

<style>
body {
  font-family: Inter, 'sans-serif';
}
</style>
