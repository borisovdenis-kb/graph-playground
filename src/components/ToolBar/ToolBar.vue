<template>
  <div class="tool-bar">
    <div class="tool-bar__add-relation-form">
      <el-row class="tool-bar__row">
        <el-button class="tool-bar__action-button" round v-on:click="setCurrentAction(actions.ADD_EDGE)">
          Add Edge
        </el-button>
      </el-row>

      <el-row class="tool-bar__row">
        <el-button round v-on:click="setCurrentAction(actions.DELETE_VERTEX)">
          Delete Vertex
        </el-button>
      </el-row>
    </div>

    <ul v-if="$store.graph">
      <li v-for="(v, id) in $store.graph.vertexMap">
        {{ v.id }}
      </li>
    </ul>
  </div>
</template>

<script>
  import './tool-bar.css';
  import {CHANGE_CURRENT_ACTION} from '../../store/mutations';
  import * as actions from "../../core/actions";

  export default {
    name: "tool-bar",
    data() {
      return {
        actions
      }
    },
    methods: {
      setCurrentAction(action) {
        this.$store.commit(CHANGE_CURRENT_ACTION, {
          action: action
        });
      }
    }
  }
</script>
