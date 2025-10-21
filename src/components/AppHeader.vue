<template>
  <header class="container header">
    <router-link to="/" class="logo">
      <img src="/qamqorlyq.ico" alt="Logo" class="logo-icon" />
      Qamqorlyq
    </router-link>
    <nav class="nav">
      <router-link to="/">Главная</router-link>
      <router-link to="/pets">Все питомцы</router-link>
      <button v-if="!isLoggedIn" class="cta" @click="$router.push('/login')">Войти</button>
      <div v-else class="user-menu">
        <span class="user-email">{{ userEmail }}</span>
        <button class="logout-btn" @click="handleLogout">Выйти</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const userEmail = ref('')

function checkLoginStatus() {
  try {
    const userData = localStorage.getItem('qamqorlyq_user')
    if (userData) {
      const user = JSON.parse(userData)
      isLoggedIn.value = user.isLoggedIn
      userEmail.value = user.email
    }
  } catch (e) {
    console.warn('Error reading user data:', e)
  }
}

function handleLogout() {
  localStorage.removeItem('qamqorlyq_user')
  isLoggedIn.value = false
  userEmail.value = ''
  router.push('/')
}

onMounted(() => {
  checkLoginStatus()
})
</script>
<style>
.logo {
display: flex;
align-items: center;
font-weight: 700;
font-size: 22px;
gap: 8px;
}
.logo-icon {
width: 28px;
height: 28px;
object-fit: contain;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-email {
  color: var(--muted);
  font-size: 14px;
}

.logout-btn {
  background: transparent;
  border: 1px solid rgba(10, 20, 40, 0.1);
  color: var(--muted);
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  color: #ef4444;
}
</style>
