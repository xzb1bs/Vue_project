<template>
  <div class="not-found">
    <AppHeader />
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p class="small">Запрашиваемая страница не существует или была перемещена.</p>
      <router-link to="/" class="btn btn-primary">Вернуться на главную</router-link>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.not-found-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.not-found-content h1 {
  font-size: 120px;
  font-weight: 700;
  color: var(--accent, #ff7aa2);
  margin: 0;
  line-height: 1;
}

.not-found-content h2 {
  font-size: 32px;
  margin: 20px 0 10px;
  color: var(--text, #071233);
}

.not-found-content .small {
  color: var(--muted, #6b7280);
  margin-bottom: 30px;
  font-size: 16px;
}

.btn {
  background: linear-gradient(90deg, var(--accent, #ff7aa2), #ffb3cf);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: 0.25s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(255, 122, 162, 0.25);
}
</style>

