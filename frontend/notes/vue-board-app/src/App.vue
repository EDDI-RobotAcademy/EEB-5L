<template>
    <v-app style="height: 100%; width: 100%">
        <v-main style="height: 100%; width: 100%">
            <router-view />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineComponent({});
</script>

<style>
html, body, #app, .v-application, .v-main {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>
