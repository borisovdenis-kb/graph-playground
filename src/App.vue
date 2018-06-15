<template>
  <div id="app">
    <playground></playground>
    <div class="tool-bar-container">
      <tool-bar></tool-bar>
    </div>
  </div>
</template>

<script>

  import ToolBar from "./components/ToolBar/ToolBar";
  import Playground from "./components/Playground/Playground";

  export default {
    components: {
      Playground,
      ToolBar
    },
    name: 'App'
  }

</script>

<style scoped>
  #app {
    display: flex;
    align-items: center;
    width: 1720px;
    height: 830px;
  }
  .tool-bar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 25%;
    height: 100%;
  }
</style>
