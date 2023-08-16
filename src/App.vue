<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <TheHeader />

  <RouterView v-slot="{ Component }">
    <Transition name="route" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
</template>

<style>
body {
  font-family: Inter, 'sans-serif';
}

.route-enter-active,
.route-leave-active {
  transition: all 200ms ease-in;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-from {
  transform: translateY(-30px);
}

.route-leave-to {
  transform: translateY(30px);
}
</style>
