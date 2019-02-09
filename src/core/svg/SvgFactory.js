import _ from 'lodash';
import SVG from 'svg.js';
import $store from '../../store/store';
import actions from "../actions";

const graphActionStrategies = {
  [actions.ADD_VERTEX]: (e) => {
    $store.state.svgGraph.addVertex({
      cx: e.offsetX,
      cy: e.offsetY
    });
  },
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
      graphActionStrategies[currentAction](e);
    }
  });

  svgContainer.click(e => {
    const expectedActions = [actions.MOVE_VERTEX];
    const currentAction = $store.state.currentAction;

    if (currentAction && !_.includes(expectedActions, currentAction)) {
      graphActionStrategies[currentAction](e);
    }
  });

  return svgContainer;
};

export {
  createSvgContainer
};
