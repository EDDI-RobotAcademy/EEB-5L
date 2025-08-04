import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import LaptopList from "../pages/list/LaptopList.vue";
import LaptopRegister from "../pages/register/LaptopRegister.vue";
import LaptopRead from "../pages/read/LaptopRead.vue";
import LaptopUpdate from "../pages/update/LaptopUpdate.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/list'
    },
    {
        path: '/list',
        name: 'LaptopList',
        component: LaptopList,
    },
    {
        path: '/register',
        name: 'LaptopRegister',
        component: LaptopRegister,
    },
    {
        path: '/read/:id',
        name: 'LaptopRead',
        components: { default: LaptopRead },
        props: { default: true },
    },
    {
        path: '/update/:id',
        name: 'LaptopUpdate',
        components: { default: LaptopUpdate },
        props: { default: true },
    },
]

const router = createRouter({
    history: createWebHistory('/laptop/'),
    routes,
})

export default router