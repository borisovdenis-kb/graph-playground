<template>
  <div class="app-side-bar">
    <div class="app-side-bar__main-menu app-side-bar__group--first">

    </div>

    <app-separator width="250px"></app-separator>

    <div class="app-side-bar__command-history-container app-side-bar__group--last">
      <app-command-history></app-command-history>
    </div>

    <button v-on:click="open">Open</button>
    <!--<button>Close</button>-->
  </div>
</template>

<script>
  import './app-side-bar.css';
  import AppHeader from "../AppHeader/AppHeader";
  import AppSeparator from "../AppSeparator/AppSeparator";
  import AppCommandHistory from "../AppActionHistory/AppCommandHistory";
  import TestDialog from "../dialogs/TestDialog";
  import BaseDialogService from '../../services/baseDialogService';

  export default {
    name: "app-side-bar",
    components: {
      TestDialog,
      AppCommandHistory,
      AppSeparator,
      AppHeader
    },
    data() {
      return {
        flag: false
      }
    },
    methods: {
      open() {
        BaseDialogService.open(
          TestDialog,
          {text: 'Hey Hey Hey'},
          {caption: 'Hello Dialog World', width: 300, height: 250}
        ).then(data => {
          console.log(data);
        }).catch(data => {
          console.log(data);
        });
      }
    }
  }
</script>
