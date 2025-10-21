<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <img :src="pet.img" :alt="pet.name">
      <div class="modal-body">
        <h2>{{ pet.name }}</h2>
        <p class="info">{{ pet.type }} • {{ pet.breed }} • {{ pet.age }} • {{ pet.location }}</p>
        <p>{{ pet.desc }}</p>

        <h3>Связаться с владельцем</h3>
        <form @submit.prevent="sendMessage">
          <input v-model="name" placeholder="Ваше имя" required>
          <input v-model="email" placeholder="Ваш email" required>
          <textarea v-model="message" placeholder="Ваше сообщение" required></textarea>
          <button type="submit">Отправить</button>
        </form>

        <button class="close-btn" @click="$emit('close')">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ pet: Object })
const emit = defineEmits(['close'])

const name = ref('')
const email = ref('')
const message = ref('')

function sendMessage() {
  alert(`Сообщение отправлено!\nИмя: ${name.value}\nEmail: ${email.value}\n\n${message.value}`)
  name.value = ''
  email.value = ''
  message.value = ''
  emit('close')
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  max-width: 800px;
  width: 95%;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
.modal img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}
.modal-body {
  flex: 1;
}
.info {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 10px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}
input, textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
button {
  background: linear-gradient(90deg, #ff7aa2, #6ee7b7);
  border: none;
  color: white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.close-btn {
  background: #e5e7eb;
  color: #111;
  margin-top: 10px;
}
@media (max-width: 700px) {
  .modal {
    flex-direction: column;
  }
  .modal img {
    width: 100%;
    height: 250px;
  }
}
</style>
