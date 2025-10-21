<template>
  <div class="card">
    <button class="small input" @click="$router.back()">← Back</button>
    <div style="display:flex;gap:1rem;margin-top:0.6rem">
      <img :src="pet.img" alt="img" style="width:320px;height:320px;object-fit:cover;border-radius:10px" />
      <div style="flex:1">
        <h2>{{ pet.name }} <span class="small">• {{ pet.type }}</span></h2>
        <p class="small">{{ pet.breed }} — {{ pet.age }} years — {{ pet.location }}</p>
        <p style="margin-top:0.6rem">{{ pet.desc }}</p>


        <div style="margin-top:1rem" class="form-row">
          <button class="button" @click="like">{{ pet.liked ? '♥ Liked' : '♡ Like' }}</button>
          <button class="input" @click="openContact">Contact Shelter</button>
        </div>


        <ContactForm v-if="showContact" :petName="pet.name" @submitted="onContactSubmitted" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { usePets } from '@/composables/usePets'
import ContactForm from '@/components/ContactForm.vue'
const { getById, toggleLike } = usePets()
const props = defineProps({ id: String })
const pet = getById(props.id) || { name: 'Not found', img:'', type:'', age:'', breed:'', location:'', desc:'' }
const showContact = ref(false)
function like(){ toggleLike(pet.id) }
function openContact(){ showContact.value = true }
function onContactSubmitted(payload){ alert('Message sent!\n' + JSON.stringify(payload)); showContact.value=false }
</script>