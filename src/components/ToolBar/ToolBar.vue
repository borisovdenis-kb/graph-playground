<template>
  <div class="tool-bar">
    <div class="tool-bar__add-relation-form">
      <button v-on:click="turnOnRelationAdditionMode()">Add Relation</button>
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
  import {RELATION_ADDITION} from "../../core/actions";

  export default {
    name: "tool-bar",
    methods: {
      turnOnRelationAdditionMode() {
        this.$store.commit(CHANGE_CURRENT_ACTION, {
          action: RELATION_ADDITION
        });
      }
    }
  }
</script>
