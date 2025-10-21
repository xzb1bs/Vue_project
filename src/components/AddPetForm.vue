<template>
  <form class="form" @submit.prevent="submit">
    <input v-model="name" placeholder="Имя питомца" required>
    <input v-model="type" placeholder="Тип (Кот, Собака...)" required>
    <input v-model="breed" placeholder="Порода" required>
    <input v-model="age" placeholder="Возраст" required>
    <input v-model="location" placeholder="Город" required>
    <input v-model="img" placeholder="Ссылка на фото" required>
    <textarea v-model="desc" placeholder="Описание" required></textarea>
    <button type="submit" class="btn">Добавить питомца</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add'])

const name = ref('')
const type = ref('')
const age = ref('')
const breed = ref('')
const location = ref('')
const img = ref('')
const desc = ref('')

function submit() {
  const newPet = {
    id: Date.now(),
    name: name.value,
    displayName: name.value,
    type: type.value,
    breed: breed.value,
    ageText: age.value,
    ageMonths: 0, // Default value for new pets
    gender: 'Неизвестен',
    location: location.value,
    img: img.value,
    desc: desc.value
  }
  emit('add', newPet)
  name.value = type.value = breed.value = age.value = location.value = img.value = desc.value = ''
}
</script>
