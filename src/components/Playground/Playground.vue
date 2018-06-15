<template>
  <div id="playground"></div>
</template>

<script>
  import './playground.css';
  import SVG from 'svg.js';
  import {CREATE_GRAPH} from "../../store/mutations";

  export default {
    name: "playground",
    data() {
      return {
        svgContainer: null
      }
    },
    mounted() {
      this.svgContainer = SVG('playground').size(1376, 830);
      this.$store.commit(CREATE_GRAPH, {svgContainer: this.svgContainer});
    }
  }
</script>
