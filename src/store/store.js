import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from "./mutations";
import svgGraph from './modules/svgGraph/svgGraph.store';
import commandHistory from './modules/commandHistory/commandHistory.store';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    svgContainer: null,
    currentAction: ''
  },
  mutations: {
    [mutations.CURRENT_ACTION_SET] (state, payload) {
      state.currentAction = payload.action;
    },
    [mutations.SVG_CONTAINER_SET] (state, payload) {
      state.svgContainer = payload.svgContainer;
    }
  },
  modules: {
    svgGraph,
    commandHistory
  }
});

export default store;
