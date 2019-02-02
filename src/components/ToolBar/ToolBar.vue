<template>
  <div class="tool-bar">
    <div class="tool-bar__add-relation-form">

      <el-row class="tool-bar__row">
        <el-button class="tool-bar__action-button"
                   round
                   icon="el-icon-share"
                   v-on:click="setCurrentAction(actions.ADD_VERTEX)">
          Add Vertex
        </el-button>
      </el-row>

      <el-row class="tool-bar__row">
        <el-button class="tool-bar__action-button"
                   round
                   icon="el-icon-share"
                   v-on:click="setCurrentAction(actions.ADD_EDGE)">
          Add Edge
        </el-button>
      </el-row>

      <el-row class="tool-bar__row">
        <el-button class="tool-bar__action-button"
                   round
                   icon="el-icon-delete"
                   v-on:click="setCurrentAction(actions.DELETE_VERTEX)">
          Delete Vertex
        </el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import './tool-bar.css';
  import {SET_CURRENT_ACTION} from '../../store/mutations';
  import actions from "../../core/actions";

  export default {
    name: "tool-bar",
    data() {
      return {
        actions
      }
    },
    methods: {
      setCurrentAction(action) {
        this.$store.commit(SET_CURRENT_ACTION, {
          action: action
        });
      }
    }
  }
</script>
