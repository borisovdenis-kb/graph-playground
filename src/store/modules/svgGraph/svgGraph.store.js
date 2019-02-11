import * as mutations from './mutations';
import SVGGraph from "../../../core/svg/SVGGraph";

const svgGraphStoreModule = {
  state: {
    svgGraph: null
  },
  mutations: {
    [mutations.SVG_GRAPH_CREATE] (state) {
      state.svgGraph = new SVGGraph();
    }
  }
};

export default svgGraphStoreModule;
