<template>
  <div id="playground" v-on:dblclick="addVertex($event)"></div>
</template>

<script>
  import './playground.css';
  import * as mutations from "../../store/mutations";
  import AddVertexCommand from "../../core/graph-commands/AddVertexCommand";
  import {ADD_VERTEX} from "../../core/graph-commands/commandNames";
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
        const command = new AddVertexCommand({
          name: ADD_VERTEX,
          payload: {
            id: this.idCounter++,
            value: '',
            coordinate: {
              cx: e.offsetX,
              cy: e.offsetY
            }
          }
        });
        command.execute();
        this.$store.commit(mutations.LOG_LAST_COMMAND, {command: command});
      }
    },
    mounted() {
      this.svgContainer = createSvgContainer('playground', 1376, 830);
      this.$store.commit(mutations.SET_SVG_CONTAINER, {svgContainer: this.svgContainer});
      this.$store.commit(mutations.CREATE_GRAPH, {svgContainer: this.svgContainer});
    }
  }
</script>
