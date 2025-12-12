// API для работы с пользователями
const USERS_STORAGE_KEY = 'qamqorlyq_users'

// Получить всех зарегистрированных пользователей
export function getRegisteredUsers() {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY)
    return users ? JSON.parse(users) : []
  } catch (e) {
    console.warn('Error reading users:', e)
    return []
  }
}

// Сохранить зарегистрированных пользователей
export function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  } catch (e) {
    console.warn('Error saving users:', e)
  }
}

// Регистрация нового пользователя
export function registerUser(email, password, name = '') {
  const users = getRegisteredUsers()
  
  // Проверка, существует ли пользователь
  if (users.find(u => u.email === email)) {
    throw new Error('Пользователь с таким email уже существует')
  }
  
  // Добавляем нового пользователя
  const newUser = {
    email,
    password, // В реальном приложении пароль должен быть захеширован
    name,
    registeredAt: Date.now()
  }
  
  users.push(newUser)
  saveRegisteredUsers(users)
  
  return newUser
}

// Авторизация пользователя
export function loginUser(email, password) {
  const users = getRegisteredUsers()
  
  // Ищем пользователя
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    throw new Error('Неверный email или пароль')
  }
  
  return {
    email: user.email,
    name: user.name
  }
}

// Добавляем демо пользователя при первой загрузке
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

// Инициализация при импорте
initDemoUser()

