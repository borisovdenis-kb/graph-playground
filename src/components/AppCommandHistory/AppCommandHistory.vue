<template>
  <div class="app-command-history">
    <div class="app-command-history__toolbar">

      <div class="app-command-history__toolbar-title">History</div>

      <div class="app-command-history__toolbar-buttons">

      </div>
    </div>

    <div class="app-command-history__command-list">
      <template v-if="!isCommandHistoryEmpty">
        <div class="app-command-history__command-row" v-for="commandObj in commandList">
          <div class="app-command-history__command-label app-command-history__command-label--left">{{ commandObj.command.name }}</div>
          <div class="app-command-history__command-label app-command-history__command-label--right">{{ commandObj.date }}</div>
        </div>
      </template>
      <template v-else>
        <div class="app-command-history__empty-message">Empty</div>
      </template>
    </div>

  </div>
</template>

<script>
  import './app-command-history.css';
  import mutations from '../../store/mutations';
  import CommandHistory from '../../core/commands/CommandHistory';
  import getters from '../../store/getters';

  export default {
    name: "app-command-history",
    computed: {
      commandList() {
        const commandHistory = this.$store.getters[getters.GET_COMMAND_HISTORY];

        if (commandHistory) {
          return commandHistory.undo;
        }
      },
      isCommandHistoryEmpty() {
        const commandHistory = this.$store.getters[getters.GET_COMMAND_HISTORY];

        if (commandHistory) {
          return commandHistory.undo.length === 0;
        }
      }
    },
    mounted() {
      const commandHistory = new CommandHistory();

      this.$store.commit(mutations.COMMAND_HISTORY_SET, {commandHistory});
    }
  }
</script>

<style scoped>

</style>
