// src/composables/useAuth.js
import { ref } from 'vue'

const isLoggedIn = ref(!!localStorage.getItem('userLogged'))

function login() {
  localStorage.setItem('userLogged', '1')
  isLoggedIn.value = true
}

function logout() {
  localStorage.removeItem('userLogged')
  isLoggedIn.value = false
}

export function useAuth() {
  return {
    isLoggedIn,
    login,
    logout,
  }
}
