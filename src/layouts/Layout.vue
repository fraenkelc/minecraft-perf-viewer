<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-avatar square>
                    <img src="../assets/minecraft-logo.svg" />
                </q-avatar>
                <q-toolbar-title>Minecraft /perf viewer</q-toolbar-title>
                <q-space />
                <DimensionPicker />
                <PerfZipSelector />
            </q-toolbar>

            <q-tabs align="left">
                <q-route-tab to="/" label="Index" />
                <q-route-tab to="/maps/entity" label="Entity map" />
                <q-route-tab to="/maps/block" label="Blocks map" />
                <q-route-tab to="/maps/chunk" label="Chunk map" />
            </q-tabs>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PerfZipSelector from 'src/components/PerfZipSelector.vue'
import DimensionPicker from 'src/components/DimensionPicker.vue'

export default defineComponent({
    name: 'AppLayout',

    components: {
        PerfZipSelector,
        DimensionPicker
    },

    setup() {
        return {
        }
    }
})

</script>