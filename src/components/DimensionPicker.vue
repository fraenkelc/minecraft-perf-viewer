<template>
    <div class="col-2">
        <q-select :options="dimensions" v-model="model" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from '../store';

export default defineComponent({
    name: 'DimensionPicker',
    setup() {
        const $store = useStore();
        const dimensions = computed(() => ($store.getters as {
            [x: string]: string[];
        })['perfViewer/dimensions']);
        const model = ref('overworld');

        watch(model, (currentValue) => {
            $store.commit('perfViewer/selectDimension', { dimension: currentValue });
        });

        return {
            model,
            dimensions
        };
    },
});
</script>
