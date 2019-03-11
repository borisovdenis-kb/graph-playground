import {
  PUSH_UNDO_ACTION,
  POP_UNDO_ACTION,
  PUSH_REDO_ACTIONS,
  POP_REDO_ACTIONS
} from "./actionHistory.mutations";
import {
  AH_LOG_ACTION,
  AH_UNDO_ACTION
} from "./actionHistory.actions";
import {
  getRedoAction,
  getUndoAction
} from "../../services/actionHistoryService";

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
    [PUSH_REDO_ACTIONS] (state, payload) {
      state.redo = [...state.redo, payload.actionObj];
    },
    [POP_REDO_ACTIONS] (state) {
      state.redo = state.redo.slice(0, state.redo.length - 1);
    }
  },
  actions: {
    [AH_LOG_ACTION] ({commit}, payload) {
      commit(PUSH_UNDO_ACTION, {actionObj: payload});
    },
    [AH_UNDO_ACTION] ({state, commit, dispatch}) {
      const action = state.undo[state.undo.length - 1];
      const actionUndoName = getUndoAction(action.name);

      dispatch(actionUndoName, action.data, {root: true});
      commit(POP_UNDO_ACTION);
    }
  },
  getters: {
    isActionHistoryEmpty: (state) => {
      return state.undo.length === 0;
    }
  }
}
