import _ from 'lodash';
import {
  GRAPH_ADD_VERTEX,
  GRAPH_ADD_EDGE,
  GRAPH_MOVE_VERTEX
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

      state.vertexList = [...state.vertexList, newVertex];
    },
    [GRAPH_ADD_EDGE] (state, payload) {
      const vertexOne = _.find(state.vertexList, ['id', payload.vertexOneId]);
      const vertexTwo = _.find(state.vertexList, ['id', payload.vertexTwoId]);
      const newEdge = {
        id: `edge-${state.edgeList.length}`,
        weight: 0,
        vertexOne,
        vertexTwo
      };

      state.edgeList = [...state.edgeList, newEdge];
    },
    [GRAPH_MOVE_VERTEX] (state, payload) {
      state.vertexList = state.vertexList.map(vertex => {
        if (vertex.id === payload.id) {
          return Object.assign({}, vertex, payload);
        }

        return vertex;
      });

      state.edgeList = state.edgeList.map(edge => {
        const vertexOne = _.find(state.vertexList, ['id', edge.vertexOne.id]);
        const vertexTwo = _.find(state.vertexList, ['id', edge.vertexTwo.id]);

        return Object.assign({}, edge, {vertexOne, vertexTwo});
      });
    }
  },
  getters: {
    vertexById: (state) => (id) => {
      return _.find(state.vertexList, ['id', id]);
    }
  }
}
