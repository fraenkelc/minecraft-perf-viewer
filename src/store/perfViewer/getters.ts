import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PerfViewerState } from './state';

const getters: GetterTree<PerfViewerState, StateInterface> = {
  currentChunkData(context) {
    return context.dimData.get(context.currentDimension)?.chunkEntityCsv ?? '';
  },
  currentEntityData(context) {
    return context.dimData.get(context.currentDimension)?.entityCsv ?? '';
  },
  currentBlockData(context) {
    return context.dimData.get(context.currentDimension)?.blockCsv ?? '';
  },
  dimensions(context) {
    return [...context.dimData.keys()];
  },
};

export default getters;
