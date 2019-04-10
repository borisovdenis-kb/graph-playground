import _ from 'lodash';
import * as entityTypes from '../../constants/entityTypes';
import * as entityFactory from '../../services/entityFactory';
import * as edgeOrientation from '../../constants/edgeOrientation';
import { createCommandObject, getNextId } from "../../services/utils";
import {
  ADD_VERTEX,
  ADD_EDGE,
  DELETE_VERTEX,
  UPDATE_VERTEX,
  REFRESH_EDGES,
  DELETE_EDGE,
  UPDATE_EDGE,
  SET_EDGE_WEIGHT_VISIBILITY
} from "./graph.mutations";
import {
  GRAPH_ADD_VERTEX,
  GRAPH_DELETE_VERTEX,
  GRAPH_ADD_EDGE,
  GRAPH_MOVE_VERTEX,
  GRAPH_DELETE_EDGE,
  GRAPH_UPDATE_EDGE,
  GRAPH_COMMANDS_MAP
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
        return {...vertex, ...payload.vertexData};
      }

      return vertex;
    });
  },
  [UPDATE_EDGE](state, payload) {
    state.edgeList = state.edgeList.map(edge => {
      if (edge.edgeId === payload.edgeData.edgeId) {
        return {...edge, ...payload.edgeData};
      }

      return edge;
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
  [SET_EDGE_WEIGHT_VISIBILITY](state, payload) {
    state.isEdgeWeightVisible = payload.flag;
  }
};

const actions = {
  [GRAPH_ADD_VERTEX]({commit, state, dispatch}, payload) {
    const vertex = entityFactory.createVertex({
      name: payload.name,
      cx: payload.cx,
      cy: payload.cy
    });

    if (payload.vertexId) {
      vertex.vertexId = payload.vertexId;
      vertex.number = payload.number;
    } else {
      const id = getNextId(state.vertexList);
      vertex.vertexId = `${entityTypes.VERTEX}-${id}`;
      vertex.number = id;
    }

    commit(ADD_VERTEX, {vertex});

    return Promise.resolve(createCommandObject({
      commandDefinition: GRAPH_COMMANDS_MAP[GRAPH_ADD_VERTEX],
      data: _.cloneDeep(vertex),
      text: `Add Vertex V(${vertex.number})`
    }));
  },
  [GRAPH_DELETE_VERTEX]({commit, state, getters}, payload) {
    const vertex = _.cloneDeep(getters.vertexById(payload.vertexId));

    commit(DELETE_VERTEX, payload);

    return Promise.resolve(createCommandObject({
      commandDefinition: GRAPH_COMMANDS_MAP.GRAPH_DELETE_VERTEX_PRIVATE,
      data: vertex,
      text: `Delete Vertex V(${vertex.number})`
    }));
  },
  [GRAPH_ADD_EDGE]({commit, state, getters, dispatch}, payload) {
    const vertexOne = getters.vertexById(payload.vertexOneId);
    const vertexTwo = getters.vertexById(payload.vertexTwoId);
    const edge = {
      weight: null,
      orientation: edgeOrientation.NONE,
      x1: vertexOne.cx,
      y1: vertexOne.cy,
      x2: vertexTwo.cx,
      y2: vertexTwo.cy,
      vertexOneId: payload.vertexOneId,
      vertexTwoId: payload.vertexTwoId
    };

    if (payload.edgeId) {
      edge.edgeId = payload.edgeId;
      edge.number = payload.number;
    } else {
      const id = getNextId(state.edgeList);
      edge.edgeId = `${entityTypes.EDGE}-${id}`;
      edge.number = id;
    }

    commit(ADD_EDGE, {edge});

    return Promise.resolve(createCommandObject({
      commandDefinition: GRAPH_COMMANDS_MAP[GRAPH_ADD_EDGE],
      data: {
        edgeId: edge.edgeId,
        vertexOneId: payload.vertexOneId,
        vertexTwoId: payload.vertexTwoId
      },
      text: `Add Edge V(${vertexOne.number}) -- V(${vertexTwo.number})`
    }));
  },
  [GRAPH_DELETE_EDGE]({commit, getters}, payload) {
    const edge = getters.edgeById(payload.edgeId);
    const vertexOne = getters.vertexById(edge.vertexOneId);
    const vertexTwo = getters.vertexById(edge.vertexTwoId);

    commit(DELETE_EDGE, payload);

    return Promise.resolve(createCommandObject({
      commandDefinition: GRAPH_COMMANDS_MAP[GRAPH_DELETE_EDGE],
      data: {
        edgeId: edge.edgeId,
        vertexOneId: edge.vertexOneId,
        vertexTwoId: edge.vertexTwoId
      },
      text: `Delete Edge V(${vertexOne.number}) -- V(${vertexTwo.number})`
    }));
  },
  [GRAPH_UPDATE_EDGE]({commit}, payload) {
    commit(UPDATE_EDGE, {edgeData: payload});
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
    isEdgeWeightVisible: false
  },
  mutations,
  actions,
  getters: {
    vertexById: state => vertexId => {
      return _.find(state.vertexList, ['vertexId', vertexId]);
    },
    edgeById: state => edgeId => {
      return _.find(state.edgeList, ['edgeId', edgeId]);
    },
    adjEdgesByVertex: state => vertexId => {
      return state.edgeList.filter(edge => edge.vertexOneId === vertexId || edge.vertexTwoId === vertexId);
    },
    vertexCount: state => state.vertexList.length,
    edgeCount: state => state.edgeList.length
  }
}
