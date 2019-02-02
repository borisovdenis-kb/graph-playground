import $store from '../store/store';

export default class SVGEdge {
  constructor ({id, vertexOne, vertexTwo}) {
    this.id = `SvgEdge${id}`;
    this.vertexOne = vertexOne;
    this.vertexTwo = vertexTwo;
    this.svgElement = null;

    this.initSvgElement({id: this.id});
    this.register(vertexOne);
    this.register(vertexTwo);
  }

  register (vertex) {
    vertex.addEdgeObserver(this);
  }

  unregister (vertex) {
    vertex.removeEdgeObserver(this);
  }

  update () {
    this.svgElement.plot(
      this.vertexOne.getX(),
      this.vertexOne.getY(),
      this.vertexTwo.getX(),
      this.vertexTwo.getY()
    );
  }

  destroy () {
    this.svgElement.remove();
  }

  initSvgElement (attrs) {
    this.svgElement = $store.state.svgContainer.line(
      this.vertexOne.getX(),
      this.vertexOne.getY(),
      this.vertexTwo.getX(),
      this.vertexTwo.getY()
    ).stroke({ color: '#d2d2d2', width: 5 });

    this.svgElement.attr(attrs);
  }
}
