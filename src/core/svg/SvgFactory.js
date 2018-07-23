import SVG from 'svg.js';
import Circle from "./Circle";
import $store from '../../store/store';
import * as mutations from "../../store/mutations";
import {SET_CURRENT_DRAGGABLE_SVG_SHAPE} from "../../store/mutations";


export const createCircle = ({vertex, coordinate}) => {
  const circle = new Circle(vertex);
  circle.setAttrs(coordinate);
  circle.setStyle({'cursor': 'pointer', 'z-index': '2'});

  circle.svgCircle.click(() => {
    let command = $store.state.currentCommand;

    if (!command || command.name !== 'Delete Vertex') {
      circle.sm.select();

      $store.commit(mutations.ADD_VERTEX_TO_BUFFER_EDGE, {vertex: circle.vertex});

      if ($store.state.bufferEdge.length === 2) {
        const [vertexOne, vertexTwo] = $store.state.bufferEdge;

        $store.commit(mutations.ADD_RELATION, {
          vertexOneId: vertexOne.id,
          vertexTwoId: vertexTwo.id
        });
        $store.commit(mutations.CLEAR_BUFFER_EDGE);
        $store.commit(mutations.SET_CURRENT_COMMAND, {action: null});

        vertexOne.svgShape.sm.reset();
        vertexTwo.svgShape.sm.unselect();
      }
    } else {
      command.setReceiver(circle);
      command.execute();

      $store.commit(mutations.LOG_LAST_COMMAND, {command: command});
      $store.commit(mutations.SET_CURRENT_COMMAND, {command: null});
    }
  });

  circle.svgCircle.mouseover(() => {
    circle.sm.hover();
  });

  circle.svgCircle.mouseout(() => {
    circle.sm.unhover();
  });

  circle.svgCircle.mousedown(() => {
    // if ($store.state.currentAction === ADD_EDGE) {
    //   return;
    // }

    $store.commit(SET_CURRENT_DRAGGABLE_SVG_SHAPE, {svgShape: circle});
  });

  circle.svgCircle.mouseup(() => {
    // if ($store.state.currentAction === ADD_EDGE) {
    //   return;
    // }

    $store.commit(SET_CURRENT_DRAGGABLE_SVG_SHAPE, {svgShape: null});
  });

  return circle;
};

export const createSvgContainer = (elementId, width, height) => {
  const svgContainer = SVG(elementId).size(width, height);

  svgContainer.mousemove((e) => {
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

  return svgContainer;
};
