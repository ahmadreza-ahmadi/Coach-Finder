<script setup>
import { ref, reactive } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const formData = reactive({
  email: {
    value: '',
    isValid: true
  },
  message: {
    value: '',
    isValid: true
  }
})
const formIsValid = ref(true)

const validateInput = (input) => {
  const selectedInput = formData[input]

  selectedInput.isValid = true

  if (!selectedInput.value) {
    formIsValid.value = false
    selectedInput.isValid = false
  } else if (input === 'email') {
    const VALID_EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!selectedInput.value.match(VALID_EMAIL_REGEX)) {
      selectedInput.isValid = false
      formIsValid.value = false
    }
  }
}

const submitForm = () => {
  formIsValid.value = true
  for (const data in formData) {
    validateInput(data)
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="email">Your E-Mail</label>
      <input type="text" name="email" id="email" v-model.trim="formData.email.value" />
      <p v-if="!formData.email.isValid">* E-mail is not valid</p>
    </div>
    <div>
      <label for="meassage">Message</label>
      <textarea
        name="message"
        id="message"
        rows="5"
        v-model.trim="formData.message.value"></textarea>
    </div>
    <p v-if="!formIsValid">** Please fix the above errors and submit again. **</p>
    <div>
      <BaseButton>Send Message</BaseButton>
    </div>
  </form>
</template>
