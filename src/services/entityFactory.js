/**
 * Method creates object model of entity Vertex
 * Model: {
 *     vertexId: {String} - id of vertex (VERTEX-33),
 *     number: {Number} - number of vertex,
 *     name: {String} - name of vertex,
 *     cx: {Number} - OX coordinate,
 *     cy: {Number} - OY coordinate
 * }
 * @param {String} name - имя вершины
 * @param {Number} cx - OX coordinate
 * @param {Number} cy - OY coordinate
 * @returns {Object} - object of Vertex entity
 */
const createVertex = ({name, cx, cy}) => {
  return {
    vertexId: null,
    number: null,
    name: name || '',
    cx: cx || 0,
    cy: cy || 0
  };
};

export {
  createVertex
}
