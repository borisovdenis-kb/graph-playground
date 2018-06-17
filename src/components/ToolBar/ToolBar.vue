<template>
  <div class="tool-bar">
    <div class="tool-bar__add-relation-form">
      <input type="text" v-model="vertexOneId" placeholder="Vertex One Id"/>
      <input type="text" v-model="vertexTwoId" placeholder="Vertex Two Id"/>
      <button v-on:click="addVertex">Add Relation</button>
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
  import {ADD_RELATION} from '../../store/mutations';

  export default {
    name: "tool-bar",
    data() {
      return {
        vertexOneId: '',
        vertexTwoId: ''
      }
    },
    methods: {
      addVertex() {
        this.$store.commit(ADD_RELATION, {
          targetId: this.vertexOneId,
          linkedId: this.vertexTwoId
        });
      }
    }
  }
</script>
