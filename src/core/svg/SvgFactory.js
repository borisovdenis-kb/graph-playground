import SVG from 'svg.js';
import $store from '../../store/store';
import actions from "../actions";

export const createSvgContainer = (elementId, width, height) => {
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

    switch (currentState) {
      case actions.ADD_VERTEX:
        $store.state.svgGraph.addVertex({
          cx: e.offsetX,
          cy: e.offsetY
        });
        break;
      case actions.ADD_EDGE:
        $store.state.svgGraph.buildEdge(e.target.id);
        break;
      case actions.DELETE_VERTEX:
        $store.state.svgGraph.removeVertex(e.target.id);
        break;
    }
  });

  return svgContainer;
};
