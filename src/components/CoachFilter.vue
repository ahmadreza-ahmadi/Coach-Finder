<script setup>
import { ref } from 'vue'
import BaseContainer from './BaseContainer.vue'

const emit = defineEmits(['changeFilter'])

const filters = ref({
  frontend: true,
  backend: true,
  career: true
})

const setFilter = (event) => {
  const inputId = event.target.id
  const isActive = event.target.checked
  const updatedFilters = {
    ...filters.value,
    [inputId]: isActive
  }
  filters.value = updatedFilters
  emit('changeFilter', updatedFilters)
}
</script>

<template>
  <BaseContainer>
    <h2 class="text-xl font-bold">Filter Your Coach</h2>
    <div class="flex gap-4">
      <span>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          checked
          @change="setFilter"
          class="mr-1" />
        <label for="frontend">Frontend</label>
      </span>
      <span>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          checked
          @change="setFilter"
          class="mr-1" />
        <label for="backend">Backend</label>
      </span>
      <span>
        <input type="checkbox" name="career" id="career" checked @change="setFilter" class="mr-1" />
        <label for="career">Career</label>
      </span>
    </div>
  </BaseContainer>
</template>
