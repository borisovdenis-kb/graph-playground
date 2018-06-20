<template>
  <div id="playground" v-on:dblclick="addVertex($event)"></div>
</template>

<script>
  import './playground.css';
  import SVG from 'svg.js';
  import {CREATE_GRAPH, ADD_VERTEX} from "../../store/mutations";

  export default {
    name: "playground",
    data() {
      return {
        svgContainer: null,
        idCounter: 1
      }
    },
    methods: {
      addVertex(e) {
        this.$store.commit(ADD_VERTEX, {
          id: this.idCounter++,
          value: '',
          coordinate: {cx: e.offsetX, cy: e.offsetY}
        });
      }
    },
    mounted() {
      this.svgContainer = SVG('playground').size(1376, 830);
      this.$store.commit(CREATE_GRAPH, {svgContainer: this.svgContainer});
    }
  }
</script>
