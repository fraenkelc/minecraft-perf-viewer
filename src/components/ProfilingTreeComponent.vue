<template>
    <q-card>
        <q-card-section>
            <div class="text-h6">Profiling report</div>
        </q-card-section>
        <q-card-section>
            <q-hierarchy :columns="columns" :data="nodes"></q-hierarchy>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ProfileReport } from '../model';


const columns = [
    {
        name: 'text',
        label: 'event',
        align: 'left',
        field: 'text',
        sortable: false
    },
    {
        name: 'pctParent',
        label: '% of Parent',
        sortable: true,
        field: 'pctParent',
        align: 'right'
    },
    {
        name: 'pctTotal',
        label: '% of Total',
        sortable: true,
        field: 'pctTotal',
        align: 'right'
    },
];

export default defineComponent({
    name: 'ProfilingTreeComponent',
    props: { profileData: { type: String, required: true } },

    computed: {
        nodes() {
            return new ProfileReport(this.profileData).root.children
        }
    },

    setup() {
        const filter = ref('');
        const filterRef = ref<HTMLElement | null>(null)
        return {
            filter,
            columns,
            resetFilter() {
                filter.value = ''
                filterRef.value?.focus()
            }

        }
    },
});

</script>


<style>
</style>