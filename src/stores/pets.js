import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { pets as initialPets } from '@/data/pets.js'

const STORAGE_KEY = 'qamqorlyq_v1'

export const usePetsStore = defineStore('pets', () => {
  
  const pets = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        pets.value = JSON.parse(raw)
        return
      }
    } catch (e) {
      console.warn('Не удалось прочитать localStorage', e)
    }
    pets.value = JSON.parse(JSON.stringify(initialPets))
  }
  
  
  const petsCount = computed(() => pets.value.length)
  const likedPets = computed(() => pets.value.filter(p => p.liked))
  const types = computed(() => ['Все типы', ...Array.from(new Set(pets.value.map(x => x.type)))])
  const cities = computed(() => ['Все города', ...Array.from(new Set(pets.value.map(x => x.location)))])
  
  function getById(id) {
    return pets.value.find(p => p.id === id)
  }
  
  function add(pet) {
    pets.value.unshift(pet)
    save()
  }
  
  function remove(id) {
    pets.value = pets.value.filter(p => p.id !== id)
    save()
  }
  
  function toggleLike(id) {
    const p = getById(id)
    if (!p) return
    p.liked = !p.liked
    save()
  }
  
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pets.value))
    } catch (e) {
      console.warn('Не удалось записать localStorage', e)
    }
  }
  
  function reset() {
    pets.value = JSON.parse(JSON.stringify(initialPets))
    save()
  }
  
 
  loadFromStorage()
  
  return {
    pets,
    loading,
    error,

    petsCount,
    likedPets,
    types,
    cities,

    getById,
    add,
    remove,
    toggleLike,
    reset,
    loadFromStorage
  }
})

