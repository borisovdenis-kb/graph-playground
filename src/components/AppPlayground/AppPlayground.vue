<template>
  <div id="app-playground">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
         v-bind:width="pgWidth"
         v-bind:height="pgHeight"
         v-on:click="onPgClick">

      <line v-for="edge in edgeList"
            v-bind:x1="edge.vertexOne.cx"
            v-bind:y1="edge.vertexOne.cy"
            v-bind:x2="edge.vertexTwo.cx"
            v-bind:y2="edge.vertexTwo.cy"
            stroke="#c3c3c3" stroke-width="5">
      </line>

      <circle v-for="vertex in vertexList"
              v-bind:id="vertex.id"
              v-bind:cx="vertex.cx"
              v-bind:cy="vertex.cy"
              r="15" color="red"  stroke="#c3c3c3" fill="#d7d7d7" stroke-width="4">
      </circle>
    </svg>
  </div>
</template>

<script>
  import './app-playground.css';
  import * as pgStates from '../../core/pgStates';
  import * as graphMutations from '../../store/graph/graph.mutations';
  import { mapState } from 'vuex';

  export default {
    name: "app-playground",
    data() {
      return {
        pgWidth: 0,
        pgHeight: 0,
        firstEdgeVertex: null
      }
    },
    methods: {
      onPgClick(e) {
        const currentPgState = this.$store.state.currentPgState;

        switch (currentPgState) {
          case pgStates.ADD_VERTEX:
            this.$store.commit(`graph/${graphMutations.GRAPH_ADD_VERTEX}`, {
              cx: e.offsetX,
              cy: e.offsetY
            });
            break;
          case pgStates.ADD_EDGE:
            if (this.firstEdgeVertex) {
              this.$store.commit(`graph/${graphMutations.GRAPH_ADD_EDGE}`, {
                vertexOne: this.firstEdgeVertex,
                vertexTwo: this.$store.getters['graph/vertexById'](e.target.id)
              });

              this.firstEdgeVertex = null;
            } else {
              this.firstEdgeVertex = this.$store.getters['graph/vertexById'](e.target.id);
            }
        }
      }
    },
    computed: {
      ...mapState('graph', [
        'vertexList',
        'edgeList'
      ])
    },
    mounted() {
      const rect = document.getElementById('app-playground').getBoundingClientRect();

      this.pgWidth = rect.width;
      this.pgHeight = rect.height - 3;
    }
  }
</script>
