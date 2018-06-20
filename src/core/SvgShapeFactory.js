import $store from '../store/store';
import {RELATION_ADDITION} from "./actions";
import * as mutations from "../store/mutations";
import Circle from "./SVGShapes/Circle";
import _ from 'lodash';


export const createCircle = ({svgContainer, vertex, coordinate}) => {
  let isDraggable = false;

  const circle = new Circle(svgContainer, vertex);
  circle.setAttrs(coordinate);
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

  circle.svgCircle.mouseup(() => {
    if ($store.state.currentAction === RELATION_ADDITION) {
      return;
    }

    isDraggable = false;

    circle.removeClass('svg-circle--draggable');
  });

  circle.svgCircle.mousedown(() => {
    if ($store.state.currentAction === RELATION_ADDITION) {
      return;
    }

    isDraggable = true;

    circle.addClass('svg-circle--draggable');
  });

  circle.svgCircle.mousemove((e) => {
    if (!isDraggable) {
      return;
    }

    circle.setAttrs({
      cx: e.offsetX,
      cy: e.offsetY
    });

    circle.vertex.notify();
  });

  return circle;
};
