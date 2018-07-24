<template>
  <div class="command-history">
    <div class="command-history__toolbar">

      <div class="command-history__toolbar-title">History</div>

      <el-row class="command-history__toolbar-buttons">
        <el-button class="command-history__button"
                   type="primary"
                   circle
                   icon="el-icon-delete"
                   size="mini"
                   v-bind:disabled="!$store.getters.getCommandHistoryUndoLength"
                   v-on:click="undoLastCommand()">
        </el-button>

        <el-button class="command-history__button"
                   type="primary"
                   circle
                   icon="el-icon-delete"
                   size="mini"
                   v-bind:disabled="!$store.getters.getCommandHistoryRedoLength"
                   v-on:click="redoLastCommand()">
        </el-button>
      </el-row>
    </div>

    <div class="command-history__command-list">
      <template v-if="$store.getters.getCommandHistoryUndoLength">
        <div class="command-history__command-row" v-for="command in commandList">
          <div class="command-history__command-label command-history__command-label--left">{{ command.name }}</div>
          <div class="command-history__command-label command-history__command-label--right">{{ command.date }}</div>
        </div>
      </template>
      <template v-else>
        <div class="command-history__empty-message">Empty</div>
      </template>
    </div>

  </div>
</template>

<script>
  import './command-history.css';
  import * as mutations from '../../store/mutations';

  export default {
    name: "command-history",
    props: {
      commandList: Array
    },
    methods: {
      undoLastCommand() {
        this.$store.commit(mutations.UNDO_LAST_COMMAND);
      },
      redoLastCommand() {
        this.$store.commit(mutations.REDO_LAST_COMMAND);
      }
    }
  }
</script>

<style scoped>

</style>
