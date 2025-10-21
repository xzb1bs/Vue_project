<template>
  <div class="card">
    <div class="filters">
      <input v-model="q" placeholder="Поиск по имени или описанию" class="input" />
      <select v-model="city" class="input">
        <option v-for="c in cities" :key="c">{{ c }}</option>
      </select>
      <select v-model="type" class="input">
        <option v-for="t in types" :key="t">{{ t }}</option>
      </select>
      <select v-model="gender" class="input">
        <option v-for="g in genders" :key="g">{{ g }}</option>
      </select>
      <button class="btn btn-primary" @click="apply">Применить</button>
      <button class="btn-ghost" @click="reset">Сброс</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ types: Array, cities: Array, genders: Array })
const emit = defineEmits(['search'])
const q = ref('')
const city = ref(props.cities?.[0] ?? 'Все города')
const type = ref(props.types?.[0] ?? 'Все типы')
const gender = ref(props.genders?.[0] ?? 'Любой')

function apply(){ emit('search', { q: q.value, city: city.value, type: type.value, gender: gender.value }) }
function reset(){ q.value=''; city.value = props.cities?.[0] ?? 'Все города'; type.value = props.types?.[0] ?? 'Все типы'; gender.value = props.genders?.[0] ?? 'Любой'; apply() }
</script>
