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
  GRAPH_DELETE_EDGE
} from "./graph.actions";


const mutations = {
  [ADD_VERTEX](state, payload) {
    state.vertexList = [...state.vertexList, payload.vertex];
  },
  [ADD_EDGE](state, payload) {
    state.edgeList = [...state.edgeList, payload.edge];
  },
  [DELETE_VERTEX](state, payload) {
    state.vertexList = state.vertexList.filter(vertex => vertex.vertexId !== payload.vertexId);
  },
  [DELETE_EDGE](state, payload) {
    state.edgeList = state.edgeList.filter(edge => edge.edgeId !== payload.edgeId);
  },
  [UPDATE_VERTEX](state, payload) {
    state.vertexList = state.vertexList.map(vertex => {
      if (vertex.vertexId === payload.vertexData.vertexId) {
        const updatedVertex = {...vertex, ...payload.vertexData};
        updatedVertex.edges = [...updatedVertex.edges, payload.edgeId];

        return updatedVertex;
      }

      return vertex;
    });
  },
  [REFRESH_EDGES](state, payload) {
    state.edgeList = state.edgeList.map(edge => {
      if (edge.vertexOneId === payload.vertexData.vertexId || edge.vertexTwoId === payload.vertexData.vertexId) {
        const vertexOne = _.find(state.vertexList, ['vertexId', edge.vertexOneId]);
        const vertexTwo = _.find(state.vertexList, ['vertexId', edge.vertexTwoId]);

        return {
          ...edge,
          x1: vertexOne.cx,
          y1: vertexOne.cy,
          x2: vertexTwo.cx,
          y2: vertexTwo.cy
        };
      }

      return edge;
    });
  },
  [DELETE_EDGES_BY_VERTEX](state, payload) { // TODO: переписать
    state.edgeList = state.edgeList.filter(edge => {
      return edge.vertexOneId !== payload.vertexId && edge.vertexTwoId !== payload.vertexId;
    });
  },
  [INCREASE_ID_COUNTER](state, payload) {
    state[payload.counterName] = state[payload.counterName] + 1;
  },
  [RESET_ID_COUNTER](state, payload) {
    state[payload.counterName] = 0;
  }
};

const actions = {
  [GRAPH_ADD_VERTEX]({commit, state, dispatch}, payload) {
    const vertex = {
      name: payload.name || '',
      cx: payload.cx,
      cy: payload.cy,
      edges: []
    };

    if (payload.vertexId) {
      vertex.vertexId = payload.vertexId;
      vertex.number = payload.number;
    } else {
      vertex.vertexId = `${entityTypes.VERTEX}-${state.vertexIdCounter}`;
      vertex.number = state.vertexIdCounter;
      commit(INCREASE_ID_COUNTER, {counterName: 'vertexIdCounter'});
    }

    commit(ADD_VERTEX, {vertex});

    return Promise.resolve({data: _.cloneDeep(vertex)});
  },
  [GRAPH_DELETE_VERTEX]({commit, state}, payload) {
    commit(DELETE_VERTEX, payload);
    commit(DELETE_EDGES_BY_VERTEX, payload);

    if (!state.vertexList.length) {
      commit(RESET_ID_COUNTER, {counterName: 'vertexIdCounter'});
    }
  },
  [GRAPH_ADD_EDGE]({commit, state, getters, dispatch}, payload) {
    const vertexOne = getters.vertexById(payload.vertexOneId);
    const vertexTwo = getters.vertexById(payload.vertexTwoId);
    const edge = {
      weight: 0,
      x1: vertexOne.cx,
      y1: vertexOne.cy,
      x2: vertexTwo.cx,
      y2: vertexTwo.cy,
      vertexOneId: payload.vertexOneId,
      vertexTwoId: payload.vertexTwoId
    };

    if (payload.edgeId) {
      edge.edgeId = payload.edgeId;
    } else {
      edge.edgeId = `${entityTypes.EDGE}-${state.edgeIdCounter}`;
      commit(INCREASE_ID_COUNTER, {counterName: 'edgeIdCounter'});
    }

    commit(ADD_EDGE, {edge});
    commit(UPDATE_VERTEX, {vertexData: {vertexId: payload.vertexOneId}, edgeId: edge.edgeId});
    commit(UPDATE_VERTEX, {vertexData: {vertexId: payload.vertexTwoId}, edgeId: edge.edgeId});

    return Promise.resolve({
      data: {
        edgeId: edge.edgeId,
        vertexOneId: payload.vertexOneId,
        vertexTwoId: payload.vertexTwoId
      }
    });
  },
  [GRAPH_DELETE_EDGE]({commit, getters}, payload) {
    const edge = getters.edgeById(payload.edgeId);

    commit(DELETE_EDGE, payload);

    return Promise.resolve({
      data: {
        edgeId: edge.edgeId,
        vertexOneId: edge.vertexId,
        vertexTwoId: edge.vertexId
      }
    });
  },
  [GRAPH_MOVE_VERTEX]({commit}, payload) {
    commit(UPDATE_VERTEX, {vertexData: payload});
    commit(REFRESH_EDGES, {vertexData: payload});
  }
};

export default {
  namespaced: true,
  state: {
    vertexList: [],
    edgeList: [],
    vertexIdCounter: 0,
    edgeIdCounter: 0
  },
  mutations,
  actions,
  getters: {
    vertexById: state => vertexId => {
      return _.find(state.vertexList, ['vertexId', vertexId]);
    },
    edgeById: state => edgeId => {
      return _.find(state.edgeList, ['edgeId', edgeId]);
    }
  }
}
