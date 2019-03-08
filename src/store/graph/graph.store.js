import _ from 'lodash';
import * as entityTypes from '../../contants/entityTypes';
import {
  ADD_VERTEX,
  ADD_EDGE,
  DELETE_VERTEX,
  UPDATE_VERTEX,
  REFRESH_EDGES,
  DELETE_EDGES,
  ADD_VERTEX_TO_CACHE,
  ADD_EDGE_TO_CACHE,
  CLEAR_CACHE,
  INCREASE_ID_COUNTER,
  RESET_ID_COUNTER
} from "./graph.mutations";
import {
  GRAPH_ADD_VERTEX,
  GRAPH_DELETE_VERTEX,
  GRAPH_ADD_EDGE,
  GRAPH_MOVE_VERTEX
} from "./graph.actions";

export default {
  namespaced: true,
  state: {
    vertexList: [],
    edgeList: [],
    edgeCache: {},
    vertexIdCounter: 0,
    edgeIdCounter: 0
  },
  mutations: {
    [ADD_VERTEX] (state, payload) {
      state.vertexList = [...state.vertexList, payload.vertex];
    },
    [ADD_EDGE] (state, payload) {
      state.edgeList = [...state.edgeList, payload.edge];
    },
    [DELETE_VERTEX] (state, payload) {
      state.vertexList = state.vertexList.filter(vertex => vertex.id !== payload.vertexId);
    },
    [UPDATE_VERTEX] (state, payload) {
      state.vertexList = state.vertexList.map(vertex => {
        if (vertex.id === payload.vertexId) {
          return Object.assign({}, vertex, payload);
        }

        return vertex;
      });
    },
    [REFRESH_EDGES] (state, payload) {
      const edgesToUpdate = state.edgeCache[payload.vertexId].adjEdges;

      state.edgeList = state.edgeList.map(edge => {
        if (_.includes(edgesToUpdate, edge.id)) {
          const vertexOne = _.find(state.vertexList, ['id', edge.vertexOne.id]);
          const vertexTwo = _.find(state.vertexList, ['id', edge.vertexTwo.id]);

          return Object.assign({}, edge, {vertexOne, vertexTwo});
        }

        return edge;
      });
    },
    [DELETE_EDGES] (state, payload) {
      const edgesToDelete = state.edgeCache[payload.vertexId].adjEdges;

      state.edgeList = state.edgeList.filter(edge => !_.includes(edgesToDelete, edge.id));
    },
    [ADD_VERTEX_TO_CACHE] (state, payload) {
      if (!state.edgeCache[payload.vertexId]) {
        state.edgeCache = Object.assign(
          {},
          state.edgeCache,
          {
            [payload.vertexId]: {
              adjEdges: []
            }
          }
        );
      }
    },
    [ADD_EDGE_TO_CACHE] (state, payload) {
      state.edgeCache[payload.vertexOneId] = Object.assign(
        {},
        state.edgeCache[payload.vertexOneId],
        {
          adjEdges: [...state.edgeCache[payload.vertexOneId].adjEdges, payload.edgeId]
        }
      );
      state.edgeCache[payload.vertexTwoId] = Object.assign(
        {},
        state.edgeCache[payload.vertexTwoId],
        {
          adjEdges: [...state.edgeCache[payload.vertexTwoId].adjEdges, payload.edgeId]
        }
      );
    },
    [CLEAR_CACHE] (state, payload) {
      state.edgeCache = _.omit(state.edgeCache, payload.vertexId);
    },
    [INCREASE_ID_COUNTER] (state, payload) {
      state[payload.counterName] = state.vertexIdCounter + 1;
    },
    [RESET_ID_COUNTER] (state, payload) {
      state[payload.counterName] = 0;
    }
  },
  actions: {
    [GRAPH_ADD_VERTEX] ({commit, state}, payload) {
      const vertex = {
        id: `${entityTypes.VERTEX}-${state.vertexIdCounter}`,
        number: state.vertexIdCounter,
        name: '',
        ...payload
      };

      commit(ADD_VERTEX, {vertex});
      commit(ADD_VERTEX_TO_CACHE, {vertexId: vertex.id});
      commit(INCREASE_ID_COUNTER, {counterName: 'vertexIdCounter'});
    },
    [GRAPH_DELETE_VERTEX] ({commit, state}, payload) {
      commit(DELETE_VERTEX, payload);
      commit(DELETE_EDGES, payload);
      commit(CLEAR_CACHE, payload);

      if (!state.vertexList.length) {
        commit(RESET_ID_COUNTER, {counterName: 'vertexIdCounter'});
      }
    },
    [GRAPH_ADD_EDGE] ({commit, state, getters}, payload) {
      const vertexOne = getters.vertexById(payload.vertexOneId);
      const vertexTwo = getters.vertexById(payload.vertexTwoId);
      const edge = {
        id: `${entityTypes.EDGE}-${state.edgeIdCounter}`,
        weight: 0,
        vertexOne,
        vertexTwo
      };

      commit(ADD_EDGE, {edge});
      commit(ADD_EDGE_TO_CACHE, {
        vertexOneId: vertexOne.id,
        vertexTwoId: vertexTwo.id,
        edgeId: edge.id
      });
      commit(INCREASE_ID_COUNTER, {counterName: 'edgeIdCounter'});
    },
    [GRAPH_MOVE_VERTEX] ({commit}, payload) {
      commit(UPDATE_VERTEX, payload);
      commit(REFRESH_EDGES, payload);
    }
  },
  getters: {
    vertexById: (state) => (id) => {
      return _.find(state.vertexList, ['id', id]);
    }
  }
}
