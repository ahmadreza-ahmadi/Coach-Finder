<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String,
  text: {
    type: String,
    required: true
  }
})

const BASE_CLASS = 'text-sm rounded-lg px-3 py-[6px] capitalize'

const AREA_CLASS = {
  default: 'bg-blue-600 text-white',
  frontend: 'bg-indigo-600 text-white',
  backend: 'bg-emerald-600 text-white',
  career: 'bg-orange-600 text-white'
}

const finalClass = computed(() => {
  return [BASE_CLASS, AREA_CLASS[props.type] || AREA_CLASS['default']]
})

const modifiedText = computed(() => {
  return props.text.toUpperCase()
})
</script>

<template>
  <span :class="finalClass">{{ modifiedText }}</span>
</template>
