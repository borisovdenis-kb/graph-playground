<template>
  <div class="app-side-bar">
    <div class="app-side-bar__main-menu app-side-bar__group--first">

    </div>

    <app-separator width="250px"></app-separator>

    <div class="app-side-bar__command-history-container app-side-bar__group--last">
      <app-action-history></app-action-history>
    </div>
  </div>
</template>

<script>
  import './app-side-bar.css';
  import AppHeader from "../AppHeader/AppHeader";
  import AppSeparator from "../AppSeparator/AppSeparator";
  import AppActionHistory from "../AppActionHistory/AppActionHistory";

  export default {
    name: "app-side-bar",
    components: {
      AppActionHistory,
      AppSeparator,
      AppHeader
    }
  }
</script>
