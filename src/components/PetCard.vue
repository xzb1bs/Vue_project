<template>
  <div class="card">
    <img :src="pet.img" :alt="pet.name" class="pet-img">
    <h3>{{ pet.name }}</h3>
    <p class="small">{{ pet.type }} • {{ pet.age }} • {{ pet.location }}</p>
    <p>{{ pet.desc }}</p>
    <button class="btn-delete" @click="$emit('delete', pet.id)">Удалить</button>
  </div>
</template>

<script setup>
defineProps({ pet: Object })
</script>

<style scoped>
.card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.pet-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
}
.btn-delete {
  background: #ff7675;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
}
</style>
