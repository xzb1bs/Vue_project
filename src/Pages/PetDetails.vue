<template>
  <div class="card">
    <button class="small input" @click="$router.back()">← Back</button>
    <div style="display:flex;gap:1rem;margin-top:0.6rem">
      <img :src="pet.img" alt="img" style="width:320px;height:320px;object-fit:cover;border-radius:10px" />
      <div style="flex:1">
        <h2>{{ pet.name }} <span class="small">• {{ pet.type }}</span></h2>
        <p class="small">{{ pet.breed }} — {{ pet.ageText }} — {{ pet.location }}</p>
        <p style="margin-top:0.6rem">{{ pet.desc }}</p>


        <div style="margin-top:1rem" class="form-row">
          <button class="button" @click="like">{{ pet.liked ? '♥ Liked' : '♡ Like' }}</button>
          <button class="input" @click="openContact">Contact Shelter</button>
          <button v-if="isLoggedIn" class="btn-delete" @click="deletePet">🗑️ Удалить</button>
        </div>


        <ContactForm v-if="showContact" :petName="pet.name" @submitted="onContactSubmitted" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { usePets } from '@/composables/usePets'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import ContactForm from '@/components/ContactForm.vue'

const { getById, toggleLike, remove } = usePets()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const petId = route.params.id
const pet = getById(petId) || { name: 'Not found', img:'', type:'', ageText:'', breed:'', location:'', desc:'' }
const showContact = ref(false)

const isLoggedIn = computed(() => userStore.isLoggedIn)

function like(){ toggleLike(pet.id) }
function openContact(){ showContact.value = true }
function onContactSubmitted(payload){ alert('Message sent!\n' + JSON.stringify(payload)); showContact.value=false }

function deletePet() {
  if (confirm('Вы уверены, что хотите удалить этого питомца?')) {
    remove(pet.id)
    alert('Питомец удален!')
    router.push('/pets')
  }
}

onMounted(() => {
  userStore.checkAuth()
})

watch(() => localStorage.getItem('qamqorlyq_user'), () => {
  userStore.checkAuth()
})
</script>

<style scoped>
.btn-delete {
  background: transparent;
  border: 2px solid #ef4444;
  color: #ef4444;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  font-size: 14px;
}
.btn-delete:hover {
  background: #ef4444;
  color: white;
}
</style>