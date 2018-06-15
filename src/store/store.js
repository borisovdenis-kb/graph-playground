import Vue from 'vue';
import Vuex from 'vuex';
import Graph from '../core/Graph';
import {ADD_VERTEX, CREATE_GRAPH} from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    graph: Graph
  },
  mutations: {
    [CREATE_GRAPH] (state, payload) {
      state.graph = new Graph(payload.svgContainer);
    },
    [ADD_VERTEX] (state, payload) {
      state.graph.addVertex(payload.id, payload.value);
    }
  }
});

export default store;
