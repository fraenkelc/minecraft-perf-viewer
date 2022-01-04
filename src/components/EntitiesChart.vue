<template>
    <div>
        <q-resize-observer @resize="updatePlot" />
        <div ref="plotContainerRef"></div>
    </div>
</template>

<script lang="ts">
import { csvParse } from 'd3';
import * as Plotly from 'plotly.js';
import { ScatterData } from 'plotly.js';
import { useQuasar } from 'quasar';
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useStore } from '../store'

export default defineComponent({
    name: 'EntitiesChart',
    props: {
        csvData: { type: String, required: true },
        groupBy: { type: String },
    },

    setup(props) {

        const plotContainerRef = ref<HTMLDivElement | null>(null)
        const $q = useQuasar()
        const $store = useStore()

        const highlightTypes = computed(() => $store.state.perfViewer.highlightTypes /*, {
            onTrack(e) {
                // triggered when count.value is tracked as a dependency
                debugger
            },
            onTrigger(e) {
                // triggered when count.value is mutated
                debugger
            }
        }*/
        );

        const updatePlot = () => {
            const groupKey = props.groupBy ?? 'display_name'
            if (plotContainerRef.value) {
                const csvText = props.csvData
                const parsed = csvParse(csvText)
                interface trc { x: string[]; y: string[], type: string }
                var traces = new Map<string, trc>()

                for (var i = 0; i < parsed.length; i++) {
                    var row = parsed[i];
                    const displayName = row[groupKey] ?? 'unknown'

                    var trace = traces.get(displayName);
                    if (!trace) {
                        trace = { x: [], y: [], type: row['type'] ?? 'unknown' };
                        traces.set(displayName, trace);
                    }
                    trace.x.push(row['x'] ?? '');
                    trace.y.push(row['z'] ?? '');
                }

                var data = new Map<[string, string], ScatterData[]>();

                traces.forEach(function (value, key) {
                    const isVisible = (highlightTypes.value.length === 0 || highlightTypes.value.includes(value.type)) ? true : 'legendonly';
                    var typeTraces = data.get([value.type, key]);
                    if (!typeTraces) {
                        typeTraces = [];
                        data.set([value.type, key], typeTraces)
                    }
                    typeTraces.push(
                        {
                            x: value.x,
                            y: value.y,
                            mode: 'markers',
                            type: 'scattergl',
                            name: key,
                            marker: { size: 10 },
                            visible: isVisible,
                        } as ScatterData);
                });
                var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const plotData = [...data].sort(function ([[type1, displayName1], value1], [[type2, displayName2], value2]) {
                    if (type1 === 'minecraft:player') {
                        return -1;
                    } else if (type2 === 'minecraft:player') {
                        return 1;
                    }
                    var intermediate = collator.compare(type1, type2)
                    if (intermediate !== 0) return intermediate;
                    return collator.compare(displayName1, displayName2);
                }).map(([, value]) => value)
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

                Plotly.react(plotContainerRef.value, ([] as Plotly.PlotData[]).concat(...plotData), layout).catch(e => {
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

        return { plotContainerRef, updatePlot, highlightTypes };
    },
    watch: {
        csvData() {
            this.updatePlot();
        },
        highlightTypes() {
            this.updatePlot();
        }
    },

});

</script>

<style>
</style>