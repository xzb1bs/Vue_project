<template>
  <div>
    <AppHeader />
    <div class="grid">
      <div v-for="pet in allPets" :key="pet.id" class="card">
        <img :src="pet.img" :alt="pet.name" class="pet-img">
        <div class="card-header">
          <div>
            <div class="pet-name">{{ pet.displayName }}</div>
            <div class="small">{{ pet.type }} • {{ pet.location }}</div>
          </div>
        </div>
        <p class="small">{{ pet.desc }}</p>
      </div>
    </div>

    <section class="container">
      <div class="hero">
        <div class="hero-left">
          <h1 class="hero-title">Найдите друга, который ждет именно вас</h1>
          <p class="hero-desc">Тысячи питомцев мечтают о любящем доме. Дайте им шанс на счастливую жизнь и обретите верного друга!</p>
          <div class="hero-cta">
            <router-link to="/pets" class="btn btn-primary">Найти питомца</router-link>
            <button class="btn btn-ghost" @click="addPetMock">Добавить питомца</button>
          </div>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=1200&q=60" alt="hero" style="width:420px;border-radius:12px;box-shadow:var(--shadow)" />
        </div>
      </div>

      <h3 style="margin-top:18px">Счастливые питомцы ждут своих хозяев</h3>

      <div class="features">
        <div class="feature">
          <h4>Проверенные питомцы</h4>
          <p class="small">Все объявления проходят модерацию, чтобы гарантировать безопасность и достоверность информации</p>
        </div>
        <div class="feature">
          <h4>Удобный поиск</h4>
          <p class="small">Фильтруйте по городу, типу, возрасту и полу питомца для быстрого поиска идеального друга</p>
        </div>
        <div class="feature">
          <h4>Прямая связь</h4>
          <p class="small">Связывайтесь напрямую с владельцами питомцев для получения подробной информации</p>
        </div>
      </div>

      <div style="margin-top:18px">
        <h3>Готовы изменить чью-то жизнь?</h3>
        <p class="small">Начните свое путешествие к новому другу уже сегодня. Каждый питомец заслуживает любящий дом!</p>
        <router-link to="/pets" class="btn btn-primary" style="margin-top:10px;display:inline-block">Посмотреть всех питомцев</router-link>
      </div>
    </section>

    <footer class="footer">Qamqorlyq © 2025 Qamqorlyq. Помогаем питомцам найти дом с любовью.</footer>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import { usePets } from '@/composables/usePets'
const { add } = usePets()

function addPetMock(){
  const newPet = {
    id: 'new'+Date.now(),
    name: 'Новый питомец',
    displayName: 'Новый питомец',
    type: 'Собака',
    ageText: '1 год',
    ageMonths: 12,
    gender: 'Мальчик',
    location: 'Almaty',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=60',
    desc: 'Добавлен вручную'
  }
  add(newPet)
  alert('Питомец добавлен (mock). Перейдите на «Все питомцы».')
}
</script>
