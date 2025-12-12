import { ref } from 'vue'

export function useApi(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const json = await response.json()
      data.value = json
      return json
    } catch (err) {
      error.value = err.message || 'An error occurred while fetching data'
      console.error('API Error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    data,
    loading,
    error,
    fetchData
  }
}

