import StateMachine from "javascript-state-machine";
import {states, transitions, APPEARANCE_STATES} from "./SVGCircleAppiaranceStates";

export const createStateMachine = (circle) => {
  return new StateMachine({
    init: 'simple',
    transitions: [
      { name: 'hover', from: 'simple', to: 'hovered' },
      { name: 'unhover', from: 'hovered', to: 'simple' },
    ],
    methods: {
      onHovered: ({transition, from, to}) => {
        circle.setAttrs(APPEARANCE_STATES.HOVERED);
      },
      onSimple: ({transition, from, to}) => {
        circle.setAttrs(APPEARANCE_STATES.SIMPLE);
      }
    }
  });
};
