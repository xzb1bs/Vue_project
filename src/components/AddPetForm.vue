<template>
  <form class="form" @submit.prevent="submit">
    <input v-model="name" placeholder="Имя питомца" required>
    <input v-model="type" placeholder="Тип (Кот, Собака...)" required>
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
const location = ref('')
const img = ref('')
const desc = ref('')

function submit() {
  const newPet = {
    id: Date.now(),
    name: name.value,
    type: type.value,
    age: age.value,
    location: location.value,
    img: img.value,
    desc: desc.value
  }
  emit('add', newPet)
  name.value = type.value = age.value = location.value = img.value = desc.value = ''
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}
input, textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.btn {
  background: #38bdf8;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
