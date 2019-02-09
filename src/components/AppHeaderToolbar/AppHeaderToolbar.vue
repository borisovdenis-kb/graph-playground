<template>
  <div class="app-header-toolbar">
    <div class="app-header-toolbar__button">
      <app-button v-on:click="setCurrentAction(actions.ADD_VERTEX)"
                  v-bind:is-selected="chekAction(actions.ADD_VERTEX)">
      </app-button>
    </div>

    <div class="app-header-toolbar__button">
      <app-button v-on:click="setCurrentAction(actions.ADD_EDGE)"
                  v-bind:is-selected="chekAction(actions.ADD_EDGE)">
      </app-button>
    </div>

    <div class="app-header-toolbar__button">
      <app-button v-on:click="setCurrentAction(actions.DELETE_VERTEX)"
                  v-bind:is-selected="chekAction(actions.DELETE_VERTEX)">
      </app-button>
    </div>
  </div>
</template>

<script>
  import './app-header-toolbar.css';
  import AppButton from '../AppButton/AppButton';
  import $store from '../../store/store';
  import {SET_CURRENT_ACTION} from '../../store/mutations';
  import actions from "../../core/actions";

  export default {
    name: "AppHeaderToolbar",
    components: {AppButton},
    data() {
      return {
        actions
      }
    },
    methods: {
      chekAction(action) {
        return $store.state.currentAction === action;
      },
      setCurrentAction(action) {
        this.$store.commit(SET_CURRENT_ACTION, {
          action: action
        });
      }
    }
  }
</script>

<style scoped>

</style>
