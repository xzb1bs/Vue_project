import { pets } from '@/data/pets.js'

export async function fetchPetsFromApi() {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
  
  if (Math.random() < 0.1) {
    throw new Error('Ошибка загрузки данных с сервера. Попробуйте позже.')
  }
  
  return pets.map(pet => ({
    ...pet,
    liked: false, 
    source: 'api'
  }))
}

