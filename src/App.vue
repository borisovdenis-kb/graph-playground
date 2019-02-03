<template>
  <div id="app">
    <div class="header-container">
      <app-header></app-header>
    </div>
    <div class="main-container">
      <div class="playground-container">
        <playground></playground>
      </div>
      <div class="tool-bar-container">
        <tool-bar></tool-bar>
      </div>
    </div>
  </div>
</template>

<script>

  import ToolBar from "./components/ToolBar/ToolBar";
  import Playground from "./components/Playground/Playground";
  import AppHeader from "./components/Header/AppHeader";

  export default {
    components: {
      AppHeader,
      Playground,
      ToolBar
    },
    name: 'App'
  }

</script>

<style scoped>
  #app {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .main-container {
    display: flex;
    width: 100%;
    height: calc(100% - 40px);
  }

  .playground-container {
    width: 80%;
    height: 100%;
  }

  .tool-bar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 100%;
  }
</style>
