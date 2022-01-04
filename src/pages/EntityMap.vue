<template>
  <q-page padding>
    <div class="row no-wrap">
      <div class="col-grow">
        <EntitiesChart :csv-data="csvData" />
      </div>
      <div class="col-4">
        <EntityContentsTable title="Entities" :csv-data="csvData" />
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
import EntityContentsTable from 'src/components/EntityContentsTable.vue';
import ProfilingTreeComponent from 'src/components/ProfilingTreeComponent.vue';
import { computed, defineComponent } from 'vue';
import EntitiesChart from '../components/EntitiesChart.vue';
import { useStore } from '../store';

export default defineComponent({
  name: 'EntityMap',

  components: {
    EntitiesChart,
    EntityContentsTable,
    ProfilingTreeComponent
  },
  setup() {
    const $store = useStore();
    const csvData = computed(() => ($store.getters as {
      [x: string]: string;
    })['perfViewer/currentEntityData']);
    const profileData = computed(() => $store.state.perfViewer.profileData);
    return { csvData, profileData }
  }
})

</script>
