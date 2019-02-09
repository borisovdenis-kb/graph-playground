<template>
  <div class="app-header-toolbar">
    <div class="app-header-toolbar__button">
      <app-button v-on:click="setCurrentAction(actions.ADD_VERTEX)"
                  v-bind:is-selected="checkAction(actions.ADD_VERTEX)"
                  icon-text="V+">
      </app-button>
    </div>

    <div class="app-header-toolbar__button">
      <app-button v-on:click="setCurrentAction(actions.ADD_EDGE)"
                  v-bind:is-selected="checkAction(actions.ADD_EDGE)"
                  icon-text="E+">
      </app-button>
    </div>

    <div class="app-header-toolbar__button">
      <app-button v-on:click="setCurrentAction(actions.DELETE_VERTEX)"
                  v-bind:is-selected="checkAction(actions.DELETE_VERTEX)"
                  icon-text="V-">
      </app-button>
    </div>
  </div>
</template>

<script>
  import './app-header-toolbar.css';
  import AppButton from '../AppButton/AppButton';
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
      checkAction(action) {
        return this.$store.state.currentAction === action;
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
