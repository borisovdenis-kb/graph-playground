import _ from 'lodash';
import $store from "../store/store";

const CIRCLE_RADIUS_PX = 30;

const APPEARENCE_SIMPLE = {
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

    this.initSvgElement({...coordinate, id: this.id});
  }

  addEdgeObserver (observer) {
    if (!_.find(this.edgeObservers, observer)) {
      this.edgeObservers.push(observer);
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

  initSvgElement (attrs) {
    this.svgElement = $store.state.svgContainer.circle(CIRCLE_RADIUS_PX);
    this.svgElement.attr({...APPEARENCE_SIMPLE, ...attrs});
    this.svgElement.style({'cursor': 'pointer', 'z-index': '2'});
  }
}
