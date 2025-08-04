import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import LaptopList from "../pages/list/LaptopList.vue";
import LaptopRegister from "../pages/register/LaptopRegister.vue";
import LaptopRead from "../pages/read/LaptopRead.vue";
// import VueBoardUpdate from "../pages/update/VueBoardUpdate.vue";

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
    // {
    //     path: '/update/:boardId',
    //     name: 'VueBoardUpdate',
    //     components: { default: VueBoardUpdate },
    //     props: { default: true },
    // },
]

const router = createRouter({
    history: createWebHistory('/laptop/'),
    routes,
})

export default router