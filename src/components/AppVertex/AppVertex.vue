<template>
  <g :cursor="vertexCursor">
    <circle :id="data.vertexId"
            :cx="data.cx"
            :cy="data.cy"
            :fill="vertexFillColor"
            r="15"
            stroke="#afafaf"
            stroke-width="4">
    </circle>
    <text :id="data.vertexId"
          :x="data.cx"
          :y="data.cy"
          :stroke="textStrokeColor"
          text-anchor="middle"
          stroke-width="2px"
          dy=".3em">
      {{data.number}}
    </text>
  </g>
</template>

<script>
  import * as pgStates from '../../constants/pgStates';

  export default {
    name: "AppVertex",
    props: ['data', 'isSelected'],
    computed: {
      vertexCursor() {
        const mapStateToCursor = {
          [pgStates.MOVE_VERTEX]: 'move',
          [pgStates.DELETE_VERTEX]: 'pointer',
          [pgStates.ADD_EDGE]: 'pointer',
          [pgStates.DELETE_EDGE]: 'pointer'
        };
        const currentPgState = this.$store.state.currentPgState;

        return mapStateToCursor[currentPgState];
      },
      vertexFillColor() {
        return this.isSelected ? '#6062bf' : '#d7d7d7';
      },
      textStrokeColor() {
        return this.isSelected ? '#d7d7d7' : '#6062bf';
      }
    }
  }
</script>

<style scoped>

</style>
