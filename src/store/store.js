import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import SVGGraph from '../core/SVGGraph';
import {
  ADD_VERTEX,
  CREATE_GRAPH,
  ADD_RELATION,
  SET_CURRENT_ACTION,
  SET_CURRENT_DRAGGABLE_SVG_SHAPE,
  SET_SVG_CONTAINER
} from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    svgGraph: null,
    svgContainer: null,
    currentAction: '',
    currentDraggableSvgShape: null,
    bufferEdge: []
  },
  mutations: {
    [CREATE_GRAPH] (state) {
      state.svgGraph = new SVGGraph();
    },
    [ADD_VERTEX] (state, payload) {
      state.svgGraph.addVertex(payload.id, payload.value, payload.coordinate);
    },
    [ADD_RELATION] (state, payload) {
      state.svgGraph.addRelation(payload.vertexOneId, payload.vertexTwoId);
    },
    [SET_CURRENT_ACTION] (state, payload) {
      state.currentAction = payload.action;
    },
    [SET_CURRENT_DRAGGABLE_SVG_SHAPE] (state, payload) {
      state.currentDraggableSvgShape = payload.svgShape;
    },
    [SET_SVG_CONTAINER] (state, payload) {
      state.svgContainer = payload.svgContainer;
    }
  }
});

export default store;
