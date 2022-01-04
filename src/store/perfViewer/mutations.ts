import { MutationTree } from 'vuex';
import { DimData, PerfViewerState } from './state';

const mutation: MutationTree<PerfViewerState> = {
  setHighlight(state: PerfViewerState, payload: string[]) {
    state.highlightTypes = payload;
  },
  loadPerfData(
    state: PerfViewerState,
    payload: { profileData: string; dimData: Map<string, DimData> }
  ) {
    state.dimData = payload.dimData;
    state.profileData = payload.profileData;
  },
  selectDimension(state: PerfViewerState, payload: {dimension: string}) {
    state.currentDimension = payload.dimension
  }
};

export default mutation;
