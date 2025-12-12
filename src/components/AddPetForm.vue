<template>
  <form class="form" @submit.prevent="submit">
    <h2>Добавить питомца</h2>
    
    <div class="form-group">
      <input 
        v-model="name" 
        placeholder="Имя питомца" 
        :class="{ 'error': errors.name }"
        @blur="validateName"
      >
      <span v-show="errors.name" class="error-message">{{ errors.name }}</span>
    </div>
    
    <div class="form-group">
      <input 
        v-model="type" 
        placeholder="Тип (Кот, Собака...)" 
        :class="{ 'error': errors.type }"
        @blur="validateType"
      >
      <span v-show="errors.type" class="error-message">{{ errors.type }}</span>
    </div>
    
    <div class="form-group">
      <input 
        v-model="breed" 
        placeholder="Порода" 
        :class="{ 'error': errors.breed }"
        @blur="validateBreed"
      >
      <span v-show="errors.breed" class="error-message">{{ errors.breed }}</span>
    </div>
    
    <div class="form-group">
      <input 
        v-model="age" 
        type="number"
        placeholder="Возраст (в месяцах)" 
        :class="{ 'error': errors.age }"
        @blur="validateAge"
      >
      <span v-show="errors.age" class="error-message">{{ errors.age }}</span>
    </div>
    
    <div class="form-group">
      <input 
        v-model="location" 
        placeholder="Город" 
        :class="{ 'error': errors.location }"
        @blur="validateLocation"
      >
      <span v-show="errors.location" class="error-message">{{ errors.location }}</span>
    </div>
    
    <div class="form-group">
      <input 
        v-model="img" 
        type="url"
        placeholder="Ссылка на фото" 
        :class="{ 'error': errors.img }"
        @blur="validateImg"
      >
      <span v-show="errors.img" class="error-message">{{ errors.img }}</span>
    </div>
    
    <div class="form-group">
      <textarea 
        v-model="desc" 
        placeholder="Описание" 
        :class="{ 'error': errors.desc }"
        @blur="validateDesc"
      ></textarea>
      <span v-show="errors.desc" class="error-message">{{ errors.desc }}</span>
    </div>
    
    <button type="submit" class="btn" :disabled="!isFormValid">Добавить питомца</button>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
const emit = defineEmits(['add'])

const name = ref('')
const type = ref('')
const age = ref('')
const breed = ref('')
const location = ref('')
const img = ref('')
const desc = ref('')

const errors = reactive({
  name: '',
  type: '',
  age: '',
  breed: '',
  location: '',
  img: '',
  desc: ''
})

function validateName() {
  if (!name.value.trim()) {
    errors.name = 'Имя обязательно для заполнения'
  } else if (name.value.length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа'
  } else if (name.value.length > 50) {
    errors.name = 'Имя не должно превышать 50 символов'
  } else {
    errors.name = ''
  }
}

function validateType() {
  if (!type.value.trim()) {
    errors.type = 'Тип обязателен для заполнения'
  } else if (type.value.length < 2) {
    errors.type = 'Тип должен содержать минимум 2 символа'
  } else {
    errors.type = ''
  }
}

function validateBreed() {
  if (!breed.value.trim()) {
    errors.breed = 'Порода обязательна для заполнения'
  } else if (breed.value.length < 2) {
    errors.breed = 'Порода должна содержать минимум 2 символа'
  } else {
    errors.breed = ''
  }
}

function validateAge() {
  const ageNum = parseInt(age.value)
  if (!age.value) {
    errors.age = 'Возраст обязателен для заполнения'
  } else if (isNaN(ageNum) || ageNum < 0) {
    errors.age = 'Возраст должен быть положительным числом'
  } else if (ageNum > 240) {
    errors.age = 'Возраст не может превышать 240 месяцев (20 лет)'
  } else {
    errors.age = ''
  }
}

function validateLocation() {
  if (!location.value.trim()) {
    errors.location = 'Город обязателен для заполнения'
  } else if (location.value.length < 2) {
    errors.location = 'Город должен содержать минимум 2 символа'
  } else {
    errors.location = ''
  }
}

function validateImg() {
  if (!img.value.trim()) {
    errors.img = 'Ссылка на фото обязательна'
  } else {
    try {
      new URL(img.value)
      errors.img = ''
    } catch {
      errors.img = 'Введите корректную URL ссылку'
    }
  }
}

function validateDesc() {
  if (!desc.value.trim()) {
    errors.desc = 'Описание обязательно для заполнения'
  } else if (desc.value.length < 10) {
    errors.desc = 'Описание должно содержать минимум 10 символов'
  } else if (desc.value.length > 500) {
    errors.desc = 'Описание не должно превышать 500 символов'
  } else {
    errors.desc = ''
  }
}

const isFormValid = computed(() => {
  return name.value.trim() && 
         type.value.trim() && 
         breed.value.trim() && 
         age.value && 
         location.value.trim() && 
         img.value.trim() && 
         desc.value.trim() &&
         !errors.name && 
         !errors.type && 
         !errors.age && 
         !errors.breed && 
         !errors.location && 
         !errors.img && 
         !errors.desc
})

function submit() {
  // Validate all fields
  validateName()
  validateType()
  validateBreed()
  validateAge()
  validateLocation()
  validateImg()
  validateDesc()
  
  if (!isFormValid.value) {
    return
  }
  
  const newPet = {
    id: Date.now(),
    name: name.value.trim(),
    displayName: name.value.trim(),
    type: type.value.trim(),
    breed: breed.value.trim(),
    ageText: `${Math.floor(parseInt(age.value) / 12)} лет, ${parseInt(age.value) % 12} месяцев`,
    ageMonths: parseInt(age.value),
    gender: 'Неизвестен',
    location: location.value.trim(),
    img: img.value.trim(),
    desc: desc.value.trim()
  }
  emit('add', newPet)
  
  // Reset form
  name.value = ''
  type.value = ''
  age.value = ''
  breed.value = ''
  location.value = ''
  img.value = ''
  desc.value = ''
  
  // Clear errors
  Object.keys(errors).forEach(key => errors[key] = '')
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form h2 {
  margin: 0 0 12px 0;
  text-align: center;
  font-size: 22px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

input, textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(10, 20, 40, 0.1);
  font-size: 14px;
  background: #fafcff;
  outline: none;
  transition: 0.2s;
  box-sizing: border-box;
}

input.error, textarea.error {
  border-color: #ef4444;
  background: #fef2f2;
}

input:focus, textarea:focus {
  border-color: var(--accent, #ff7aa2);
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 122, 162, 0.15);
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 2px;
}

.btn {
  background: linear-gradient(90deg, var(--accent, #ff7aa2), #ffb3cf);
  border: none;
  color: white;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 4px;
  box-shadow: 0 6px 18px rgba(255, 122, 162, 0.18);
  transition: 0.25s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(255, 122, 162, 0.25);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
