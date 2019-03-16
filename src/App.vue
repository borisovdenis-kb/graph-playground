<template>
  <div id="app" ref="app">
    <div class="header-container">
      <app-header></app-header>
    </div>
    <div class="main-container">
      <div class="playground-container">
        <app-playground></app-playground>
      </div>
      <div class="tool-bar-container">
        <app-side-bar></app-side-bar>
      </div>
    </div>

    <div class="global-blackout"></div>
  </div>
</template>

<script>
  import AppHeader from "./components/AppHeader/AppHeader";
  import AppSideBar from "./components/AppSideBar/AppSideBar";
  import AppPlayground from "./components/AppPlayground/AppPlayground";

  export default {
    components: {
      AppPlayground,
      AppSideBar,
      AppHeader
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
