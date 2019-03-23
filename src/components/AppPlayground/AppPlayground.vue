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
            :id="edge.edgeId"
            :x1="edge.vertexOne.cx"
            :y1="edge.vertexOne.cy"
            :x2="edge.vertexTwo.cx"
            :y2="edge.vertexTwo.cy"
            :cursor="edgeCursor"
            stroke="#c3c3c3" stroke-width="5">
      </line>

      <circle v-for="vertex in vertexList"
              :id="vertex.vertexId"
              :cx="vertex.cx"
              :cy="vertex.cy"
              :cursor="vertexCursor"
              :fill="vertexFillColor(vertex.vertexId)"
              r="15" stroke="#afafaf" stroke-width="4">
      </circle>
    </svg>
  </div>
</template>

<script>
  import './app-playground.css';
  import * as pgStates from '../../contants/pgStates';
  import {
    GRAPH_ADD_VERTEX,
    GRAPH_ADD_EDGE,
    GRAPH_DELETE_VERTEX,
    GRAPH_DELETE_EDGE,
    GRAPH_MOVE_VERTEX,
    GRAPH_COMMANDS_MAP
  } from '../../store/graph/graph.actions';
  import * as entityTypes from '../../contants/entityTypes';
  import * as appDialogService from '../../services/appDiIalogService';
  import {CH_LOG_COMMAND} from '../../store/commandHistory/commandHistory.actions';
  import {CLEAR_REDO} from '../../store/commandHistory/commandHistory.mutations';
  import { isEventOnEntity, createCommandObject } from "../../services/utils";
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
        this.checkUndoIsEmpty()
          .then(() => {
            return this.$store.dispatch(`graph/${GRAPH_ADD_VERTEX}`, {
              cx: e.offsetX,
              cy: e.offsetY
            });
          })
          .then(result => {
            this.$store.dispatch(
              `commandHistory/${CH_LOG_COMMAND}`,
              createCommandObject(GRAPH_COMMANDS_MAP[GRAPH_ADD_VERTEX], result.data),
              {root: true}
            );
          });
      },
      [pgStates.ADD_EDGE] (e) {
        if (!isEventOnEntity(e, entityTypes.VERTEX)) {
          return;
        }

        if (this.firstEdgeVertexId) {
          this.checkUndoIsEmpty()
            .then(() => {
              return this.$store.dispatch(`graph/${GRAPH_ADD_EDGE}`, {
                vertexOneId: this.firstEdgeVertexId,
                vertexTwoId: e.target.id
              });
            })
            .then(result => {
              this.$store.dispatch(
                `commandHistory/${CH_LOG_COMMAND}`,
                createCommandObject(GRAPH_COMMANDS_MAP[GRAPH_ADD_EDGE], result.data),
                {root: true}
              );

              this.firstEdgeVertexId = null;
            });
        } else {
          this.firstEdgeVertexId = e.target.id;
        }
      },
      [pgStates.DELETE_EDGE] (e) {
        if (!isEventOnEntity(e, entityTypes.EDGE)) {
          return;
        }

        this.$store.dispatch(`graph/${GRAPH_DELETE_EDGE}`, {edgeId: e.target.id});
      },
      [pgStates.DELETE_VERTEX] (e) {
        this.$store.dispatch(`graph/${GRAPH_DELETE_VERTEX}`, {
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
          this.$store.dispatch(`graph/${GRAPH_MOVE_VERTEX}`, {
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
      },
      vertexFillColor(vertexId) {
        return vertexId === this.firstEdgeVertexId ? '#6062bf' : '#d7d7d7';
      },
      checkUndoIsEmpty() {
        const vm = this;

        if (!this.$store.getters['commandHistory/isRedoEmpty']) {
          return appDialogService.openInfoDialog({
            data: {text: 'Отмененные действия будут утеряны!'},
            options: {caption: 'Внимание', width: 400, height: 200}
          }).then(() => {
            vm.$store.commit(`commandHistory/${CLEAR_REDO}`);
          });
        }

        return Promise.resolve();
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
          [pgStates.ADD_EDGE]: 'pointer',
          [pgStates.DELETE_EDGE]: 'pointer'
        };
        const currentPgState = this.$store.state.currentPgState;

        return mapStateToCursor[currentPgState];
      },
      edgeCursor() {
        const mapStateToCursor = {
          [pgStates.DELETE_EDGE]: 'pointer'
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
