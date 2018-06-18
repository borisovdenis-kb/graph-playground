import {createCircle} from "./SvgShapeFactory";

const CIRCLE_RADIUS_PX = 30;

export default class Vertex {
  constructor(id, value = null, linkedVertexes, svgContainer, x, y) {
    this.id = id;
    this.value = value;
    this.linkedVertexes = linkedVertexes || [];
    this.svgShape = createCircle({
      svgContainer: svgContainer,
      radius: CIRCLE_RADIUS_PX,
      x: x,
      y: y,
      vertex: this
    });
  }

  addRelation(vertex) {
    if (this.linkedVertexes.indexOf(vertex) === -1) {
      this.linkedVertexes.push(vertex);
    }
  }

  getX() {
    return this.svgShape.cx();
  }

  getY() {
    return this.svgShape.cy();
  }
}
