<template>
  <q-page class="row items-center justify-evenly">
    <q-card>
      <div>Load a minecraft /perf file using the Load file button.</div>
      <perf-zip-selector />
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PerfZipSelector from '../components/PerfZipSelector.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { PerfZipSelector },
  setup() {
    return {};
  }
});
</script>
