import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const userId = ref(null)
  const token = ref(null)
  const tokenExpiration = ref(null)

  const setUser = (userData) => {
    userId.value = userData.userId
    token.value = userData.idToken
    tokenExpiration.value = userData.expiresIn
  }

  const login = async (userData) => {
    const newUser = {
      email: userData.email,
      password: userData.password,
      returnSecureToken: true
    }

    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD39nnJhZedW2OZuDFwqRMirDvh0AdEdYg`,
        newUser
      )
      const resData = await res.data
      console.log(resData)

      setUser(resData)
    } catch (error) {
      throw new Error(error.response.data.error.message)
    }
  }

  const signup = async (userData) => {
    const newUser = {
      email: userData.email,
      password: userData.password,
      returnSecureToken: true
    }

    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD39nnJhZedW2OZuDFwqRMirDvh0AdEdYg`,
        newUser
      )
      const resData = await res.data

      setUser(resData)
    } catch (error) {
      throw new Error(error.response.data.error.message)
    }
  }

  return { userId, login, signup }
})
