<template>
  <q-page padding>
    <div class="row no-wrap">
      <div class="col-grow">
        <ChunkMapComponent :csv-data="dataToDisplay" />
      </div>
      <div class="col-shrink">
        <ChunkContentsTableVue :csv-data="dataToDisplay" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import ChunkMapComponent from '../components/ChunkMapComponent.vue'
import ChunkContentsTableVue from 'src/components/ChunkContentsTable.vue';
import { useStore } from '../store';

export default defineComponent({
  name: 'ChunkMap',

  components: {
    ChunkMapComponent, ChunkContentsTableVue
  },
  setup() {
    const $store = useStore();
    const dataToDisplay = computed(() => ($store.getters as {
      [x: string]: string;
    })['perfViewer/currentChunkData']);
    return { dataToDisplay }
  },

})

</script>
