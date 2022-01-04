<template>
    <div>
        <q-table title="Chunk contents" :rows="rows" :columns="columns" row-key="name" :filter="filter">
            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
        </q-table>
    </div>
</template>

<script lang="ts">
import { csvParse } from 'd3';
import { defineComponent, ref } from 'vue';

const columns = [
    { name: 'x', label: 'Chunk X', field: 'x', sortable: true, sort: (a: string, b: string): number => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'y', label: 'Chunk Y', field: 'y', sortable: true, sort: (a: string, b: string): number => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'z', label: 'Chunk Z', field: 'z', sortable: true, sort: (a: string, b: string): number => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'visibility', label: 'Visibility', field: 'visibility', sortable: true },
    { name: 'load_status', label: 'Load status', field: 'load_status', sortable: true, sort: (a: string, b: string): number => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'entity_count', label: 'Entity count', field: 'entity_count', sortable: true, sort: (a: string, b: string): number => parseInt(a, 10) - parseInt(b, 10) },
]

export default defineComponent({
    name: 'ChunkContentsTable',
    props: { csvData: { type: String, required: true } },

    computed: {
        rows() {
            return csvParse(this.csvData)
        }
    },

    setup() {
        const filter = ref('');
        return {
            columns, filter
        }
    },
});

</script>

<style>
</style>