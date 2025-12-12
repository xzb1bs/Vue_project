import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { 
        path: '/', 
        name: 'Home', 
        component: () => import('@/Pages/Home.vue')
    },
    { 
        path: '/login', 
        name: 'Login', 
        component: () => import('@/Pages/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/Pages/Register.vue')
    },
    {
        path: '/pets',
        component: () => import('@/Pages/PetDetailsWrapper.vue'),
        children: [
            {
                path: '',
                name: 'Pets',
                component: () => import('@/Pages/Pets.vue')
            },
            {
                path: ':id',
                name: 'PetDetails',
                component: () => import('@/Pages/PetDetails.vue')
            }
        ]
    },
    {
        path: '/pets-api',
        name: 'PetsApi',
        component: () => import('@/Pages/PetsApi.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/Pages/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
    // Example: Check if user is logged in for protected routes
    const protectedRoutes = ['/pets'] // Add routes that require auth
    const isProtected = protectedRoutes.some(route => to.path.startsWith(route))
    
    if (isProtected) {
        // You can add auth check here
        // For now, we'll just allow access
        next()
    } else {
        next()
    }
})

export default router
