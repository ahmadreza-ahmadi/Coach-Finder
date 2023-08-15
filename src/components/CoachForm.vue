<script setup>
import { ref, reactive } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const emit = defineEmits(['save-data'])

const formData = reactive({
  firstName: {
    value: '',
    isValid: true
  },
  lastName: {
    value: '',
    isValid: true
  },
  description: {
    value: '',
    isValid: true
  },
  hourlyRate: {
    value: null,
    isValid: true
  },
  areas: {
    value: [],
    isValid: true
  }
})
const formIsValid = ref(true)

const validateForm = () => {
  formIsValid.value = true
  for (const data in formData) {
    validateInput(data)
  }
}

const validateInput = (input) => {
  const selectedInput = formData[input]
  selectedInput.isValid = true

  if (!selectedInput.value) {
    formIsValid.value = false
    selectedInput.isValid = false
  } else {
    if (input === 'hourlyRate' && selectedInput.value < 0) selectedInput.isValid = false
    else if (input === 'areas' && selectedInput.value.length === 0) selectedInput.isValid = false
  }
}

const submitFrom = () => {
  validateForm()

  if (!formIsValid.value) {
    return
  }

  const newCoach = {
    firstName: formData.firstName.value,
    lastName: formData.lastName.value,
    description: formData.description.value,
    hourlyRate: formData.hourlyRate.value,
    areas: formData.areas.value
  }

  emit('save-data', newCoach)
}
</script>

<template>
  <form @submit.prevent="submitFrom" class="flex flex-col gap-4">
    <div class="flex gap-4">
      <div :class="{ invalid: !formData.firstName.isValid }" class="input-container flex-1">
        <label for="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          v-model.trim="formData.firstName.value"
          class="input-field"
          placeholder="Enter your first name"
          @blur="validateInput('firstName')"
          @input="validateInput('firstName')" />
        <Transition>
          <p class="h-6 mt-2 text-red-500" v-if="!formData.firstName.isValid">
            * First name must not be empty.
          </p>
        </Transition>
      </div>
      <div :class="{ invalid: !formData.lastName.isValid }" class="input-container flex-1">
        <label for="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          v-model.trim="formData.lastName.value"
          class="input-field"
          placeholder="Enter your last name"
          @blur="validateInput('lastName')"
          @input="validateInput('lastName')" />
        <Transition>
          <p class="h-6 mt-2 text-red-500" v-if="!formData.lastName.isValid">
            * Last name must not be empty.
          </p>
        </Transition>
      </div>
    </div>
    <div :class="{ invalid: !formData.description.isValid }" class="input-container">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="formData.description.value"
        class="input-field"
        placeholder="Descripton..."
        @blur="validateInput('description')"
        @input="validateInput('description')" />
      <Transition>
        <p class="h-6 mt-2 text-red-500" v-if="!formData.description.isValid">
          * Description name must not be empty.
        </p>
      </Transition>
    </div>
    <div :class="{ invalid: !formData.hourlyRate.isValid }" class="input-container">
      <label for="hourly-rate">Hourly Rate</label>
      <input
        type="number"
        id="hourly-rate"
        v-model.number="formData.hourlyRate.value"
        class="input-field"
        placeholder="Enter your hourly rate"
        @blur="validateInput('hourlyRate')"
        @input="validateInput('hourlyRate')" />
      <Transition>
        <p class="h-6 mt-2 text-red-500" v-if="!formData.hourlyRate.isValid">
          * Hourly rate name must not be empty.
        </p>
      </Transition>
    </div>
    <div :class="{ invalid: !formData.areas.isValid }" class="input-container">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="formData.areas.value"
          class="input-field mr-2"
          @blur="validateInput('areas')"
          @change="validateInput('areas')" />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="formData.areas.value"
          class="input-field mr-2"
          @blur="validateInput('areas')"
          @change="validateInput('areas')" />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="formData.areas.value"
          class="input-field mr-2"
          @blur="validateInput('areas')"
          @change="validateInput('areas')" />
        <label for="career">Career Advisory</label>
      </div>
      <Transition>
        <p class="h-6 mt-2 text-red-500" v-if="!formData.areas.isValid">
          * At least one expertise must be selected.
        </p>
      </Transition>
    </div>
    <Transition>
      <p class="h-6 text-red-500" v-if="!formIsValid">
        ** Please fix the above errors and submit again. **
      </p>
    </Transition>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
}

.input-field {
  padding: 0.5rem 1rem;
  border: 2px solid #60a5fa;
  border-radius: 0.5rem;
}

.input-container label {
  margin-bottom: 0.25rem;
}

.input-field:focus {
  outline: none;
}

.invalid input,
.invalid textarea {
  border-color: #ff4545;
}

.invalid > h3 {
  color: #ff4545;
}

.v-enter-from,
.v-leave-to {
  height: 0;
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 50ms ease-out;
}
</style>
