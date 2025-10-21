<template>
  <div class="card">
    <img :src="pet.img" :alt="pet.name" class="pet-img">
    <h3>{{ pet.name }}</h3>
    <p class="small">{{ pet.type }} • {{ pet.age }} • {{ pet.location }}</p>
    <p class="desc">{{ pet.desc.slice(0, 80) }}...</p>
    <button class="btn-more" @click="$emit('open', pet)">Подробнее</button>
  </div>
</template>

<script setup>
defineProps({ pet: Object })
defineEmits(['open'])
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
.small {
  font-size: 13px;
  color: #6b7280;
}
.desc {
  font-size: 14px;
  margin-top: 4px;
}
.btn-more {
  background: linear-gradient(90deg, #ff7aa2, #6ee7b7);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
  font-weight: 600;
}
</style>
