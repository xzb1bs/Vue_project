<template>
  <div>
    <AppHeader />
    <section class="container">
      <h1>Найдите своего нового друга</h1>
      <p class="small">{{ filtered.length }} питомцев ждут своего дома</p>

      <SearchBar :types="types" :cities="cities" :genders="genders" @search="onSearch" />

      <div class="grid">
        <PetCard
            v-for="p in filtered"
            :key="p.id"
            :pet="p"
            :showDelete="isLoggedIn"
            @open="open(p)"
            @like="like(p.id)"
            @delete="deletePet"
        />
      </div>
    </section>

    <PetModal
        v-if="active"
        :pet="active"
        @close="active = null"
        @contact="onContact"
    />

    <footer class="footer">© 2025 Qamqorlyq. Помогаем питомцам найти дом с любовью.</footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePets } from '@/composables/usePets'
import AppHeader from '@/components/AppHeader.vue'
import SearchBar from '@/components/SearchBar.vue'
import PetCard from '@/components/PetCard.vue'
import PetModal from '@/components/PetModal.vue'

const { list, getById, toggleLike, remove, types, cities, genders } = usePets()
const isLoggedIn = ref(false)

const filter = ref({
  q: '',
  city: 'Все города',
  type: 'Все типы',
  gender: 'Любой'
})
const active = ref(null)

function onSearch(payload) {
  filter.value = payload
}

const filtered = computed(() =>
    list.value.filter(p => {
      const q = (filter.value.q || '').trim().toLowerCase()
      const matchQ = !q || (p.displayName + ' ' + p.desc).toLowerCase().includes(q)
      const matchCity = filter.value.city === 'Все города' || p.location === filter.value.city
      const matchType = filter.value.type === 'Все типы' || p.type === filter.value.type
      const matchGender = filter.value.gender === 'Любой' || p.gender === filter.value.gender
      return matchQ && matchCity && matchType && matchGender
    })
)

function open(pet) {
  active.value = pet
}

function like(id) {
  toggleLike(id)
}

function onContact(payload) {
  alert('Сообщение отправлено:\n' + JSON.stringify(payload, null, 2))
}

function deletePet(id) {
  if (confirm('Вы уверены, что хотите удалить этого питомца?')) {
    remove(id)
    alert('Питомец удален!')
  }
}

function checkLoginStatus() {
  try {
    const userData = localStorage.getItem('qamqorlyq_user')
    if (userData) {
      const user = JSON.parse(userData)
      isLoggedIn.value = user.isLoggedIn
    }
  } catch (e) {
    console.warn('Error reading user data:', e)
  }
}

onMounted(() => {
  checkLoginStatus()
})
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 18px;
}
.footer {
  padding: 24px;
  text-align: center;
  color: var(--muted);
  margin-top: 24px;
}
</style>
