// import _ from 'lodash';
// import SVG from 'svg.js';
// import $store from '../../store';
// import actions from "../pgStates";
//
// const graphActionStrategies = {
//   [actions.ADD_VERTEX]: (e) => {
//     $store.state.svgGraph.addVertex({
//       cx: e.offsetX,
//       cy: e.offsetY
//     });
//   },
//   [actions.ADD_EDGE]: (e) => {
//     $store.state.svgGraph.buildEdge(e.target.id);
//   },
//   [actions.DELETE_VERTEX]: (e) => {
//     $store.state.svgGraph.removeVertex(e.target.id);
//   },
//   [actions.MOVE_VERTEX]: (e) => {
//     $store.state.svgGraph.moveVertex({cx: e.offsetX, cy: e.offsetY});
//   }
// };
//
// const createSvgContainer = (elementId, width, height) => {
//   const svgContainer = SVG(elementId).size(width, height);
//
//   svgContainer.mousedown(e => {
//     const allowedActions = [actions.MOVE_VERTEX];
//     const currentPgState = $store.state.currentPgState;
//
//     if (currentPgState && _.includes(allowedActions, currentPgState)) {
//       $store.state.svgGraph.startMoveVertex(e.target.id);
//     }
//   });
//
//   svgContainer.mouseup(() => {
//     const allowedActions = [actions.MOVE_VERTEX];
//     const currentPgState = $store.state.currentPgState;
//
//     if (currentPgState && _.includes(allowedActions, currentPgState)) {
//       $store.state.svgGraph.stopMoveVertex();
//     }
//   });
//
//   svgContainer.mousemove(e => {
//     const allowedActions = [actions.MOVE_VERTEX];
//     const currentPgState = $store.state.currentPgState;
//
//     if (currentPgState
//         && _.includes(allowedActions, currentPgState)
//         && $store.state.svgGraph.currentMovableVertex) {
//       graphActionStrategies[currentPgState](e);
//     }
//   });
//
//   svgContainer.click(e => {
//     const expectedActions = [actions.MOVE_VERTEX];
//     const currentPgState = $store.state.currentPgState;
//
//     if (currentPgState && !_.includes(expectedActions, currentPgState)) {
//       graphActionStrategies[currentPgState](e);
//     }
//   });
//
//   return svgContainer;
// };
//
// export {
//   createSvgContainer
// };
