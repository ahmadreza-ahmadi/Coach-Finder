<script setup>
import { reactive } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
const formData = reactive({
  firstName: '',
  lastName: '',
  description: '',
  rate: null,
  areas: []
})

const submitFrom = () => {
  const coachData = { ...formData }

  console.log(coachData)
}
</script>

<template>
  <form @submit.prevent="submitFrom">
    <div>
      <label for="first-name">First Name</label>
      <input type="text" id="first-name" v-model.trim="formData.firstName" />
    </div>
    <div>
      <label for="last-name">Last Name</label>
      <input type="text" id="last-name" v-model.trim="formData.lastName" />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="formData.description" />
    </div>
    <div>
      <label for="hourly-rate">Hourly Rate</label>
      <input type="number" id="hourly-rate" v-model.number="formData.rate" />
    </div>
    <div>
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="formData.areas" />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="formData.areas" />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="formData.areas" />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <BaseButton>Register</BaseButton>
  </form>
</template>
