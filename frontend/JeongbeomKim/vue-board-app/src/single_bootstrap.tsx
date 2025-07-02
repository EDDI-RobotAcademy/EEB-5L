import {createApp, h} from 'vue'
import type { App as VueApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

// import 'vuetify/styles' // Vuetify의 기본 스타일
// import '@mdi/font/css/materialdesignicons.css' // (선택) 아이콘 폰트

import { aliases } from 'vuetify/iconsets/mdi'
import * as mdi from '@mdi/js'
// npm install @mdi/js

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'

import { createVuetify } from 'vuetify/lib/framework.mjs'
import { createPinia } from 'pinia'
import router from './router'

let app: VueApp<Element> | null = null;

export const vueBoardAppMount = (el: string | Element, eventBus: any) => {
    loadFonts().then(() => {
        const vuetify = createVuetify({
            components: {
                ...components,
                ...labsComponents,
            },
            directives: {
                ...directives,
            },
            icons: {
                defaultSet: 'mdi',
                aliases,
                sets: {
                    mdi,
                },
            },
        });

        app = createApp({
            render: () => h(App, { eventBus }),
        });

        const pinia = createPinia();
        app.use(vuetify).use(router).use(pinia);
        app.provide('eventBus', eventBus);

        eventBus.on('vue-board-routing-event', (path: string) => {
            if (router.currentRoute.value.fullPath !== path) {
                router.push(path);
            }
        });

        app.mount(el);
    });
};

export const vueBoardAppUnmount = () => {
    if (app) {
        app.unmount();
        app = null;
    }
};

interface EventBus {
    listeners: { [eventName: string]: Function[] };
    on(eventName: string, callback: Function): void;
    off(eventName: string, callback: Function): void;
    emit(eventName: string, data: any): void;
}

const eventBus: EventBus = {
    listeners: {},

    on(eventName, callback) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    },

    off(eventName, callback) {
        if (!this.listeners[eventName]) {
            return;
        }
        const index = this.listeners[eventName].indexOf(callback);
        if (index !== -1) {
            this.listeners[eventName].splice(index, 1);
        }
    },

    emit(eventName, data) {
        if (!this.listeners[eventName]) {
            return;
        }
        this.listeners[eventName].forEach((callback) => {
            callback(data);
        });
    },
}

const root = document.querySelector('#vue-board-app')

if (root) { vueBoardAppMount(root, eventBus) }
