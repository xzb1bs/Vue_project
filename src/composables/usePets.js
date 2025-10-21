// src/composables/usePets.js
import { ref, computed } from 'vue'
import { pets as initialPets } from '@/data/pets.js'

const STORAGE_KEY = 'qamqorlyq_v1'

// Загружаем либо из localStorage, либо из initialPets
function loadFromStorageOrInitial() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch (e) {
        console.warn('Не удалось прочитать localStorage', e)
    }
    // глубокая копия initialPets чтобы избежать мутаций исходного файла
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
    // явный сброс в initialPets (перезаписываем localStorage)
    list.value = JSON.parse(JSON.stringify(initialPets))
    save()
}

// Если хочешь полностью удалить localStorage:
function clearStorage() {
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch (e) {}
    list.value = JSON.parse(JSON.stringify(initialPets))
}

// вычисляемые наборы для фильтров
const types = computed(() => ['Все типы', ...Array.from(new Set(list.value.map(x => x.type)))])
const cities = computed(() => ['Все города', ...Array.from(new Set(list.value.map(x => x.location)))])
const genders = ['Любой', 'Мальчик', 'Девочка']

// HMR: при изменении файла pets.js в режиме dev автоматически перезагрузим данные
if (import.meta.hot) {
    // Когда pets.js изменится, перегрузим его содержимое
    import.meta.hot.accept('/src/data/pets.js', async () => {
        try {
            const m = await import('@/data/pets.js?t=' + Date.now()) // добавляем cache-bust
            // возьмём свежие данные из модуля (глубокая копия)
            const fresh = JSON.parse(JSON.stringify(m.pets ?? m.default ?? initialPets))
            // если в localStorage уже есть данные, не перезаписываем их автоматически,
            // но во время разработки часто нужно именно перезаписать — поэтому перезаписываем.
            list.value = fresh
            save()
            console.log('[HMR] pets.js обновлён — данные перезагружены')
        } catch (err) {
            console.warn('[HMR] не удалось перезагрузить pets.js', err)
        }
    })
}

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
