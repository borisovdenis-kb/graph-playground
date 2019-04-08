<template>
  <div id="app-playground">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
         :width="pgWidth"
         :height="pgHeight"
         @click="onPgClick"
         @mousemove="onPgMousemove"
         @mousedown="onPgMousedown"
         @mouseup="onPgMouseup">

      <g v-for="edge in edgeList"> <!-- TODO: вынести в компоненты -->
        <line :id="edge.edgeId"
              :x1="edge.x1"
              :y1="edge.y1"
              :x2="edge.x2"
              :y2="edge.y2"
              :cursor="edgeCursor"
              stroke="#c3c3c3"
              stroke-width="5"> <!-- TODO: проверить, что все нормально с курсором-->
        </line>
        <rect v-if="isEdgeWeightVisible"
              :id="edge.edgeId"
              :x="calcMiddleCoordinate(edge.x1, edge.x2) - 10"
              :y="calcMiddleCoordinate(edge.y1, edge.y2) - 10"
              width="35px"
              height="20px"
              fill="#f0f0f0"
              style="opacity: 0.8"
              rx="4"
              ry="4"></rect>

        <text v-if="isEdgeWeightVisible"
              :id="edge.edgeId"
              :x="calcMiddleCoordinate(edge.x1, edge.x2) + 7"
              :y="calcMiddleCoordinate(edge.y1, edge.y2) + 5"
              text-anchor="middle"
              fill="#c3c3c3">
          {{edge.weight || 0}}
        </text>
      </g>

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
              dy=".3em">
          {{vertex.number}}
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
  import './app-playground.css';
  import * as pgStates from '../../constants/pgStates';
  import {
    GRAPH_ADD_VERTEX,
    GRAPH_ADD_EDGE,
    GRAPH_DELETE_VERTEX,
    GRAPH_DELETE_EDGE,
    GRAPH_MOVE_VERTEX,
    GRAPH_COMMANDS_MAP
  } from '../../store/graph/graph.actions';
  import * as entityTypes from '../../constants/entityTypes';
  import * as appDialogService from '../../services/appDiIalogService';
  import {CH_LOG_COMMAND} from '../../store/commandHistory/commandHistory.actions';
  import {CLEAR_REDO} from '../../store/commandHistory/commandHistory.mutations';
  import { isEventOnEntity, createMultiCommandObject } from "../../services/utils";
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
          .then(this.logCommand);
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
            .then(command => {
              this.logCommand(command);
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
          .then(this.logCommand);
      },
      [pgStates.DELETE_VERTEX] (e) {
        if (!isEventOnEntity(e, entityTypes.VERTEX)) {
          return;
        }

        // TODO: move logic to $store !!!

        this.checkRedoIsEmpty()
          .then(() => {
            const vertex = this.$store.getters['graph/vertexById'](e.target.id);
            const subCommands = [];

            this.$store.getters['graph/adjEdgesByVertex'](vertex.vertexId).forEach(edge => {
              this.$store.dispatch(`graph/${GRAPH_DELETE_EDGE}`, {edgeId: edge.edgeId})
                .then(command => {
                  subCommands.push(command);
                });
            });

            this.$store.dispatch(`graph/${GRAPH_DELETE_VERTEX}`, {
              vertexId: vertex.vertexId
            }).then(command => {
              subCommands.push(command);
            }).then(() => {
              const command = createMultiCommandObject({
                commandDefinition: GRAPH_COMMANDS_MAP[GRAPH_DELETE_VERTEX],
                text: `Delete Vertex V(${vertex.number})`,
                subCommands,
              });

              this.logCommand(command);
            });
          });
      },
      [pgStates.SELECT_ENTITY](e) {
        if (!isEventOnEntity(e, entityTypes.VERTEX)) {
          appDialogService.openEditEdgeDialog({
            data: {
              edgeId: e.target.id
            }
          });
        }
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
      logCommand(command) {
        this.$store.dispatch(
          `commandHistory/${CH_LOG_COMMAND}`,
          command,
          {root: true}
        );
      },
      calcMiddleCoordinate(c1, c2) {
        return (c1 + c2) / 2;
      }
    },
    computed: {
      ...mapState('graph', [
        'vertexList',
        'edgeList',
        'isEdgeWeightVisible'
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
