import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { PerfViewerState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const perfViewerModule: Module<PerfViewerState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default perfViewerModule;
