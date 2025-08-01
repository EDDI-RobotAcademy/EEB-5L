import { defineStore } from 'pinia'
import { laptopState } from './laptopState'
import { laptopActions } from './laptopActions'

export const useLaptopStore = defineStore('laptopStore', {
    state: laptopState,
    actions: laptopActions,
})
