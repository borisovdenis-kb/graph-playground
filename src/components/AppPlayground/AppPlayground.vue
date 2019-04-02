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
            :x1="edge.x1"
            :y1="edge.y1"
            :x2="edge.x2"
            :y2="edge.y2"
            :cursor="edgeCursor"
            stroke="#c3c3c3" stroke-width="5">
      </line>

      <g v-for="vertex in vertexList" :cursor="vertexCursor">
        <circle :id="vertex.vertexId"
                :cx="vertex.cx"
                :cy="vertex.cy"
                :fill="vertexFillColor(vertex.vertexId)"
                r="15"
                stroke="#afafaf"
                stroke-width="4">
        </circle>
        <text :id="vertex.vertexId"
              :x="vertex.cx"
              :y="vertex.cy"
              :stroke="textStrokeColor(vertex.vertexId)"
              text-anchor="middle"
              stroke-width="2px"
              dy=".3em">{{vertex.number}}
        </text>
      </g>
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
  import { isEventOnEntity, createCommandObject, createMultiCommandObject } from "../../services/utils";
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
        this.checkRedoIsEmpty()
          .then(() => {
            return this.$store.dispatch(`graph/${GRAPH_ADD_VERTEX}`, {
              cx: e.offsetX,
              cy: e.offsetY
            });
          })
          .then(result => {
            this.logCommand(GRAPH_ADD_VERTEX, result.data);
          });
      },
      [pgStates.ADD_EDGE] (e) {
        if (!isEventOnEntity(e, entityTypes.VERTEX)) {
          return;
        }

        if (this.firstEdgeVertexId) {
          this.checkRedoIsEmpty()
            .then(() => {
              return this.$store.dispatch(`graph/${GRAPH_ADD_EDGE}`, {
                vertexOneId: this.firstEdgeVertexId,
                vertexTwoId: e.target.id
              });
            })
            .then(result => {
              this.logCommand(GRAPH_ADD_EDGE, result.data);
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

        this.checkRedoIsEmpty()
          .then(() => {
            return this.$store.dispatch(`graph/${GRAPH_DELETE_EDGE}`, {edgeId: e.target.id});
          })
          .then(result => {
            this.logCommand(GRAPH_DELETE_EDGE, result.data);
          });
      },
      [pgStates.DELETE_VERTEX] (e) {
        if (!isEventOnEntity(e, entityTypes.VERTEX)) {
          return;
        }

        this.checkRedoIsEmpty()
          .then(() => {
            const vertexId = e.target.id;
            const subCommands = [];

            this.$store.getters['graph/adjEdgesByVertex'](vertexId).forEach(edge => {
              this.$store.dispatch(`graph/${GRAPH_DELETE_EDGE}`, {edgeId: edge.edgeId})
                .then(result => {
                  subCommands.push(createCommandObject(GRAPH_COMMANDS_MAP[GRAPH_DELETE_EDGE], result.data));
                });
            });

            this.$store.dispatch(`graph/${GRAPH_DELETE_VERTEX}`, {
              vertexId: vertexId
            }).then(result => {
              subCommands.push(createCommandObject(GRAPH_COMMANDS_MAP.GRAPH_DELETE_VERTEX_PRIVATE, result.data));
            }).then(() => {
              this.logMultiCommand(GRAPH_DELETE_VERTEX, subCommands);
            });
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
      textStrokeColor(vertexId) {
        return vertexId === this.firstEdgeVertexId ? '#d7d7d7' : '#6062bf';
      },
      checkRedoIsEmpty() {
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
      },
      logCommand(commandName, data) {
        this.$store.dispatch(
          `commandHistory/${CH_LOG_COMMAND}`,
          createCommandObject(GRAPH_COMMANDS_MAP[commandName], data),
          {root: true}
        );
      },
      logMultiCommand(commandName, subCommands) {
        this.$store.dispatch(
          `commandHistory/${CH_LOG_COMMAND}`,
          createMultiCommandObject(GRAPH_COMMANDS_MAP[commandName], subCommands),
          {root: true}
        );
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
