import Vue from 'vue';
import Vuex from 'vuex';
import Graph from '../core/Graph';
import _ from 'lodash';
import {ADD_VERTEX, CREATE_GRAPH, ADD_RELATION} from "./mutations";

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
      state.graph.addVertex(payload.id, payload.value, payload.x, payload.y);
    },
    [ADD_RELATION] (state, payload) {
      state.graph.addRelation(payload.targetId, payload.linkedId);
    }
  }
  // getters: {
  //   getVertexList: state => {
  //     if (_.isEmpty(state.graph.vertexMap)) {
  //       return [];
  //     }
  //     return Object.values(state.graph.vertexMap);
  //   }
  // }
});

export default store;
