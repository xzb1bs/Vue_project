<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <img src="/qamqorlyq.ico" alt="Logo" class="logo-icon" />
        <h1>Регистрация</h1>
        <p class="register-subtitle">Создайте новый аккаунт</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="name">Имя (необязательно)</label>
          <input 
            id="name"
            v-model="name" 
            type="text" 
            placeholder="Введите ваше имя" 
            class="form-input"
            :class="{ 'error': errors.name }"
            @blur="validateName"
          />
          <span v-show="errors.name" class="error-message">{{ errors.name }}</span>
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            placeholder="Введите ваш email" 
            required 
            class="form-input"
            :class="{ 'error': errors.email }"
            @blur="validateEmail"
          />
          <span v-show="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        
        <div class="form-group">
          <label for="password">Пароль</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="Введите пароль (минимум 6 символов)" 
            required 
            class="form-input"
            :class="{ 'error': errors.password }"
            @blur="validatePassword"
          />
          <span v-show="errors.password" class="error-message">{{ errors.password }}</span>
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Подтвердите пароль</label>
          <input 
            id="confirmPassword"
            v-model="confirmPassword" 
            type="password" 
            placeholder="Повторите пароль" 
            required 
            class="form-input"
            :class="{ 'error': errors.confirmPassword }"
            @blur="validateConfirmPassword"
          />
          <span v-show="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
        </div>
        
        <button type="submit" class="register-btn" :disabled="isLoading || !isFormValid">
          {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
        
        <div class="register-footer">
          <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
          <p class="success-message" v-if="successMessage">{{ successMessage }}</p>
        </div>
      </form>
      
      <div class="register-footer-links">
        <p>Уже есть аккаунт? <router-link to="/login" class="link">Войти</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { registerUser } from '@/api/authApi'

const router = useRouter()
const userStore = useUserStore()

// Если пользователь уже авторизован, перенаправляем на главную
onMounted(() => {
  userStore.checkAuth()
  if (userStore.isLoggedIn) {
    router.push('/')
  }
})

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

function validateName() {
  if (name.value && name.value.length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа'
  } else {
    errors.name = ''
  }
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    errors.email = 'Email обязателен'
  } else if (!emailRegex.test(email.value)) {
    errors.email = 'Введите корректный email'
  } else {
    errors.email = ''
  }
}

function validatePassword() {
  if (!password.value) {
    errors.password = 'Пароль обязателен'
  } else if (password.value.length < 6) {
    errors.password = 'Пароль должен содержать минимум 6 символов'
  } else {
    errors.password = ''
  }
  
  // Проверяем подтверждение пароля, если оно уже введено
  if (confirmPassword.value) {
    validateConfirmPassword()
  }
}

function validateConfirmPassword() {
  if (!confirmPassword.value) {
    errors.confirmPassword = 'Подтвердите пароль'
  } else if (confirmPassword.value !== password.value) {
    errors.confirmPassword = 'Пароли не совпадают'
  } else {
    errors.confirmPassword = ''
  }
}

const isFormValid = computed(() => {
  return email.value && 
         password.value && 
         confirmPassword.value &&
         !errors.email && 
         !errors.password && 
         !errors.confirmPassword &&
         (!name.value || !errors.name)
})

async function handleRegister() {
  // Валидация всех полей
  validateEmail()
  validatePassword()
  validateConfirmPassword()
  if (name.value) {
    validateName()
  }
  
  if (!isFormValid.value) {
    errorMessage.value = 'Заполните все поля корректно'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    // Симулируем задержку сети
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Регистрируем пользователя
    registerUser(email.value, password.value, name.value || '')
    
    successMessage.value = 'Регистрация успешна! Перенаправление на страницу входа...'
    
    // Сохраняем email для автозаполнения в форме логина
    const userEmail = email.value
    
    // Очищаем форму регистрации
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    name.value = ''
    
    // Перенаправляем на страницу входа с email в query параметре
    setTimeout(() => {
      router.push({ path: '/login', query: { email: userEmail } })
    }, 1500)
  } catch (err) {
    errorMessage.value = err.message || 'Ошибка при регистрации'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f6fbff 0%, #eef8ff 100%);
  padding: 20px;
}

.register-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(11, 18, 30, 0.15);
  width: 100%;
  max-width: 450px;
  text-align: center;
}

.register-header {
  margin-bottom: 30px;
}

.logo-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
}

.register-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #071233;
  margin: 0 0 8px 0;
}

.register-subtitle {
  color: #6b7280;
  margin: 0;
  font-size: 16px;
}

.register-form {
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.2s;
  background: #fafcff;
  box-sizing: border-box;
}

.form-input.error {
  border-color: #ef4444;
  background: #fef2f2;
}

.form-input:focus {
  outline: none;
  border-color: #ff7aa2;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 122, 162, 0.1);
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 2px;
}

.register-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, #ff7aa2, #6ee7b7);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 20px;
  margin-top: 10px;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 122, 162, 0.3);
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-footer {
  margin-top: 20px;
}

.register-footer .error-message {
  color: #ef4444;
  font-size: 14px;
  margin: 0;
  padding: 8px;
  background: #fef2f2;
  border-radius: 8px;
  border: 1px solid #fecaca;
}

.success-message {
  color: #059669;
  font-size: 14px;
  margin: 0;
  padding: 8px;
  background: #f0fdf4;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
}

.register-footer-links {
  margin-top: 20px;
  text-align: center;
}

.register-footer-links p {
  color: var(--muted, #6b7280);
  font-size: 14px;
  margin: 0;
}

.link {
  color: var(--accent, #ff7aa2);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.link:hover {
  color: #ff6b9d;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .register-card {
    padding: 30px 20px;
  }
}
</style>

