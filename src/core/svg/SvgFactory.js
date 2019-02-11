import _ from 'lodash';
import SVG from 'svg.js';
import $store from '../../store/store';
import actions from "../actions";
import AddVertexCommand from "../commands/AddVertexCommand";
import {COMMAND_HISTORY_LOG} from "../../store/modules/commandHistory/mutations";

// TODO: replace with CommandFactory
const commands = {
  [actions.ADD_VERTEX]: AddVertexCommand,
  [actions.ADD_EDGE]: (e) => {
    $store.state.svgGraph.buildEdge(e.target.id);
  },
  [actions.DELETE_VERTEX]: (e) => {
    $store.state.svgGraph.removeVertex(e.target.id);
  },
  [actions.MOVE_VERTEX]: (e) => {
    $store.state.svgGraph.moveVertex({cx: e.offsetX, cy: e.offsetY});
  }
};

const createSvgContainer = (elementId, width, height) => {
  const svgContainer = SVG(elementId).size(width, height);

  svgContainer.mousedown(e => {
    const allowedActions = [actions.MOVE_VERTEX];
    const currentAction = $store.state.currentAction;

    if (currentAction && _.includes(allowedActions, currentAction)) {
      $store.state.svgGraph.startMoveVertex(e.target.id);
    }
  });

  svgContainer.mouseup(() => {
    const allowedActions = [actions.MOVE_VERTEX];
    const currentAction = $store.state.currentAction;

    if (currentAction && _.includes(allowedActions, currentAction)) {
      $store.state.svgGraph.stopMoveVertex();
    }
  });

  svgContainer.mousemove(e => {
    const allowedActions = [actions.MOVE_VERTEX];
    const currentAction = $store.state.currentAction;

    if (currentAction
        && _.includes(allowedActions, currentAction)
        && $store.state.svgGraph.currentMovableVertex) {
      commands[currentAction](e);
    }
  });

  svgContainer.click(e => {
    const notAllowedActions = [actions.MOVE_VERTEX];
    const currentAction = $store.state.currentAction;

    if (currentAction && !_.includes(notAllowedActions, currentAction)) {
      const CommandConstructor = commands[currentAction];
      const command = new CommandConstructor({payload: e});

      command.execute();
      $store.commit(COMMAND_HISTORY_LOG, {command});
    }
  });

  return svgContainer;
};

export {
  createSvgContainer
};
