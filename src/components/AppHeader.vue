<template>
  <header class="container header">
    <router-link to="/" class="logo">
      <img src="/qamqorlyq.ico" alt="Logo" class="logo-icon" />
      Qamqorlyq
    </router-link>
    <nav class="nav">
      <router-link to="/">Главная</router-link>
      <router-link to="/pets">Все питомцы</router-link>
      <router-link to="/pets-api">API Питомцы</router-link>
      <div v-if="!isLoggedIn" class="auth-buttons">
        <router-link to="/login" class="auth-link">Войти</router-link>
        <router-link to="/register" class="auth-link register-link">Регистрация</router-link>
      </div>
      <div v-else class="user-menu">
        <span class="user-email">{{ userEmail }}</span>
        <button class="logout-btn" @click="handleLogout">Выйти</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const isLoggedIn = computed(() => userStore.isLoggedIn)
const userEmail = computed(() => userStore.userEmail)

function handleLogout() {
  userStore.logout()
  router.push('/')
}

onMounted(() => {
  userStore.checkAuth()
})

watch(() => localStorage.getItem('qamqorlyq_user'), () => {
  userStore.checkAuth()
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

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.auth-link {
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.auth-link:first-child {
  color: var(--text, #071233);
  background: transparent;
  border-color: rgba(10, 20, 40, 0.1);
}

.auth-link:first-child:hover {
  background: rgba(10, 20, 40, 0.05);
}

.register-link {
  background: linear-gradient(90deg, var(--accent, #ff7aa2), #ffb3cf);
  color: white;
  border: none;
}

.register-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 122, 162, 0.3);
}
</style>
