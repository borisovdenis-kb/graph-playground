<template>
  <div class="app-side-bar">
    <div class="app-tool-bar__main-menu">

    </div>
  </div>
</template>

<script>
  import './app-side-bar.css';
  import {SET_CURRENT_ACTION} from '../../store/mutations';
  import actions from "../../core/actions";
  import AppHeader from "../AppHeader/AppHeader";

  export default {
    name: "app-side-bar",
    components: {
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
