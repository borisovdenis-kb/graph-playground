import Vue from 'vue';
import Vuex from 'vuex';

import graph from './graph/graph.store';
import actionHistory from './actionHistory/actionHistory.store';

import {SET_CURRENT_PG_STATE} from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentPgState: '',
  },
  mutations: {
    [SET_CURRENT_PG_STATE] (state, payload) {
      state.currentPgState = payload.state;
    }
  },
  modules: {
    graph,
    actionHistory
  }
});

export default store;
