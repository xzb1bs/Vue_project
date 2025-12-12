<template>
  <div>
    <AppHeader />
    <section class="container">
      <div class="hero">
        <div class="hero-left">
          <h1 class="hero-title">Найдите друга, который ждет именно вас</h1>
          <p class="hero-desc">
            Тысячи питомцев мечтают о любящем доме. Дайте им шанс на счастливую жизнь и обретите верного друга!
          </p>
          <div class="hero-cta">
            <router-link to="/pets" class="btn btn-primary">Найти питомца</router-link>
            <button v-if="isLoggedIn" class="btn btn-ghost" @click="showForm = true">Добавить питомца</button>
            <router-link v-else to="/login" class="btn btn-ghost">Войти для добавления</router-link>
          </div>
        </div>
        <div>
          <img
              src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=1200&q=60"
              alt="hero"
              style="width:420px;border-radius:12px;box-shadow:var(--shadow)"
          />
        </div>
      </div>

      <h3 style="margin-top:18px">Счастливые питомцы ждут своих хозяев</h3>
      <div class="features">
        <div class="feature">
          <h4>Проверенные питомцы</h4>
          <p class="small">Все объявления проходят модерацию для безопасности и достоверности информации.</p>
        </div>
        <div class="feature">
          <h4>Удобный поиск</h4>
          <p class="small">Фильтруйте по городу, типу, возрасту и полу питомца для быстрого поиска идеального друга.</p>
        </div>
        <div class="feature">
          <h4>Прямая связь</h4>
          <p class="small">Связывайтесь напрямую с владельцами питомцев для получения подробной информации.</p>
        </div>
      </div>

      <div style="margin-top:18px">
        <h3>Готовы изменить чью-то жизнь?</h3>
        <p class="small">Начните своё путешествие к новому другу уже сегодня. Каждый питомец заслуживает любящий дом!</p>
        <router-link to="/pets" class="btn btn-primary" style="margin-top:10px;display:inline-block">
          Посмотреть всех питомцев
        </router-link>
      </div>
    </section>

    <div v-if="showForm && isLoggedIn" class="modal-backdrop" @click.self="showForm = false">
      <div class="modal">
        <AddPetForm @add="addPet" />
        <button class="close-btn" @click="showForm = false">Закрыть</button>
      </div>
    </div>

    <footer class="footer">
      Qamqorlyq © 2025. Помогаем питомцам найти дом с любовью.
    </footer>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AddPetForm from '@/components/AddPetForm.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { usePets } from '@/composables/usePets'
import { useUserStore } from '@/stores/user'

const { list, add } = usePets()
const allPets = list
const showForm = ref(false)
const userStore = useUserStore()

const isLoggedIn = computed(() => userStore.isLoggedIn)

function addPet(pet) {
  add(pet)
  showForm.value = false
  alert(`Питомец "${pet.name}" добавлен!`)
}

onMounted(() => {
  userStore.checkAuth()
})

watch(() => localStorage.getItem('qamqorlyq_user'), () => {
  userStore.checkAuth()
})
</script>

<style scoped>
.modal-backdrop {
   position: fixed;
   inset: 0;
   background: rgba(2, 6, 23, 0.45);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 60;
   animation: fadeIn 0.3s ease;
 }

.modal {
  background: var(--card, #fff);
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(11, 18, 30, 0.25);
  width: 420px;
  max-width: 90%;
  animation: popIn 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.modal h2 {
  margin-top: 0;
  text-align: center;
  font-size: 22px;
  margin-bottom: 14px;
}

.close-btn {
  background: transparent;
  border: 1px solid rgba(10, 20, 40, 0.1);
  color: var(--muted, #555);
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
  align-self: center;
  margin-top: 10px;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.04);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(10, 20, 40, 0.1);
  font-size: 14px;
  background: #fafcff;
  outline: none;
  transition: 0.2s;
}

input:focus, textarea:focus {
  border-color: var(--accent, #ff7aa2);
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 122, 162, 0.15);
}

.btn {
  background: linear-gradient(90deg, var(--accent, #ff7aa2), #ffb3cf);
  border: none;
  color: white;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 4px;
  box-shadow: 0 6px 18px rgba(255, 122, 162, 0.18);
  transition: 0.25s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(255, 122, 162, 0.25);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  from { transform: scale(0.92); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
