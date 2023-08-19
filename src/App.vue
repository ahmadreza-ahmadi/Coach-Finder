<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import TheHeader from '@/components/TheHeader.vue'

const router = useRouter()

const authStore = useAuthStore()
const { didAutoLogout } = storeToRefs(authStore)

authStore.autoLogin()

watch(didAutoLogout, (newValue, oldValue) => {
  if (newValue && newValue !== oldValue) {
    router.replace('/coaches')
  }
})
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
