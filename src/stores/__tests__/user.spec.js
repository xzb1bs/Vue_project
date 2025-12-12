import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../user.js'

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('initializes with logged out state', () => {
    const store = useUserStore()
    
    expect(store.isLoggedIn).toBe(false)
    expect(store.user).toBe(null)
    expect(store.userEmail).toBe('')
  })

  it('logs in user correctly', () => {
    const store = useUserStore()
    
    store.login('test@example.com', 'Test User')
    
    expect(store.isLoggedIn).toBe(true)
    expect(store.userEmail).toBe('test@example.com')
    expect(store.userName).toBe('Test User')
    expect(store.user.email).toBe('test@example.com')
  })

  it('logs out user correctly', () => {
    const store = useUserStore()
    
    store.login('test@example.com', 'Test User')
    expect(store.isLoggedIn).toBe(true)
    
    store.logout()
    
    expect(store.isLoggedIn).toBe(false)
    expect(store.user).toBe(null)
    expect(store.userEmail).toBe('')
  })

  it('checks auth from localStorage', () => {
    const store = useUserStore()
    
    localStorage.setItem('qamqorlyq_user', JSON.stringify({
      email: 'stored@example.com',
      name: 'Stored User',
      isLoggedIn: true,
      loginTime: Date.now()
    }))
    
    store.checkAuth()
    
    expect(store.isLoggedIn).toBe(true)
    expect(store.userEmail).toBe('stored@example.com')
  })

  it('getters return correct values', () => {
    const store = useUserStore()
    
    store.login('test@example.com', 'Test Name')
    
    expect(store.userEmail).toBe('test@example.com')
    expect(store.userName).toBe('Test Name')
  })
})

