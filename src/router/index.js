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

router.beforeEach((to, from, next) => {
    const protectedRoutes = ['/pets']
    const isProtected = protectedRoutes.some(route => to.path.startsWith(route))
    
    if (isProtected) {
        next()
    } else {
        next()
    }
})

export default router
