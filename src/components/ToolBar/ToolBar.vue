<template>
  <div class="tool-bar">
    <div class="tool-bar__graph-form">
      <input type="text" v-model="vertexId" placeholder="id"/>
      <input type="text" v-model="vertexValue" placeholder="value"/>
      <button v-on:click="addVertex">Add Vertex</button>
    </div>
  </div>
</template>

<script>
  import './tool-bar.css';
  import {ADD_VERTEX} from '../../store/mutations';

  export default {
    name: "tool-bar",
    data() {
      return {
        vertexId: '',
        vertexValue: ''
      }
    },
    methods: {
      addVertex() {
        this.$store.commit(ADD_VERTEX, {
          id: this.vertexId,
          value: this.vertexValue
        });
      }
    }
  }
</script>
