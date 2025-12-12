<template>
  <div>
    <AppHeader />
    <section class="container">
      <h1>Питомцы из API</h1>
      <p class="small">Данные загружаются с сервера в реальном времени</p>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Загрузка питомцев с сервера...</p>
      </div>
      
      <div v-else-if="error" class="error">
        <h3>Ошибка загрузки</h3>
        <p>{{ error }}</p>
        <button @click="fetchPets" class="btn btn-primary">Попробовать снова</button>
      </div>
      
      <div v-else-if="apiPets && apiPets.length > 0" class="api-content">
        <p class="success-message">✓ Загружено {{ apiPets.length }} питомцев</p>
        <div class="grid">
          <PetCard
            v-for="pet in apiPets"
            :key="pet.id"
            :pet="pet"
            :showDelete="false"
            @open="open(pet)"
            @like="like(pet.id)"
          />
        </div>
      </div>
      
      <div v-else class="empty-state">
        <p>Питомцы не найдены.</p>
        <button @click="fetchPets" class="btn btn-primary">Загрузить питомцев</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchPetsFromApi } from '@/api/petsApi'
import AppHeader from '@/components/AppHeader.vue'
import PetCard from '@/components/PetCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const error = ref(null)
const apiPets = ref([])

async function fetchPets() {
  loading.value = true
  error.value = null
  
  try {
    const data = await fetchPetsFromApi()
    apiPets.value = data
  } catch (err) {
    error.value = err.message || 'Произошла ошибка при загрузке данных'
    console.error('Ошибка загрузки питомцев:', err)
  } finally {
    loading.value = false
  }
}

function open(pet) {
  router.push(`/pets/${pet.id}`)
}

function like(id) {
  const pet = apiPets.value.find(p => p.id === id)
  if (pet) {
    pet.liked = !pet.liked
  }
}

onMounted(() => {
  fetchPets()
})
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.container h1 {
  margin-bottom: 8px;
}

.small {
  color: var(--muted, #6b7280);
  font-size: 14px;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: var(--muted, #6b7280);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top-color: var(--accent, #ff7aa2);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 40px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #ef4444;
}

.success-message {
  color: #059669;
  padding: 12px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--muted, #6b7280);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.btn {
  background: linear-gradient(90deg, var(--accent, #ff7aa2), #ffb3cf);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
  transition: 0.25s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(255, 122, 162, 0.25);
}
</style>

