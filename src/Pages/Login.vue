<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <img src="/qamqorlyq.ico" alt="Logo" class="logo-icon" />
        <h1>Qamqorlyq</h1>
        <p class="login-subtitle">Войдите в свой аккаунт</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            placeholder="Введите ваш email" 
            required 
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Пароль</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="Введите пароль" 
            required 
            class="form-input"
          />
        </div>
        
        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? 'Вход...' : 'Войти' }}
        </button>
        
        <div class="login-footer">
          <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
          <p class="success-message" v-if="successMessage">{{ successMessage }}</p>
        </div>
      </form>
      
      <div class="demo-credentials">
        <h3>Демо аккаунт:</h3>
        <p><strong>Email:</strong> admin@qamqorlyq.com</p>
        <p><strong>Пароль:</strong> admin123</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Demo credentials
const DEMO_EMAIL = 'admin@qamqorlyq.com'
const DEMO_PASSWORD = 'admin123'

function handleLogin() {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  // Simulate API call
  setTimeout(() => {
    if (email.value === DEMO_EMAIL && password.value === DEMO_PASSWORD) {
      // Store login state
      localStorage.setItem('qamqorlyq_user', JSON.stringify({
        email: email.value,
        isLoggedIn: true,
        loginTime: Date.now()
      }))
      
      successMessage.value = 'Успешный вход!'
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      errorMessage.value = 'Неверный email или пароль'
    }
    isLoading.value = false
  }, 1000)
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f6fbff 0%, #eef8ff 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(11, 18, 30, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-header {
  margin-bottom: 30px;
}

.logo-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
}

.login-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #071233;
  margin: 0 0 8px 0;
}

.login-subtitle {
  color: #6b7280;
  margin: 0;
  font-size: 16px;
}

.login-form {
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
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
}

.form-input:focus {
  outline: none;
  border-color: #ff7aa2;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 122, 162, 0.1);
}

.login-btn {
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
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 122, 162, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 20px;
}

.error-message {
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

.demo-credentials {
  margin-top: 30px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.demo-credentials h3 {
  margin: 0 0 12px 0;
  color: #374151;
  font-size: 16px;
}

.demo-credentials p {
  margin: 4px 0;
  color: #6b7280;
  font-size: 14px;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
}
</style>
