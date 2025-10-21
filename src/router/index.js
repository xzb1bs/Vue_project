import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Pets from '@/pages/Pets.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/pets', name: 'Pets', component: Pets }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
