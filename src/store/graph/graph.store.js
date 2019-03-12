import _ from 'lodash';
import * as entityTypes from '../../contants/entityTypes';
import {
  ADD_VERTEX,
  ADD_EDGE,
  DELETE_VERTEX,
  UPDATE_VERTEX,
  REFRESH_EDGES,
  DELETE_EDGES_BY_VERTEX,
  INCREASE_ID_COUNTER,
  RESET_ID_COUNTER,
  DELETE_EDGE
} from "./graph.mutations";
import {
  GRAPH_ADD_VERTEX,
  GRAPH_DELETE_VERTEX,
  GRAPH_ADD_EDGE,
  GRAPH_MOVE_VERTEX,
  GRAPH_DELETE_EDGE,
  GRAPH_UNDO_REDO_MAP
} from "./graph.actions";
import {AH_LOG_ACTION} from "../actionHistory/actionHistory.actions";
import {createActionObject} from "../../services/utils";

export default {
  namespaced: true,
  state: {
    vertexList: [],
    edgeList: [],
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
      state.vertexList = state.vertexList.filter(vertex => vertex.vertexId !== payload.vertexId);
    },
    [DELETE_EDGE] (state, payload) {
      state.edgeList = state.edgeList.filter(edge => edge.edgeId !== payload.edgeId);
    },
    [UPDATE_VERTEX] (state, payload) {
      state.vertexList = state.vertexList.map(vertex => {
        if (vertex.vertexId === payload.vertexId) {
          return {...vertex, ...payload};
        }

        return vertex;
      });
    },
    [REFRESH_EDGES] (state, payload) {
      state.edgeList = state.edgeList.map(edge => {
        if (edge.vertexOne.vertexId === payload.vertexId || edge.vertexTwo.vertexId === payload.vertexId) {
          const vertexOne = _.find(state.vertexList, ['vertexId', edge.vertexOne.vertexId]);
          const vertexTwo = _.find(state.vertexList, ['vertexId', edge.vertexTwo.vertexId]);

          return {...edge, vertexOne, vertexTwo};
        }

        return edge;
      });
    },
    [DELETE_EDGES_BY_VERTEX] (state, payload) {
      state.edgeList = state.edgeList.filter(edge => {
        return edge.vertexOne.vertexId !== payload.vertexId && edge.vertexTwo.vertexId !== payload.vertexId;
      });
    },
    [INCREASE_ID_COUNTER] (state, payload) {
      state[payload.counterName] = state[payload.counterName] + 1;
    },
    [RESET_ID_COUNTER] (state, payload) {
      state[payload.counterName] = 0;
    }
  },
  actions: {
    [GRAPH_ADD_VERTEX] ({commit, state, dispatch}, payload) {
      const vertex = {
        vertexId: `${entityTypes.VERTEX}-${state.vertexIdCounter}`,
        number: state.vertexIdCounter,
        name: '',
        ...payload
      };

      commit(ADD_VERTEX, {vertex});
      commit(INCREASE_ID_COUNTER, {counterName: 'vertexIdCounter'});

      dispatch(
        `actionHistory/${AH_LOG_ACTION}`,
        createActionObject(GRAPH_UNDO_REDO_MAP[GRAPH_ADD_VERTEX], _.cloneDeep(vertex)),
        {root: true}
      );
    },
    [GRAPH_DELETE_VERTEX] ({commit, state}, payload) {
      commit(DELETE_VERTEX, payload);
      commit(DELETE_EDGES_BY_VERTEX, payload);

      if (!state.vertexList.length) {
        commit(RESET_ID_COUNTER, {counterName: 'vertexIdCounter'});
      }
    },
    [GRAPH_ADD_EDGE] ({commit, state, getters}, payload) {
      const vertexOne = getters.vertexById(payload.vertexOneId);
      const vertexTwo = getters.vertexById(payload.vertexTwoId);
      const edge = {
        edgeId: `${entityTypes.EDGE}-${state.edgeIdCounter}`,
        weight: 0,
        vertexOne,
        vertexTwo
      };

      commit(ADD_EDGE, {edge});
      commit(INCREASE_ID_COUNTER, {counterName: 'edgeIdCounter'});
    },
    [GRAPH_DELETE_EDGE] ({commit}, payload) {
      commit(DELETE_EDGE, payload);
    },
    [GRAPH_MOVE_VERTEX] ({commit}, payload) {
      commit(UPDATE_VERTEX, payload);
      commit(REFRESH_EDGES, payload);
    }
  },
  getters: {
    vertexById: (state) => (vertexId) => {
      return _.find(state.vertexList, ['vertexId', vertexId]);
    }
  }
}
