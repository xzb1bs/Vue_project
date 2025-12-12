<template>
  <div class="card">
    <div class="filters">
      <input 
        v-model="q" 
        placeholder="Поиск по имени или описанию" 
        class="input"
        :class="{ 'has-filters': filterState.hasActiveFilters }"
      />
      <select v-model="city" class="input" :class="{ 'has-filters': filterState.hasActiveFilters }">
        <option v-for="c in cities" :key="c">{{ c }}</option>
      </select>
      <select v-model="type" class="input" :class="{ 'has-filters': filterState.hasActiveFilters }">
        <option v-for="t in types" :key="t">{{ t }}</option>
      </select>
      <select v-model="gender" class="input" :class="{ 'has-filters': filterState.hasActiveFilters }">
        <option v-for="g in genders" :key="g">{{ g }}</option>
      </select>
      <button class="btn btn-primary" @click="apply">Применить</button>
      <button 
        class="btn-ghost" 
        @click="reset"
        v-show="filterState.hasActiveFilters"
      >
        Сброс
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, watchEffect, onMounted, onUnmounted, onUpdated } from 'vue'
const props = defineProps({ types: Array, cities: Array, genders: Array })
const emit = defineEmits(['search'])

const q = ref('')
const city = ref(props.cities?.[0] ?? 'Все города')
const type = ref(props.types?.[0] ?? 'Все типы')
const gender = ref(props.genders?.[0] ?? 'Любой')

// Using reactive for filter state
const filterState = reactive({
  hasActiveFilters: false,
  lastApplied: null
})

// Using watchEffect to track filter changes
watchEffect(() => {
  filterState.hasActiveFilters = q.value.trim() !== '' || 
                                  city.value !== (props.cities?.[0] ?? 'Все города') ||
                                  type.value !== (props.types?.[0] ?? 'Все типы') ||
                                  gender.value !== (props.genders?.[0] ?? 'Любой')
})

// Using watch to debounce search
let searchTimeout = null
watch([q, city, type, gender], () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  // Auto-apply after 500ms of inactivity (optional feature)
  // searchTimeout = setTimeout(apply, 500)
})

function apply(){ 
  filterState.lastApplied = Date.now()
  emit('search', { q: q.value, city: city.value, type: type.value, gender: gender.value }) 
}

function reset(){ 
  q.value=''
  city.value = props.cities?.[0] ?? 'Все города'
  type.value = props.types?.[0] ?? 'Все типы'
  gender.value = props.genders?.[0] ?? 'Любой'
  apply() 
}

onMounted(() => {
  console.log('SearchBar component mounted')
  // Apply initial filter
  apply()
})

onUpdated(() => {
  // Component updated - can be used for tracking
  // console.log('SearchBar component updated')
})

onUnmounted(() => {
  // Cleanup
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  console.log('SearchBar component unmounted')
})
</script>

<style scoped>
.card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.input.has-filters {
  border-color: var(--accent, #ff7aa2);
  box-shadow: 0 0 0 2px rgba(255, 122, 162, 0.1);
}

.input:focus {
  outline: none;
  border-color: var(--accent, #ff7aa2);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(90deg, var(--accent, #ff7aa2), #ffb3cf);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 122, 162, 0.3);
}

.btn-ghost {
  background: transparent;
  border: 1px solid #ddd;
  color: #666;
}

.btn-ghost:hover {
  background: #f5f5f5;
}
</style>
