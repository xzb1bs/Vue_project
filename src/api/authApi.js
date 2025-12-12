const USERS_STORAGE_KEY = 'qamqorlyq_users'

export function getRegisteredUsers() {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY)
    return users ? JSON.parse(users) : []
  } catch (e) {
    console.warn('Error reading users:', e)
    return []
  }
}

export function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  } catch (e) {
    console.warn('Error saving users:', e)
  }
}

export function registerUser(email, password, name = '') {
  const users = getRegisteredUsers()
  
  if (users.find(u => u.email === email)) {
    throw new Error('Пользователь с таким email уже существует')
  }
  
  const newUser = {
    email,
    password,
    name,
    registeredAt: Date.now()
  }
  
  users.push(newUser)
  saveRegisteredUsers(users)
  
  return newUser
}

export function loginUser(email, password) {
  const users = getRegisteredUsers()
  
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    throw new Error('Неверный email или пароль')
  }
  
  return {
    email: user.email,
    name: user.name
  }
}

export function initDemoUser() {
  const users = getRegisteredUsers()
  const demoEmail = 'admin@qamqorlyq.com'
  
  if (!users.find(u => u.email === demoEmail)) {
    users.push({
      email: demoEmail,
      password: 'admin123',
      name: 'Администратор',
      registeredAt: Date.now()
    })
    saveRegisteredUsers(users)
  }
}

initDemoUser()

