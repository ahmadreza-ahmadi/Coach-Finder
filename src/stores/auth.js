import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const userId = ref(null)
  const token = ref(null)
  const didAutoLogout = ref(false)
  let timer

  const isAuthenticated = computed(() => {
    return !!token.value
  })

  const setUser = (userData) => {
    userId.value = userData.localId
    token.value = userData.idToken
    didAutoLogout.value = false
  }

  const login = (userData) => {
    auth({ ...userData }, 'login')
  }

  const signup = (userData) => {
    auth({ ...userData }, 'signup')
  }

  const auth = async (userData, mode) => {
    const URLS = {
      login:
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD39nnJhZedW2OZuDFwqRMirDvh0AdEdYg',
      signup:
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD39nnJhZedW2OZuDFwqRMirDvh0AdEdYg'
    }

    const url = computed(() => URLS[mode])

    const newUser = {
      email: userData.email,
      password: userData.password,
      returnSecureToken: true
    }

    try {
      const response = await axios.post(url.value, newUser)
      const responseData = await response.data

      const expiresIn = +responseData.expiresIn * 1000
      const expirationDate = new Date().getTime() + expiresIn

      localStorage.setItem('token', responseData.idToken)
      localStorage.setItem('userId', responseData.localId)
      localStorage.setItem('tokenExpiration', expirationDate)

      timer = setTimeout(() => {
        autoLogout()
      }, expiresIn)

      setUser({
        idToken: responseData.idToken,
        localId: responseData.localId
      })
    } catch (error) {
      throw new Error(error.response.data.error.message)
    }
  }

  const autoLogin = () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()

    if (expiresIn < 0) {
      return
    }

    timer = setTimeout(() => {
      autoLogout()
    }, expiresIn)

    if (token && userId) {
      setUser({
        idToken: token,
        localId: userId
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)

    token.value = null
    userId.value = null
  }

  const autoLogout = () => {
    logout()
    didAutoLogout.value = true
  }

  return { userId, token, didAutoLogout, isAuthenticated, login, signup, logout, autoLogin }
})
