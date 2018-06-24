import StateMachine from "javascript-state-machine";
import {APPEARANCE_STATES} from "./SVGAppiaranceStates";

export const createStateMachine = (circle) => {
  return new StateMachine({
    init: 'simple',
    transitions: [
      { name: 'hover', from: 'simple', to: 'hovered' },
      { name: 'hover', from: 'selected', to: 'selected' },
      { name: 'unhover', from: 'hovered', to: 'simple' },
      { name: 'unhover', from: 'selected', to: 'selected' },
      { name: 'select', from: 'hovered', to: 'selected' },
      { name: 'unselect', from: 'selected', to: 'hovered'},
      { name: 'reset', from: '*', to: 'simple'}
    ],
    methods: {
      onSimple: () => {
        circle.setAttrs(APPEARANCE_STATES.SIMPLE);
      },
      onHovered: () => {
        circle.setAttrs(APPEARANCE_STATES.HOVERED);
      },
      onSelected: () => {
        circle.setAttrs(APPEARANCE_STATES.SELECTED);
      }
    }
  });
};
