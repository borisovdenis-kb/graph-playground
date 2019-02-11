<template>
  <div class="app-header-toolbar">
    <div class="app-button-toolbar__btn-group app-button-toolbar__btn-group-first">
      <div class="app-header-toolbar__button">
        <app-button v-on:click="setCurrentAction(actions.ADD_VERTEX)"
                    v-bind:is-selected="checkAction(actions.ADD_VERTEX)"
                    icon-text="V+">
        </app-button>
      </div>

      <div class="app-header-toolbar__button">
        <app-button v-on:click="setCurrentAction(actions.DELETE_VERTEX)"
                    v-bind:is-selected="checkAction(actions.DELETE_VERTEX)"
                    icon-text="V-">
        </app-button>
      </div>

      <div class="app-header-toolbar__button">
        <app-button v-on:click="setCurrentAction(actions.MOVE_VERTEX)"
                    v-bind:is-selected="checkAction(actions.MOVE_VERTEX)"
                    icon-text="D">
        </app-button>
      </div>
    </div>

    <app-separator is-vertical="true"></app-separator>

    <div class="app-button-toolbar__btn-group app-button-toolbar__btn-group-last">
      <div class="app-header-toolbar__button">
        <app-button v-on:click="setCurrentAction(actions.ADD_EDGE)"
                    v-bind:is-selected="checkAction(actions.ADD_EDGE)"
                    icon-text="E+">
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
  import './app-header-toolbar.css';
  import AppButton from '../AppButton/AppButton';
  import {CURRENT_ACTION_SET} from '../../store/mutations';
  import actions from "../../core/actions";
  import AppSeparator from "../AppSeparator/AppSeparator";

  export default {
    name: "AppHeaderToolbar",
    components: {AppSeparator, AppButton},
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
        this.$store.commit(CURRENT_ACTION_SET, {
          action: action
        });
      }
    }
  }
</script>

<style scoped>

</style>
