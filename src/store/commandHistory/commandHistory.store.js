import {
  PUSH_UNDO_COMMAND,
  POP_UNDO_COMMAND,
  PUSH_REDO_COMMAND,
  POP_REDO_COMMAND
} from "./commandHistory.mutations";
import {
  CH_LOG_COMMAND,
  CH_UNDO_COMMAND,
  CH_REDO_COMMAND
} from "./commandHistory.actions";

export default {
  namespaced: true,
  state: {
    undo: [],
    redo: []
  },
  mutations: {
    [PUSH_UNDO_COMMAND] (state, payload) {
      state.undo = [...state.undo, payload.command];
    },
    [POP_UNDO_COMMAND] (state) {
      state.undo = state.undo.slice(0, state.undo.length - 1);
    },
    [PUSH_REDO_COMMAND] (state, payload) {
      state.redo = [...state.redo, payload.command];
    },
    [POP_REDO_COMMAND] (state) {
      state.redo = state.redo.slice(0, state.redo.length - 1);
    }
  },
  actions: {
    [CH_LOG_COMMAND] ({commit}, payload) {
      commit(PUSH_UNDO_COMMAND, {command: payload});
    },
    [CH_UNDO_COMMAND] ({state, commit, dispatch}) {
      const command = state.undo[state.undo.length - 1];

      dispatch(`${command.module}/${command.cancel}`, command.data, {root: true});
      commit(POP_UNDO_COMMAND);
      commit(PUSH_REDO_COMMAND, {command});
    },
    [CH_REDO_COMMAND] ({state, commit, dispatch}) {
      const command = state.redo[state.redo.length - 1];

      dispatch(`${command.module}/${command.execute}`, command.data, {root: true});
      commit(POP_REDO_COMMAND);
      commit(PUSH_UNDO_COMMAND, {command});
    }
  },
  getters: {
    isUndoEmpty: state => {
      return state.undo.length === 0;
    },
    isRedoEmpty: state => {
      return state.redo.length === 0;
    }
  }
}
