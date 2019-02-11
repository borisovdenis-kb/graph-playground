<template>
  <div id="app-playground"></div>
</template>

<script>
  import './app-playground.css';
  import {SVG_GRAPH_CREATE} from "../../store/modules/svgGraph/mutations";
  import {SVG_CONTAINER_SET} from "../../store/mutations";
  import {createSvgContainer} from "../../core/svg/SvgFactory";

  export default {
    name: "app-playground",
    data() {
      return {
        svgContainer: null,
        idCounter: 1
      }
    },
    mounted() {
      const rect = document.getElementById('app-playground').getBoundingClientRect();

      this.svgContainer = createSvgContainer('app-playground', rect.width, rect.height - 3);
      this.$store.commit(SVG_CONTAINER_SET, {svgContainer: this.svgContainer});
      this.$store.commit(SVG_GRAPH_CREATE);
    }
  }
</script>
