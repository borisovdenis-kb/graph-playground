<template>
  <div id="app-playground">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
         :width="pgWidth"
         :height="pgHeight"
         @click="onPgClick"
         @mousemove="onPgMousemove"
         @mousedown="onPgMousedown"
         @mouseup="onPgMouseup">

      <line v-for="edge in edgeList"
            :x1="edge.vertexOne.cx"
            :y1="edge.vertexOne.cy"
            :x2="edge.vertexTwo.cx"
            :y2="edge.vertexTwo.cy"
            stroke="#c3c3c3" stroke-width="5">
      </line>

      <circle v-for="vertex in vertexList"
              v-bind:id="vertex.id"
              v-bind:cx="vertex.cx"
              v-bind:cy="vertex.cy"
              r="15" color="red" stroke="#afafaf" fill="#d7d7d7" stroke-width="4">
      </circle>
    </svg>
  </div>
</template>

<script>
  import './app-playground.css';
  import * as pgStates from '../../core/pgStates';
  import * as graphMutations from '../../store/graph/graph.mutations';
  import * as graphActions from '../../store/graph/graph.actions';
  import { mapState } from 'vuex';

  export default {
    name: "app-playground",
    data() {
      return {
        pgWidth: 0,
        pgHeight: 0,
        firstEdgeVertexId: null,
        movableVertexId: null
      }
    },
    methods: {
      onPgClick(e) {
        const currentPgState = this.$store.state.currentPgState;

        switch (currentPgState) {
          case pgStates.ADD_VERTEX:
            this.$store.dispatch(`graph/${graphActions.GRAPH_ADD_VERTEX}`, {
              cx: e.offsetX,
              cy: e.offsetY
            });
            break;
          case pgStates.ADD_EDGE:
            if (this.firstEdgeVertexId) {
              this.$store.dispatch(`graph/${graphActions.GRAPH_ADD_EDGE}`, {
                vertexOneId: this.firstEdgeVertexId,
                vertexTwoId: e.target.id
              });

              this.firstEdgeVertexId = null;
            } else {
              this.firstEdgeVertexId = e.target.id;
            }
        }
      },
      onPgMousemove(e) {
        const currentPgState = this.$store.state.currentPgState;

        if (currentPgState === pgStates.MOVE_VERTEX && this.movableVertexId) {
          this.$store.dispatch(`graph/${graphActions.GRAPH_MOVE_VERTEX}`, {
            cx: e.offsetX,
            cy: e.offsetY,
            id: this.movableVertexId
          });
        }
      },
      onPgMousedown(e) {
        const currentPgState = this.$store.state.currentPgState;

        if (currentPgState === pgStates.MOVE_VERTEX) {
          this.movableVertexId = e.target.id;
        }
      },
      onPgMouseup() {
        const currentPgState = this.$store.state.currentPgState;

        if (currentPgState === pgStates.MOVE_VERTEX && this.movableVertexId) {
          this.movableVertexId = null;
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
