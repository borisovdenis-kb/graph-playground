import Vue from 'vue';
import Vuex from 'vuex';
import SVGGraph from '../core/SVGGraph';
import mutations from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    svgGraph: null,
    svgContainer: null,
    currentAction: '',
    currentDraggableSvgShape: null,
    bufferEdge: []
  },
  mutations: {
    [mutations.CREATE_GRAPH] (state) {
      state.svgGraph = new SVGGraph();
    },
    [mutations.SET_CURRENT_ACTION] (state, payload) {
      state.currentAction = payload.action;
    },
    [mutations.SET_SVG_CONTAINER] (state, payload) {
      state.svgContainer = payload.svgContainer;
    }
  }
});

export default store;
