<template>
  <div class="card">
    <h3>Связаться о «{{ petName }}»</h3>
    <div style="margin-top:8px" class="filters">
      <input v-model="name" class="input" placeholder="Ваше имя" />
      <input v-model="email" class="input" placeholder="Email" />
    </div>
    <textarea v-model="message" class="input" rows="4" placeholder="Сообщение" style="margin-top:8px"></textarea>
    <div style="margin-top:8px;display:flex;gap:8px">
      <button class="btn btn-primary" @click="submit">Отправить</button>
      <button class="btn-ghost" @click="$emit('cancel')">Отмена</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ petName: String })
const emit = defineEmits(['submitted','cancel'])
const name = ref(''); const email = ref(''); const message = ref('')
function submit(){
  if(!name.value || !email.value) return alert('Заполните имя и email')
  emit('submitted', { name: name.value, email: email.value, message: message.value, pet: props.petName })
}
</script>
