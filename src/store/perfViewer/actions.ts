import { ZipHandler } from 'src/ZipHandler';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PerfViewerState } from './state';

const actions: ActionTree<PerfViewerState, StateInterface> = {
  async setPerfFileContents(context, file: ArrayBuffer) {
    const data = await ZipHandler.fromFile(file);
    context.commit('loadPerfData', data);
  },
};

export default actions;
