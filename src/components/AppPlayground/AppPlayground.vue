<template>
  <div id="app-playground">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
         :width="pgWidth"
         :height="pgHeight"
         @click="onPgClick"
         @mousemove="onPgMousemove"
         @mousedown="onPgMousedown"
         @mouseup="onPgMouseup">

      <app-edge v-for="edge in edgeList" v-bind:data="edge"></app-edge>

      <app-vertex v-for="vertex in vertexList"
                  v-bind:data="vertex"
                  v-bind:is-selected="firstSelectedVertexId === vertex.vertexId">
      </app-vertex>
    </svg>
  </div>
</template>

<script>
  import './app-playground.css';
  import {
    GRAPH_ADD_VERTEX,
    GRAPH_ADD_EDGE,
    GRAPH_DELETE_VERTEX,
    GRAPH_DELETE_EDGE,
    GRAPH_MOVE_VERTEX,
    GRAPH_UPDATE_EDGE_WEIGHT,
    GRAPH_SET_EDGES_HIGHLIGHTING,
    GRAPH_COMMANDS_MAP
  } from '../../store/graph/graph.actions';
  import * as pgStates from '../../constants/pgStates';
  import * as entityTypes from '../../constants/entityTypes';
  import * as appDialogService from '../../services/appDiIalogService';
  import {CH_LOG_COMMAND} from '../../store/commandHistory/commandHistory.actions';
  import {CLEAR_REDO} from '../../store/commandHistory/commandHistory.mutations';
  import { isEventOnEntity, createMultiCommandObject } from "../../services/utils";
  import { algorithmMap } from "../../constants/algorithms";
  import { mapState } from 'vuex';
  import AppEdge from "../AppEdge/AppEdge";
  import AppVertex from "../AppVertex/AppVertex";

  export default {
    name: "app-playground",
    components: {AppVertex, AppEdge},
    data() {
      return {
        pgWidth: 0,
        pgHeight: 0,
        firstSelectedVertexId: null,
        movableVertexId: null,
        algorithmResult: null,
        edgesToHighlight: null
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

        if (this.firstSelectedVertexId) {
          this.checkRedoIsEmpty()
            .then(() => {
              return this.$store.dispatch(`graph/${GRAPH_ADD_EDGE}`, {
                vertexOneId: this.firstSelectedVertexId,
                vertexTwoId: e.target.id
              });
            })
            .then(command => {
              this.logCommand(command);
              this.firstSelectedVertexId = null;
            });
        } else {
          this.firstSelectedVertexId = e.target.id;
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
        if (isEventOnEntity(e, entityTypes.EDGE)) {
          appDialogService.openEditEdgeDialog({
            data: {
              edgeId: e.target.id
            }
          }).then(data => {
            this.$store.dispatch(`graph/${GRAPH_UPDATE_EDGE_WEIGHT}`, data.edge);
          });
        }
      },
      [pgStates.ALGORITHM](e) {
        if (!isEventOnEntity(e, entityTypes.VERTEX)) {
          return;
        }

        if (this.firstSelectedVertexId) {
          this.edgesToHighlight = this.algorithmResult[e.target.id].path;
          this.$store.dispatch(`graph/${GRAPH_SET_EDGES_HIGHLIGHTING}`, {
            edgesToHighlight: this.edgesToHighlight,
            isHighlighted: true
          });
          this.firstSelectedVertexId = null;
        } else {
          this.firstSelectedVertexId = e.target.id;
          this.algorithmResult = algorithmMap[this.$store.state.selectedAlgorithm](
            this.$store.state.graph.edgeList,
            this.firstSelectedVertexId
          );
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
      checkRedoIsEmpty() {
        const vm = this;

        if (!this.$store.getters['commandHistory/isRedoEmpty']) {
          return appDialogService.openInfoDialog({
            data: {text: 'Отмененные действия будут утеряны!'}
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
      }
    },
    computed: {
      ...mapState('graph', [
        'vertexList',
        'edgeList',
        'isEdgeWeightVisible'
      ])
    },
    mounted() {
      const rect = document.getElementById('app-playground').getBoundingClientRect();

      this.pgWidth = rect.width;
      this.pgHeight = rect.height - 3;
    }
  }
</script>
