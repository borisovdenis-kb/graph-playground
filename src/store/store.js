import Vue from 'vue';
import Vuex from 'vuex';
import Graph from '../core/Graph';
import {
  ADD_VERTEX,
  CREATE_GRAPH,
  ADD_RELATION,
  CHANGE_CURRENT_ACTION,
  ADD_VERTEX_TO_BUFFER_EDGE,
  CLEAR_BUFFER_EDGE
} from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    graph: Graph,
    currentAction: '',
    bufferEdge: []
  },
  mutations: {
    [CREATE_GRAPH] (state, payload) {
      state.graph = new Graph(payload.svgContainer);
    },
    [ADD_VERTEX] (state, payload) {
      state.graph.addVertex(payload.id, payload.value, payload.coordinate);
    },
    [ADD_RELATION] (state, payload) {
      state.graph.addRelation(payload.vertexOneId, payload.vertexTwoId);
    },
    [CHANGE_CURRENT_ACTION] (state, payload) {
      state.currentAction = payload.action;
    },
    [ADD_VERTEX_TO_BUFFER_EDGE] (state, payload) {
      state.bufferEdge = [...state.bufferEdge, payload.vertex];
    },
    [CLEAR_BUFFER_EDGE] (state) {
      state.bufferEdge = [];
    }
  }
});

export default store;
