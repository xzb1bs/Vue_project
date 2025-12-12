<template>
  <div class="card" :class="{ 'liked': pet.liked, 'has-delete': showDelete }">
    <img :src="pet.img" :alt="pet.name" class="pet-img">
    <h3>{{ pet.name }}</h3>
    <p class="small">{{ pet.type }} • {{ pet.ageText }} • {{ pet.location }}</p>
    <p class="desc">{{ pet.desc.slice(0, 80) }}...</p>
    <div style="display: flex; gap: 8px; margin-top: 8px;">
      <button class="btn-more" @click="$emit('open', pet)">Подробнее</button>
      <button 
        class="btn-like" 
        :class="{ 'liked': pet.liked }"
        @click="$emit('like', pet.id)"
      >
        {{ pet.liked ? '♥' : '♡' }}
      </button>
      <button 
        v-show="showDelete" 
        class="btn-delete" 
        @click="$emit('delete', pet.id)"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ 
  pet: Object,
  showDelete: {
    type: Boolean,
    default: false
  }
})
defineEmits(['open', 'like', 'delete'])
</script>

<style scoped>
.card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.card.liked {
  border: 2px solid #ff7aa2;
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
  font-weight: 600;
  flex: 1;
}
.btn-like {
  background: transparent;
  border: 2px solid #ff7aa2;
  color: #ff7aa2;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-like.liked {
  background: #ff7aa2;
  color: white;
}
.btn-like:hover {
  background: #ff7aa2;
  color: white;
}
.btn-delete {
  background: transparent;
  border: 2px solid #ef4444;
  color: #ef4444;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  font-size: 16px;
}
.btn-delete:hover {
  background: #ef4444;
  color: white;
}
</style>
