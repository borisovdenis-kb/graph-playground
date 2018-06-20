import $store from '../store/store';
import {RELATION_ADDITION} from "./actions";
import * as mutations from "../store/mutations";

const CIRCLE_SIMPLE = {
  fill: '#d2d2d2',
  'stroke-width': 0
};
const CIRCLE_HOVERED = {
  fill: '#afafaf',
  'stroke-width': 0
};
const CIRCLE_SELECTED = {
  fill: '#47af73',
  stroke: '#868686',
  'stroke-width': 0
};
const CIRCLE_DRAGGABLE = {
  stroke: '#868686',
  'stroke-width': 2
}; // TODO: Подумать над паттеном Мементо для переключения между стилями вершин (а не проще ли CSS ???)

const setShapeAppearance = (shape, appearanceConf) => {
  // TODO: сброс предыдущих настроек
  shape.attr(appearanceConf);
};

export const createCircle = ({svgContainer, radius, x, y, vertex}) => {
  let isDraggable = false;

  const circle = svgContainer.circle(radius)
    .data('vertex', {value: vertex});

  circle.attr({cx: x, cy: y});
  setShapeAppearance(circle, CIRCLE_SIMPLE);

  circle.click(() => {
    if ($store.state.currentAction === RELATION_ADDITION) {
      setShapeAppearance(circle, CIRCLE_SELECTED);

      $store.commit(mutations.ADD_VERTEX_TO_BUFFER_EDGE, {vertex: circle.data('vertex').value});

      if ($store.state.bufferEdge.length === 2) {
        const [vertexOne, vertexTwo] = $store.state.bufferEdge;

        $store.commit(mutations.ADD_RELATION, {
          vertexOneId: vertexOne.id,
          vertexTwoId: vertexTwo.id
        });
        $store.commit(mutations.CLEAR_BUFFER_EDGE);
        $store.commit(mutations.CHANGE_CURRENT_ACTION, {action: null});

        setShapeAppearance(vertexOne.svgShape, CIRCLE_SIMPLE);
        setShapeAppearance(vertexTwo.svgShape, CIRCLE_SIMPLE);
      }
    }
  });

  circle.mouseover(() => {
    if ($store.state.currentAction === RELATION_ADDITION) {
      return;
    }

    circle.animate({ease: '<', duration: 300});
    setShapeAppearance(circle, CIRCLE_HOVERED);
  });

  circle.mouseout(() => {
    if ($store.state.currentAction === RELATION_ADDITION) {
      return;
    }

    circle.animate({ease: '<', duration: 300});
    setShapeAppearance(circle, CIRCLE_SIMPLE);
  });

  circle.mousedown(() => {
    if ($store.state.currentAction === RELATION_ADDITION) {
      return;
    }

    isDraggable = true;

    setShapeAppearance(circle, CIRCLE_DRAGGABLE)
  });

  circle.mouseup(() => {
    if ($store.state.currentAction === RELATION_ADDITION) {
      return;
    }

    isDraggable = false;

    setShapeAppearance(circle, CIRCLE_SIMPLE);
  });

  circle.mousemove((e) => {
    if (!isDraggable) {
      return;
    }

    circle.attr({
      cx: e.offsetX,
      cy: e.offsetY
    });
  });

  return circle;
};
