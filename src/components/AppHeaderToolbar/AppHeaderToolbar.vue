<template>
  <div class="app-header-toolbar">
    <div class="app-button-toolbar__btn-group app-button-toolbar__btn-group-first">
      <div class="app-header-toolbar__button">
        <app-button v-on:click="setCurrentPgState(pgStates.SELECT_ENTITY)"
                    v-bind:is-selected="checkPgState(pgStates.SELECT_ENTITY)"
                    icon-text="C">
        </app-button>
      </div>
    </div>

    <app-separator is-vertical="true"></app-separator>

    <div class="app-button-toolbar__btn-group app-button-toolbar__btn-group-middle">
      <div class="app-header-toolbar__button">
        <app-button v-on:click="setCurrentPgState(pgStates.ADD_VERTEX)"
                    v-bind:is-selected="checkPgState(pgStates.ADD_VERTEX)"
                    icon-text="V+">
        </app-button>
      </div>

      <div class="app-header-toolbar__button">
        <app-button v-on:click="setCurrentPgState(pgStates.DELETE_VERTEX)"
                    v-bind:is-selected="checkPgState(pgStates.DELETE_VERTEX)"
                    icon-text="V-">
        </app-button>
      </div>

      <div class="app-header-toolbar__button">
        <app-button v-on:click="setCurrentPgState(pgStates.MOVE_VERTEX)"
                    v-bind:is-selected="checkPgState(pgStates.MOVE_VERTEX)"
                    icon-text="D">
        </app-button>
      </div>
    </div>

    <app-separator is-vertical="true"></app-separator>

    <div class="app-button-toolbar__btn-group app-button-toolbar__btn-group-middle">
      <div class="app-header-toolbar__button">
        <app-button v-on:click="setCurrentPgState(pgStates.ADD_EDGE)"
                    v-bind:is-selected="checkPgState(pgStates.ADD_EDGE)"
                    icon-text="E+">
        </app-button>
      </div>

      <div class="app-header-toolbar__button">
        <app-button v-on:click="setCurrentPgState(pgStates.DELETE_EDGE)"
                    v-bind:is-selected="checkPgState(pgStates.DELETE_EDGE)"
                    icon-text="E-">
        </app-button>
      </div>
    </div>

    <app-separator is-vertical="true"></app-separator>

    <div class="app-button-toolbar__btn-group app-button-toolbar__btn-group-last">
      <div class="app-header-toolbar__button">
        <label>Show edge weight</label>
        <input type="checkbox"
               v-bind:value="isEdgeWeightVisible"
               v-on:click="toggleEdgeWeightVisibility()"/>
      </div>
    </div>

    <app-separator is-vertical="true"></app-separator>

    <div class="app-button-toolbar__btn-group app-button-toolbar__btn-group-last">
      <el-select v-model="selectedAlgorithm"
                 v-on:change="onAlgorithmSelect"
                 clearable
                 placeholder="Select algorithm"
                 size="mini">
        <el-option
          v-for="item in algorithmOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  import './app-header-toolbar.css';
  import AppButton from '../AppButton/AppButton';
  import AppSeparator from "../AppSeparator/AppSeparator";
  import {mapState} from 'vuex';
  import * as algorithmNames from '../../constants/algorithms';
  import * as mutations from '../../store/mutations';
  import * as graphMutations from '../../store/graph/graph.mutations';
  import * as grpahActions from '../../store/graph/graph.actions';
  import * as pgStates from "../../constants/pgStates";

  export default {
    name: "AppHeaderToolbar",
    components: {AppSeparator, AppButton},
    data() {
      return {
        pgStates,
        algorithmOptions: [{
          value: algorithmNames.DIJKSTRA_ALGORITHM,
          label: 'Dijkstra'
        }],
        selectedAlgorithm: ''
      }
    },
    methods: {
      checkPgState(state) {
        return this.$store.state.currentPgState === state;
      },
      setCurrentPgState(state) {
        this.$store.commit(mutations.SET_CURRENT_PG_STATE, {
          state: state
        });

        if (state !== pgStates.ALGORITHM) {
          this.$store.dispatch(`graph/${grpahActions.GRAPH_SET_EDGES_HIGHLIGHTING}`, {
            isHighlighted: false
          });
          this.$store.commit(mutations.SET_SELECTED_ALGORITHM, {
            selectedAlgorithm: null
          });
          this.selectedAlgorithm = null;
        }
      },
      toggleEdgeWeightVisibility() {
        this.$store.commit(`graph/${graphMutations.SET_EDGE_WEIGHT_VISIBILITY}`, {
          flag: !this.$store.state.graph.isEdgeWeightVisible
        });
      },
      onAlgorithmSelect(value) {
        if (!value) {
          this.$store.commit(mutations.RESET_CURRENT_PG_STATE);
          this.$store.dispatch(`graph/${grpahActions.GRAPH_SET_EDGES_HIGHLIGHTING}`, {
            isHighlighted: false
          });
          return;
        }

        this.setCurrentPgState(pgStates.ALGORITHM);

        this.$store.commit(mutations.SET_SELECTED_ALGORITHM, {
          selectedAlgorithm: value
        });
      }
    },
    computed: {
      ...mapState('graph', [
        'isEdgeWeightVisible'
      ])
    }
  }
</script>

<style scoped>

</style>
