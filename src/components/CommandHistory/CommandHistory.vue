<template>
  <div class="command-history">
    <div class="command-history__toolbar">

      <div class="command-history__toolbar-title">History</div>

      <el-row class="command-history__toolbar-buttons">
        <el-button class="command-history__button"
                   circle
                   icon="el-icon-delete"
                   size="mini"
                   v-on:click="undoLastCommand()">
        </el-button>
      </el-row>
    </div>
    <div class="command-history__command-list">
      <div class="command-history__command-row" v-for="command in commandList">
        {{ command.name }}
      </div>
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
        const command = this.$store.getters.getLastCommand;
        command.cancel();
        this.$store.commit(mutations.POP_LAST_COMMAND);
      }
    }
  }
</script>

<style scoped>

</style>
