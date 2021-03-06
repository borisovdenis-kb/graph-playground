import Vue from 'vue';
import Vuex from 'vuex';

import graph from './graph/graph.store';
import commandHistory from './commandHistory/commandHistory.store';

import {
  SET_CURRENT_PG_STATE,
  RESET_CURRENT_PG_STATE,
  SET_SELECTED_ALGORITHM
} from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentPgState: '',
    selectedAlgorithm: ''
  },
  mutations: {
    [SET_CURRENT_PG_STATE] (state, payload) {
      state.currentPgState = payload.state;
    },
    [RESET_CURRENT_PG_STATE] (state) {
      state.currentPgState = '';
    },
    [SET_SELECTED_ALGORITHM] (state, payload) {
      state.selectedAlgorithm = payload.selectedAlgorithm;
    }
  },
  modules: {
    graph,
    commandHistory
  }
});

export default store;
