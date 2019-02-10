<template>
  <div id="app-playground"></div>
</template>

<script>
  import './app-playground.css';
  import mutations from "../../store/mutations";
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
      this.$store.commit(mutations.SET_SVG_CONTAINER, {svgContainer: this.svgContainer});
      this.$store.commit(mutations.CREATE_GRAPH);
    }
  }
</script>
