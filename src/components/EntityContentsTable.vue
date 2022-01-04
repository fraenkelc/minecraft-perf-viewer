<template>
    <div>
        <q-table
            :title="title"
            :rows="rows"
            :columns="columns"
            row-key="uuid"
            :filter="filter"
            selection="multiple"
            v-model:selected="selected"
        >
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
import { csvParse, DSVRowString } from 'd3';
import { defineComponent, ref, computed } from 'vue';
import { useStore } from '../store'

const columns = [
    { name: 'x', label: 'X', field: 'x', format: (val: string) => parseFloat(val).toFixed(), sortable: true, sort: (a: string, b: string): number => parseFloat(a) - parseFloat(b) },
    { name: 'y', label: 'Y', field: 'y', format: (val: string) => parseFloat(val).toFixed(), sortable: true, sort: (a: string, b: string): number => parseFloat(a) - parseFloat(b) },
    { name: 'z', label: 'Z', field: 'z', format: (val: string) => parseFloat(val).toFixed(), sortable: true, sort: (a: string, b: string): number => parseFloat(a) - parseFloat(b) },
    { name: 'type', label: 'Type', field: 'type', sortable: true },
    { name: 'display_name', label: 'Display name', field: 'display_name', sortable: true },
]

export default defineComponent({
    name: 'EntityContentsTable',
    props: {
        csvData: { type: String, required: true },
        title: { type: String, required: true }
    },

    /*
    computed: {
        rows() {
            return csvParse(this.csvData)
        }
    },

    data() {
        return {
            selected: []
        }
    },
*/
    watch: {
        selected(val: DSVRowString<string>[]) {
            this.updateHighlight(val.map(value => value.type ?? 'unknown'))
        }
    },
    setup(props) {
        const $store = useStore()

        const filter = ref('');
        const selected = ref([])
        const rows = computed(() => csvParse(props.csvData));
        const updateHighlight = (selection: string[]) => $store.commit('perfViewer/setHighlight', selection)

        return {
            columns, filter, selected, rows, updateHighlight
        }
    },
});

</script>

<style>
</style>