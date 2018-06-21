import {createStateMachine} from "../state-machine/StateMashineFactory";

const CIRCLE_RADIUS_PX = 30;

export default class Circle {
  constructor(svgContainer, vertex) {
    this.svgCircle = svgContainer.circle(CIRCLE_RADIUS_PX);
    this.vertex = vertex;
    this.sm = createStateMachine(this);
  }

  setAttrs(attrs) {
    this.svgCircle.attr(attrs);
  }

  setStyle(style) {
    this.svgCircle.style(style);
  }

  addClass(cssClass) {
    this.svgCircle.addClass(cssClass);
  }

  removeClass(cssClass) {
    this.svgCircle.removeClass('pink-flower');
  }

  getCX() {
    return this.svgCircle.cx();
  }

  getCY() {
    return this.svgCircle.cy();
  }
}
