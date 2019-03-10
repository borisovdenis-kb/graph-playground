import {
  PUSH_ACTION,
  POP_ACTION
} from "./actionHistory.mutations";
import {
  AH_LOG_ACTION
} from "./actionHistory.actions";

export default {
  namespaced: true,
  state: {
    undo: [],
    redo: []
  },
  mutations: {
    [PUSH_ACTION] (state, payload) {
      state[payload.source] = [...state[payload.source], payload.actionObj];
    },
    [POP_ACTION] (state, payload) {
      state[payload.source] = state[payload.source].slice(0, state.undo.length - 1);
    }
  },
  actions: {
    [AH_LOG_ACTION] ({commit}, payload) {
      commit(PUSH_ACTION, {source: 'undo', actionObj: payload});
    }
  },
  getters: {
    isActionHistoryEmpty: (state) => {
      return state.undo.length === 0;
    }
  }
}
