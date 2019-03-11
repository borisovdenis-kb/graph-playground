import {
  PUSH_UNDO_ACTION,
  POP_UNDO_ACTION,
  PUSH_REDO_ACTION,
  POP_REDO_ACTION
} from "./actionHistory.mutations";
import {
  AH_LOG_ACTION,
  AH_UNDO_ACTION,
  AH_REDO_ACTION
} from "./actionHistory.actions";

export default {
  namespaced: true,
  state: {
    undo: [],
    redo: []
  },
  mutations: {
    [PUSH_UNDO_ACTION] (state, payload) {
      state.undo = [...state.undo, payload.actionObj];
    },
    [POP_UNDO_ACTION] (state) {
      state.undo = state.undo.slice(0, state.undo.length - 1);
    },
    [PUSH_REDO_ACTION] (state, payload) {
      state.redo = [...state.redo, payload.actionObj];
    },
    [POP_REDO_ACTION] (state) {
      state.redo = state.redo.slice(0, state.redo.length - 1);
    }
  },
  actions: {
    [AH_LOG_ACTION] ({commit}, payload) {
      commit(PUSH_UNDO_ACTION, {actionObj: payload});
    },
    [AH_UNDO_ACTION] ({state, commit, dispatch}) {
      const action = state.undo[state.undo.length - 1];

      dispatch(`${action.module}/${action.cancel}`, action.data, {root: true});
      commit(POP_UNDO_ACTION);
      commit(PUSH_REDO_ACTION, {actionObj: action});
    },
    [AH_REDO_ACTION] ({state, commit, dispatch}) {
      const action = state.redo[state.redo.length - 1];

      dispatch(`${action.module}/${action.execute}`, action.data, {root: true});
      commit(POP_REDO_ACTION);
    }
  },
  getters: {
    isActionHistoryEmpty: (state) => {
      return state.undo.length === 0;
    }
  }
}
