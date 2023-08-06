<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  request: Object
})

const { email, message } = toRefs(props.request)

const emailLink = computed(() => {
  return `mailto:${email.value}`
})
</script>

<template>
  <li>
    <div>
      <a :href="emailLink">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
  </li>
</template>
