import Vue from 'vue';
import Vuex from 'vuex';
import Graph from '../core/Graph';
import {
  ADD_VERTEX,
  CREATE_GRAPH,
  ADD_RELATION,
  SET_CURRENT_COMMAND,
  ADD_VERTEX_TO_BUFFER_EDGE,
  CLEAR_BUFFER_EDGE,
  SET_CURRENT_DRAGGABLE_SVG_SHAPE,
  SET_SVG_CONTAINER,
  LOG_LAST_COMMAND,
  POP_LAST_COMMAND
} from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    graph: Graph,
    svgContainer: null,
    currentCommand: null,
    commandHistory: [],
    currentDraggableSvgShape: null,
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
    [ADD_VERTEX_TO_BUFFER_EDGE] (state, payload) {
      state.bufferEdge = [...state.bufferEdge, payload.vertex];
    },
    [CLEAR_BUFFER_EDGE] (state) {
      state.bufferEdge = [];
    },
    [SET_CURRENT_DRAGGABLE_SVG_SHAPE] (state, payload) {
      state.currentDraggableSvgShape = payload.svgShape;
    },
    [SET_SVG_CONTAINER] (state, payload) {
      state.svgContainer = payload.svgContainer;
    },
    [SET_CURRENT_COMMAND] (state, payload) {
      state.currentCommand = payload.command;
    },
    [LOG_LAST_COMMAND] (state, payload) {
      state.commandHistory.push(payload.command);
    },
    [POP_LAST_COMMAND] (state) {
      state.commandHistory.pop();
    }
  },
  getters: {
    getCommandHistoryLength: state => {
      return state.commandHistory.length;
    },
    getLastCommand: state => {
      return state.commandHistory[state.commandHistory.length - 1];
    }
  }
});

export default store;
