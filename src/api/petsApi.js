import { pets } from '@/data/pets.js'

// Симуляция API запроса с задержкой
export async function fetchPetsFromApi() {
  // Симулируем задержку сети (1-2 секунды)
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
  
  // Симулируем возможность ошибки (10% шанс)
  if (Math.random() < 0.1) {
    throw new Error('Ошибка загрузки данных с сервера. Попробуйте позже.')
  }
  
  // Возвращаем данные о питомцах с дополнительными полями для API
  return pets.map(pet => ({
    ...pet,
    liked: false, // Сбрасываем лайки для данных из API
    source: 'api' // Помечаем что данные пришли из API
  }))
}

