<template>
  <div id="playground"></div>
</template>

<script>
  import './playground.css';
  import {CREATE_GRAPH, ADD_VERTEX, SET_SVG_CONTAINER} from "../../store/mutations";
  import {createSvgContainer} from "../../core/svg/SvgFactory";

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
      const rect = document.getElementById('playground').getBoundingClientRect();

      this.svgContainer = createSvgContainer('playground', rect.width, rect.height - 3);
      this.$store.commit(SET_SVG_CONTAINER, {svgContainer: this.svgContainer});
      this.$store.commit(CREATE_GRAPH);
    }
  }
</script>
