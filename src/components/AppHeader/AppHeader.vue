<template>
  <div class="app-header">
    <div class="app-header__logo">Graph Playground</div>
    <div class="app-header__toolbar">
      <app-header-toolbar></app-header-toolbar>
    </div>
  </div>
</template>

<script>
  import './app-header.css';
  import AppHeaderToolbar from "../AppHeaderToolbar/AppHeaderToolbar";

  export default {
    name: "appHeader",
    components: {AppHeaderToolbar}
  }
</script>

<style scoped>

</style>
