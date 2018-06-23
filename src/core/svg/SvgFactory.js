import SVG from 'svg.js';
import Circle from "./Circle";
import $store from '../../store/store';
import * as mutations from "../../store/mutations";
import {RELATION_ADDITION} from "../actions";
import {SET_CURRENT_DRAGGABLE_SVG_SHAPE} from "../../store/mutations";


export const createCircle = ({svgContainer, vertex, coordinate}) => {
  const circle = new Circle(svgContainer, vertex);
  circle.setAttrs(coordinate);
  circle.setStyle({'cursor': 'pointer', 'z-index': '2'});
  circle.addClass('svg-circle');

  circle.svgCircle.click(() => {
    if ($store.state.currentAction === RELATION_ADDITION) {
      circle.addClass('svg-circle--selected');

      $store.commit(mutations.ADD_VERTEX_TO_BUFFER_EDGE, {vertex: circle.vertex});

      if ($store.state.bufferEdge.length === 2) {
        const [vertexOne, vertexTwo] = $store.state.bufferEdge;

        $store.commit(mutations.ADD_RELATION, {
          vertexOneId: vertexOne.id,
          vertexTwoId: vertexTwo.id
        });
        $store.commit(mutations.CLEAR_BUFFER_EDGE);
        $store.commit(mutations.CHANGE_CURRENT_ACTION, {action: null});

        vertexOne.svgShape.removeClass('svg-circle--selected');
        vertexTwo.svgShape.removeClass('svg-circle--selected');
      }
    }
  });

  circle.svgCircle.mouseover(() => {
    circle.sm.hover();
  });

  circle.svgCircle.mouseout(() => {
    circle.sm.unhover();
  });

  circle.svgCircle.mousedown(() => {
    if ($store.state.currentAction === RELATION_ADDITION) {
      return;
    }

    $store.commit(SET_CURRENT_DRAGGABLE_SVG_SHAPE, {svgShape: circle});

    circle.addClass('svg-circle--draggable');
  });

  circle.svgCircle.mouseup(() => {
    if ($store.state.currentAction === RELATION_ADDITION) {
      return;
    }

    $store.commit(SET_CURRENT_DRAGGABLE_SVG_SHAPE, {vertex: null});

    circle.removeClass('svg-circle--draggable');
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
