<template>
    <div>
        <DropZoneComponent @file-added="fileAdded" />
    </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';
import { useStore } from '../store';
import DropZoneComponent from './DropZoneComponent.vue';

export default defineComponent({
    name: 'PerfZipSelector',
    setup() {
        const $store = useStore();
        const $q = useQuasar();
        const fileAdded = async function (file: ArrayBuffer): Promise<void> {
            try {
                await $store.dispatch('perfViewer/setPerfFileContents', file)
            } catch (e) {
                console.error(e)
                $q.notify({
                    type: 'negative',
                    message: 'Failed to load zip file.'
                })
            }
        }
        return {
            fileAdded
        };
    },
    components: { DropZoneComponent }
});

</script>


<style>
</style>