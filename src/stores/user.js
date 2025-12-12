import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
 
  const user = ref(null)
  const isLoggedIn = ref(false)
  

  const userEmail = computed(() => user.value?.email || '')
  const userName = computed(() => user.value?.name || '')
  
  function login(email, name = '') {
    user.value = { email, name, isLoggedIn: true, loginTime: Date.now() }
    isLoggedIn.value = true
    try {
      localStorage.setItem('qamqorlyq_user', JSON.stringify(user.value))
    } catch (e) {
      console.warn('Error saving user to localStorage:', e)
    }
  }
  
  function logout() {
    user.value = null
    isLoggedIn.value = false
    try {
      localStorage.removeItem('qamqorlyq_user')
    } catch (e) {
      console.warn('Error removing user from localStorage:', e)
    }
  }
  
  function checkAuth() {
    try {
      const userData = localStorage.getItem('qamqorlyq_user')
      if (userData) {
        const parsed = JSON.parse(userData)
        if (parsed.isLoggedIn) {
          user.value = parsed
          isLoggedIn.value = true
        }
      }
    } catch (e) {
      console.warn('Error reading user data:', e)
    }
  }
  
  return {
    user,
    isLoggedIn,
  
    userEmail,
    userName,
    
    login,
    logout,
    checkAuth
  }
})

