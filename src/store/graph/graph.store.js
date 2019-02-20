import _ from 'lodash';
import {
  GRAPH_ADD_VERTEX,
  GRAPH_ADD_EDGE
} from "./graph.mutations";

export default {
  namespaced: true,
  state: {
    vertexList: [],
    edgeList: []
  },
  mutations: {
    [GRAPH_ADD_VERTEX] (state, payload) {
      const newVertex = {
        id: `vertex-${state.vertexList.length}`,
        name: '',
        ...payload
      };

      state.vertexList.push(newVertex);
    },
    [GRAPH_ADD_EDGE] (state, payload) {
      const newEdge = {
        id: `edge-${state.edgeList.length}`,
        weight: 0,
        vertexOne: payload.vertexOne,
        vertexTwo: payload.vertexTwo
      };

      state.edgeList.push(newEdge);
    }
  },
  getters: {
    vertexById: (state) => (id) => {
      return _.find(state.vertexList, ['id', id]);
    }
  }
}
