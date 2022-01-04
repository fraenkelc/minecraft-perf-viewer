<template>
    <q-resize-observer @resize="updatePlot" />
    <div ref="plotContainerRef"></div>
</template>

<script lang="ts">
import { csvParse } from 'd3';
import * as Plotly from 'plotly.js';
import { ScatterData } from 'plotly.js';
import { useQuasar } from 'quasar';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
    name: 'ChunkMapComponent',
    props: { csvData: { type: String, required: true } },

    setup(props) {
        const plotContainerRef = ref<HTMLDivElement | null>(null)
        const $q = useQuasar()

        function updatePlot() {
            if (plotContainerRef.value) {
                const parsed = csvParse(props.csvData);
                var x1 = [], y1 = [], s1 = [], x2 = [], y2 = [], s2 = [];

                for (var i = 0; i < parsed.length; i++) {
                    var row = parsed[i];
                    if (row['visibility'] == 'TICKING') {
                        x1.push(row['x']);
                        y1.push(row['z']);
                        s1.push(+(row['entity_count'] ?? '1'));
                    } else {
                        x2.push(row['x']);
                        y2.push(row['z']);
                        s2.push(+(row['entity_count'] ?? '1'));
                    }
                }

                var trace1 = {
                    x: x1,
                    y: y1,
                    mode: 'markers',
                    type: 'scatter',
                    name: 'TICKING',
                    text: s1.map((value) => `Count: ${value}`),
                    marker: { size: s1 }
                } as ScatterData;

                var trace2 = {
                    x: x2,
                    y: y2,
                    mode: 'markers',
                    type: 'scatter',
                    name: 'TRACKED',
                    text: s2.map((value) => `Count: ${value}`),
                    marker: { size: s2 }
                } as ScatterData;


                var data = [trace1, trace2];

                var layout = {
                    autosize: true,
                    //width: 700,
                    //height: 500,
                    xaxis: {
                        autorange: true,
                        scaleanchor: 'y' as Plotly.AxisName,
                        scaleratio: 1
                    },
                    yaxis: {
                        autorange: 'reversed'
                    } as Plotly.Axis,
                    plot_bgcolor: $q.dark.isActive ? '#121212' : '#fff',
                    paper_bgcolor: $q.dark.isActive ? '#121212' : '#fff'
                };

                Plotly.react(plotContainerRef.value, data, layout).catch(e => {
                    $q.notify({
                        type: 'negative',
                        message: 'Failed to plot data.'
                    }); console.error(e)
                });
            }
        }

        onMounted(() => {
            updatePlot();
        });

        return { plotContainerRef, updatePlot };
    },
    watch: {
        csvData() {
            this.updatePlot();
        }
    },
});

</script>

<style>
</style>