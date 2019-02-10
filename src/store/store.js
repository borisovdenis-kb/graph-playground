import Vue from 'vue';
import Vuex from 'vuex';
import SVGGraph from '../core/svg/SVGGraph';
import mutations from "./mutations";
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    svgGraph: null,
    svgContainer: null,
    commandHistory: null,
    currentAction: ''
  },
  mutations: {
    [mutations.SVG_GRAPH_CREATE] (state) {
      state.svgGraph = new SVGGraph();
    },
    [mutations.CURRENT_ACTION_SET] (state, payload) {
      state.currentAction = payload.action;
    },
    [mutations.SET_SVG_CONTAINER] (state, payload) {
      state.svgContainer = payload.svgContainer;
    },
    [mutations.COMMAND_HISTORY_SET] (state, payload) {
      state.commandHistory = payload.commandHistory;
    },
    [mutations.COMMAND_HISTORY_LOG] (state, payload) {
      state.commandHistory.logCommand(payload.command);
    },
    [mutations.COMMAND_HISTORY_UNDO] (state) {
      state.commandHistory.undoLastCommand();
    }
  },
  getters: {
    [getters.GET_SVG_GRAPH] (state) {
      return state.svgGraph;
    },
    [getters.GET_COMMAND_HISTORY] (state) {
      return state.commandHistory;
    },
    [getters.GET_CURRENT_ACTION] (state) {
      return state.currentAction;
    }
  }
});

export default store;
