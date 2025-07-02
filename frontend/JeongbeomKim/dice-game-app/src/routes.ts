// routes.ts (수동 라우팅 정의 시 정확한 구조)
import DiceGameHome from './pages/DiceGameHome.svelte';
// import DiceGamePlay from './pages/DiceGamePlay.svelte';

export const routes = [
    {
        path: '/',
        name: 'home',
        component: DiceGameHome
    },
    // {
    //     path: '/play',
    //     name: 'play',
    //     component: DiceGamePlay
    // }
];
