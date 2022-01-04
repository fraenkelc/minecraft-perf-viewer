<template>
  <q-page padding>
    <div class="row no-wrap">
      <div class="col-grow">
        <EntitiesChart :csv-data="csvData" group-by="type"/>
      </div>
      <div class="col-4">
        <EntityContentsTable title="Block entities" :csv-data="csvData" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ProfilingTreeComponent :profile-data="profileData" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import EntitiesChart from '../components/EntitiesChart.vue';
import EntityContentsTable from '../components/EntityContentsTable.vue';
import ProfilingTreeComponent from '../components/ProfilingTreeComponent.vue';
import { useStore } from '../store';

export default defineComponent({
  name: 'BlockMap',

  components: {
    EntitiesChart,
    EntityContentsTable,
    ProfilingTreeComponent
  },
  setup() {
    const $store = useStore();
    const csvData = computed(() => ($store.getters as {
      [x: string]: string;
    })['perfViewer/currentBlockData'])
    const profileData = computed(() => $store.state.perfViewer.profileData)
    return { csvData, profileData }
  }
})

</script>
