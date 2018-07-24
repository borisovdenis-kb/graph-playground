import Vue from 'vue';
import Vuex from 'vuex';
import Graph from '../core/Graph';
import {
  ADD_VERTEX,
  CREATE_GRAPH,
  ADD_RELATION,
  DELETE_RELATION,
  SET_CURRENT_COMMAND,
  ADD_VERTEX_TO_BUFFER_EDGE,
  CLEAR_BUFFER_EDGE,
  SET_CURRENT_DRAGGABLE_SVG_SHAPE,
  SET_SVG_CONTAINER,
  LOG_LAST_COMMAND,
  UNDO_LAST_COMMAND,
  REDO_LAST_COMMAND
} from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    graph: Graph,
    svgContainer: null,
    currentCommand: null,
    currentDraggableSvgShape: null,
    bufferEdge: [],
    commandHistory: {
      undo: [],
      redo: []
    }
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
    [DELETE_RELATION] (state, payload) {
      state.graph.deleteRelation(payload.vertexOneId, payload.vertexTwoId);
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
      state.commandHistory.undo.push(payload.command);
    },
    [UNDO_LAST_COMMAND] (state) {
      const command = state.commandHistory.undo.pop();
      command.cancel();
      state.commandHistory.redo.push(command);
    },
    [REDO_LAST_COMMAND] (state) {
      const command = state.commandHistory.redo.pop();
      command.execute();
      state.commandHistory.undo.push(command);
    }
  },
  getters: {
    getCommandHistoryUndoLength: state => {
      return state.commandHistory.undo.length;
    },
    getCommandHistoryRedoLength: state => {
      return state.commandHistory.redo.length;
    },
    getCommandHistoryUndoList: state => {
      return state.commandHistory.undo;
    }
    // getLastCommand: state => {
    //   return state.commandHistory[state.commandHistory.length - 1];
    // }
  }
});

export default store;
