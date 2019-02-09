<template>
  <div class="app-side-bar">
    <div class="app-tool-bar__main-menu">

      <app-button text="Add Vertex"
                  v-on:click="setCurrentAction(actions.ADD_VERTEX)">
      </app-button>

      <app-button text="Add Edge"
                  v-on:click="setCurrentAction(actions.ADD_EDGE)">
      </app-button>

      <app-button text="Delete Vertex"
                  v-on:click="setCurrentAction(actions.DELETE_VERTEX)">
      </app-button>
    </div>
  </div>
</template>

<script>
  import './app-side-bar.css';
  import {SET_CURRENT_ACTION} from '../../store/mutations';
  import actions from "../../core/actions";
  import AppHeader from "../AppHeader/AppHeader";
  import AppButton from "../AppButton/AppButton";

  export default {
    name: "app-side-bar",
    components: {
      AppButton,
      AppHeader
    },
    data() {
      return {
        actions
      }
    },
    methods: {
      setCurrentAction(action) {
        this.$store.commit(SET_CURRENT_ACTION, {
          action: action
        });
      }
    }
  }
</script>
