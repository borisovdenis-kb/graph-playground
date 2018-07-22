<template>
  <div class="tool-bar">
    <div class="tool-bar__add-relation-form">

      <el-row class="tool-bar__row">
        <el-button class="tool-bar__action-button"
                   round
                   icon="el-icon-share"
                   v-on:click="setCurrentCommand()">
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

    <command-history v-bind:command-list="$store.state.commandHistory">
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
            command = new DeleteVertexCommand("Delete Vertex");
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
