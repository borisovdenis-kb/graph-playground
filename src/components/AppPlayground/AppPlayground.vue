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
              :id="vertex.id"
              :cx="vertex.cx"
              :cy="vertex.cy"
              :cursor="vertexCursor"
              r="15" color="red" stroke="#afafaf" fill="#d7d7d7" stroke-width="4">
      </circle>
    </svg>
  </div>
</template>

<script>
  import './app-playground.css';
  import * as pgStates from '../../contants/pgStates';
  import * as graphActions from '../../store/graph/graph.actions';
  import * as entityTypes from '../../contants/entityTypes';
  import { isEventOnEntity } from "../../services/utils";
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
      [pgStates.ADD_VERTEX] (e) {
        this.$store.dispatch(`graph/${graphActions.GRAPH_ADD_VERTEX}`, {
          cx: e.offsetX,
          cy: e.offsetY
        });
      },
      [pgStates.ADD_EDGE] (e) {
        if (!isEventOnEntity(e, entityTypes.VERTEX)) {
          return;
        }

        if (this.firstEdgeVertexId) {
          this.$store.dispatch(`graph/${graphActions.GRAPH_ADD_EDGE}`, {
            vertexOneId: this.firstEdgeVertexId,
            vertexTwoId: e.target.id
          });

          this.firstEdgeVertexId = null;
        } else {
          this.firstEdgeVertexId = e.target.id;
        }
      },
      [pgStates.DELETE_VERTEX] (e) {
        this.$store.dispatch(`graph/${graphActions.GRAPH_DELETE_VERTEX}`, {
          vertexId: e.target.id
        });
      },
      onPgClick(e) {
        const currentPgState = this.$store.state.currentPgState;

        if (this[currentPgState]) {
          this[currentPgState](e);
        }
      },
      onPgMousemove(e) {
        const currentPgState = this.$store.state.currentPgState;

        if (currentPgState === pgStates.MOVE_VERTEX && this.movableVertexId) {
          this.$store.dispatch(`graph/${graphActions.GRAPH_MOVE_VERTEX}`, {
            cx: e.offsetX,
            cy: e.offsetY,
            vertexId: this.movableVertexId
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
      ]),
      vertexCursor() {
        const mapStateToCursor = {
          [pgStates.MOVE_VERTEX]: 'move',
          [pgStates.DELETE_VERTEX]: 'pointer',
          [pgStates.ADD_EDGE]: 'pointer'
        };
        const currentPgState = this.$store.state.currentPgState;

        return mapStateToCursor[currentPgState];
      }
    },
    mounted() {
      const rect = document.getElementById('app-playground').getBoundingClientRect();

      this.pgWidth = rect.width;
      this.pgHeight = rect.height - 3;
    }
  }
</script>
