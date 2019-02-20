<template>
  <div class="app-header-toolbar">
    <div class="app-button-toolbar__btn-group app-button-toolbar__btn-group-first">
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

    <div class="app-button-toolbar__btn-group app-button-toolbar__btn-group-last">
      <div class="app-header-toolbar__button">
        <app-button v-on:click="setCurrentPgState(pgStates.ADD_EDGE)"
                    v-bind:is-selected="checkPgState(pgStates.ADD_EDGE)"
                    icon-text="E+">
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
  import './app-header-toolbar.css';
  import AppButton from '../AppButton/AppButton';
  import * as mutations from '../../store/mutations';
  import * as pgStates from "../../core/pgStates";
  import AppSeparator from "../AppSeparator/AppSeparator";

  export default {
    name: "AppHeaderToolbar",
    components: {AppSeparator, AppButton},
    data() {
      return {
        pgStates
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
      }
    }
  }
</script>

<style scoped>

</style>
