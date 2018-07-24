<template>
  <div class="tool-bar">
    <div class="tool-bar__add-relation-form">

      <el-row class="tool-bar__row">
        <el-button class="tool-bar__action-button"
                   round
                   icon="el-icon-share"
                   v-on:click="setCurrentCommand(commandNames.ADD_EDGE)">
          Add Edge
        </el-button>
      </el-row>

      <el-row class="tool-bar__row">
        <el-button class="tool-bar__action-button"
                   round
                   icon="el-icon-delete"
                   v-on:click="setCurrentCommand(commandNames.DELETE_VERTEX)">
          Delete Vertex
        </el-button>
      </el-row>

      <el-row class="tool-bar__row">
        <el-button class="tool-bar__action-button"
                   round
                   icon="el-icon-menu"
                   v-on:click="alignGraph()">
          Align Graph
        </el-button>
      </el-row>

      <div class="tool-bar__row">
        <div class="tool-bar__separator"></div>
      </div>

    </div>

    <command-history v-bind:command-list="$store.getters.getCommandHistoryUndoList">
    </command-history>
  </div>
</template>

<script>
  import './tool-bar.css';
  import {SET_CURRENT_COMMAND} from '../../store/mutations';
  import * as commandNames from "../../core/graph-commands/commandNames";
  import DeleteVertexCommand from "../../core/graph-commands/DeleteVertexCommand";
  import ElBadge from "element-ui/packages/badge/src/main";
  import CommandHistory from "../CommandHistory/CommandHistory";
  import AddEdgeCommand from "../../core/graph-commands/AddEdgeCommand";

  export default {
    components: {
      CommandHistory,
      ElBadge},
    name: "tool-bar",
    data() {
      return {
        commandNames
      }
    },
    methods: {
      setCurrentCommand(commandName) {
        let command;

        switch (commandName) {
          case this.commandNames.DELETE_VERTEX:
            command = new DeleteVertexCommand(this.commandNames.DELETE_VERTEX);
            break;
          case this.commandNames.ADD_EDGE:
            command = new AddEdgeCommand(this.commandNames.ADD_EDGE);
            break;
        }

        this.$store.commit(SET_CURRENT_COMMAND, {
          command: command
        });
      },
      alignGraph() {
        this.$store.state.graph.align();
      }
    }
  }
</script>
