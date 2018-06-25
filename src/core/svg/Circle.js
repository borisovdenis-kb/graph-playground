import $store from '../../store/store';
import {createStateMachine} from "../state-machine/StateMashineFactory";

const CIRCLE_RADIUS_PX = 30;

export default class Circle {
  constructor(vertex) {
    this.svgCircle = $store.state.svgContainer.circle(CIRCLE_RADIUS_PX);
    this.vertex = vertex;
    this.sm = createStateMachine(this);
  }

  remove() {
    this.svgCircle.remove();
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

  setCX(x) {
    this.svgCircle.cx(x);
  }

  getCY() {
    return this.svgCircle.cy();
  }

  setCY(y) {
    this.svgCircle.cy(y);
  }
}
