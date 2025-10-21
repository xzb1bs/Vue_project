import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Pets from '@/pages/Pets.vue'
import PetDetails from '@/pages/PetDetails.vue'
import Login from '@/pages/Login.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/pets', name: 'Pets', component: Pets },
    { path: '/pets/:id', name: 'PetDetails', component: PetDetails },
    { path: '/login', name: 'Login', component: Login }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
