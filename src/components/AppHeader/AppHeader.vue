<template>
  <div class="app-header">
    <div class="app-header__logo">Graph Playground</div>

    <div class="app-header__toolbar">
      <app-header-toolbar></app-header-toolbar>
    </div>

    <div class="app-header__entity-counter">
      <app-entity-counter></app-entity-counter>
    </div>
  </div>
</template>

<script>
  import './app-header.css';
  import AppHeaderToolbar from "../AppHeaderToolbar/AppHeaderToolbar";
  import AppEntityCounter from "../AppEntityCounter/AppEntityCounter";

  export default {
    name: "appHeader",
    components: {AppEntityCounter, AppHeaderToolbar}
  }
</script>

<style scoped>

</style>
