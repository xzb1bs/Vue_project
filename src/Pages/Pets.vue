<template>
  <div>
    <AppHeader />

    <section class="container">
      <h1>Найдите своего нового друга</h1>
      <p class="small">{{ filtered.length }} питомцев ждут своего дома</p>

      <search-bar :types="types" :cities="cities" :genders="genders" @search="onSearch" />

      <div class="grid">
        <pet-card v-for="p in filtered" :key="p.id" :pet="p" @open="open" @like="like" />
      </div>
    </section>

    <PetModal v-if="active" :pet="active" @close="active = null" @contact="onContact" />

    <footer class="footer">© 2025 Qamqorlyq. Помогаем питомцам найти дом с любовью.</footer>
  </div>
</template>

<script setup>
import { pets } from '@/data/pets.js'
import AppHeader from '@/components/AppHeader.vue'
import SearchBar from '@/components/SearchBar.vue'
import PetCard from '@/components/PetCard.vue'
import PetModal from '@/components/PetModal.vue'
import { ref, computed } from 'vue'
import { usePets } from '@/composables/usePets'

const { list, getById, toggleLike, types, cities, genders } = usePets()
const filter = ref({ q: '', city: 'Все города', type: 'Все типы', gender: 'Любой' })
const active = ref(null)

function onSearch(payload){ filter.value = payload }

const filtered = computed(()=> list.value.filter(p=>{
  const q = (filter.value.q || '').trim().toLowerCase()
  const matchQ = !q || (p.displayName + ' ' + p.desc).toLowerCase().includes(q)
  const matchCity = filter.value.city === 'Все города' || p.location === filter.value.city
  const matchType = filter.value.type === 'Все типы' || p.type === filter.value.type
  const matchGender = filter.value.gender === 'Любой' || p.gender === filter.value.gender
  return matchQ && matchCity && matchType && matchGender
}))

function open(id){ active.value = getById(id) }
function like(id){ toggleLike(id) }
function onContact(payload){ alert('Сообщение отправлено:\\n' + JSON.stringify(payload)) }
</script>
