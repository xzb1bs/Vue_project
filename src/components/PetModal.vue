<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <img :src="pet.img" alt="" />
      <div class="modal-body">
        <button class="small" @click="$emit('close')">← Назад</button>
        <h2 style="margin-top:6px">{{ pet.displayName }} <span class="small">• {{ pet.type }}</span></h2>
        <p class="small">{{ pet.ageText }} — {{ pet.gender }} — {{ pet.location }}</p>
        <p style="margin-top:8px">{{ pet.desc }}</p>

        <div style="margin-top:12px" class="filters">
          <button class="btn btn-primary" @click="toggleLike">{{ pet.liked ? '♥ Liked' : '♡ Like' }}</button>
          <button class="btn-ghost" @click="openContact">Связаться</button>
        </div>

        <div v-if="showContact" style="margin-top:12px">
          <contact-form :pet-name="pet.displayName" @submitted="onSubmitted" @cancel="showContact=false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ContactForm from './ContactForm.vue'
const props = defineProps({ pet: Object })
const emit = defineEmits(['close','contact'])
const showContact = ref(false)
function toggleLike(){ props.pet.liked = !props.pet.liked; localStorage.setItem('qamqorlyq_v1', JSON.stringify(JSON.parse(localStorage.getItem('qamqorlyq_v1')) || [])) }
function openContact(){ showContact.value = true }
function onSubmitted(payload){ showContact.value = false; emit('contact', payload) }
</script>
