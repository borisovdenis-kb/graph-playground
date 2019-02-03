import _ from 'lodash';
import $store from "../store/store";

const CIRCLE_RADIUS_PX = 30;

const APPEARANCE_SIMPLE = {
  fill: '#d2d2d2',
  stroke: '#868686',
  'stroke-width': 2
};

export default class SVGVertex {
  constructor ({id, coordinate}) {
    this.id = `SvgVertex${id}`;
    this.number = id;
    this.text = '';
    this.svgElement = null;
    this.edgeObservers = [];

    this.createSvgElement({...coordinate, id: this.id});
  }

  addEdgeObserver (observer) {
    if (!_.find(this.edgeObservers, observer)) {
      this.edgeObservers.push(observer);
      this.upliftSvgElement();
    }
  }

  removeEdgeObserver (observer) {
    _.pull(this.edgeObservers, observer);
  }

  notifyEndgeObservers () {
    this.edgeObservers.forEach(o => o.update());
  }

  destroy () {
    this.svgElement.remove();
  }

  createSvgElement (attrs) {
    this.svgElement = $store.state.svgContainer.circle(CIRCLE_RADIUS_PX);
    this.svgElement.attr({...APPEARANCE_SIMPLE, ...attrs});
    this.svgElement.style({'cursor': 'pointer', 'z-index': '2'});
  }

  upliftSvgElement() {
    const coordinate = {cx: this.getX(), cy: this.getY()};
    this.createSvgElement({id: this.id, ...coordinate});
  }

  getX () {
    return this.svgElement.cx();
  }

  getY() {
    return this.svgElement.cy();
  }
}
