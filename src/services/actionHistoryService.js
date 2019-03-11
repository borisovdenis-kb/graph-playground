import {GRAPH_UNDO_REDO_MAP} from "../store/graph/graph.actions";

const UNDO_REDO_ACTIONS_MAP = {
  ...GRAPH_UNDO_REDO_MAP
};

const getUndoAction = actionName => UNDO_REDO_ACTIONS_MAP[actionName];

const getRedoAction = actionName => {
  for (let key of UNDO_REDO_ACTIONS_MAP) {
    if (UNDO_REDO_ACTIONS_MAP[key] === actionName) {
      return key;
    }
  }
};

export {
  getUndoAction,
  getRedoAction
}
