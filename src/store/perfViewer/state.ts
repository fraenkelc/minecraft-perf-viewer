export interface DimData {
  chunkEntityCsv: string;
  entityCsv: string;
  blockCsv: string;
}
export interface PerfViewerState {
  highlightTypes: string[];
  currentDimension: string;
  profileData: string;
  dimData: Map<string, DimData>;
}

function state(): PerfViewerState {
  return {
    highlightTypes: [],
    currentDimension: 'overworld',
    profileData: '',
    dimData: new Map(),
  };
}

export default state;
