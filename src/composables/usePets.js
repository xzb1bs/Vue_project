import { ref, computed } from 'vue'
import { pets as initialPets } from '@/data/pets.js'

const STORAGE_KEY = 'qamqorlyq_v1'

function loadFromStorageOrInitial() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch (e) {
        console.warn('Не удалось прочитать localStorage', e)
    }
    return JSON.parse(JSON.stringify(initialPets))
}

const list = ref(loadFromStorageOrInitial())

function save() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list.value))
    } catch (e) {
        console.warn('Не удалось записать localStorage', e)
    }
}

function getById(id) {
    return list.value.find(p => p.id === id)
}

function add(pet) {
    list.value.unshift(pet)
    save()
}

function remove(id) {
    list.value = list.value.filter(p => p.id !== id)
    save()
}

function toggleLike(id) {
    const p = getById(id)
    if (!p) return
    p.liked = !p.liked
    save()
}

function reset() {
    list.value = JSON.parse(JSON.stringify(initialPets))
    save()
}

function clearStorage() {
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch (e) {}
    list.value = JSON.parse(JSON.stringify(initialPets))
}

const types = computed(() => ['Все типы', ...Array.from(new Set(list.value.map(x => x.type)))])
const cities = computed(() => ['Все города', ...Array.from(new Set(list.value.map(x => x.location)))])
const genders = ['Любой', 'Мальчик', 'Девочка']

export function usePets() {
    return {
        list,
        getById,
        add,
        remove,
        toggleLike,
        reset,
        clearStorage,
        types,
        cities,
        genders
    }
}
