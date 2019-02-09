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
  }
};

const createSvgContainer = (elementId, width, height) => {
  const svgContainer = SVG(elementId).size(width, height);

  svgContainer.mousemove(e => {
    const draggableSvgShape = $store.state.currentDraggableSvgShape;

    if (!draggableSvgShape) {
      return;
    }

    draggableSvgShape.setAttrs({
      cx: e.offsetX,
      cy: e.offsetY
    });

    draggableSvgShape.vertex.notify();
  });

  svgContainer.click(e => {
    const currentState = $store.state.currentAction;

    graphActionStrategies[currentState](e);
  });

  return svgContainer;
};

export {
  createSvgContainer
};
