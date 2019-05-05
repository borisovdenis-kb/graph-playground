<template>
  <g>
    <line :id="data.edgeId"
          :x1="data.x1"
          :y1="data.y1"
          :x2="data.x2"
          :y2="data.y2"
          :cursor="edgeCursor"
          :stroke="edgeStrokeColor(data.isHighlighted)"
          stroke-width="5"> <!-- TODO: проверить, что все нормально с курсором-->
    </line>
    <rect v-if="isEdgeWeightVisible"
          :id="data.edgeId"
          :x="calcMiddleCoordinate(data.x1, data.x2) - 10"
          :y="calcMiddleCoordinate(data.y1, data.y2) - 10"
          width="35px"
          height="20px"
          fill="#f0f0f0"
          style="opacity: 0.9"
          rx="4"
          ry="4">
    </rect>

    <text v-if="isEdgeWeightVisible"
          :id="data.edgeId"
          :x="calcMiddleCoordinate(data.x1, data.x2) + 7"
          :y="calcMiddleCoordinate(data.y1, data.y2) + 5"
          text-anchor="middle"
          fill="#a5a5a5">
      {{data.weight || 0}}
    </text>
  </g>
</template>

<script>
  import * as pgStates from '../../constants/pgStates';
  import { mapState } from 'vuex';

  export default {
    name: "AppEdge",
    props: ['data'],
    methods: {
      calcMiddleCoordinate(c1, c2) {
        return (c1 + c2) / 2;
      },
      edgeStrokeColor(isHighlighted) {
        return isHighlighted ? '#ff822a' : '#c3c3c3';
      }
    },
    computed: {
      ...mapState('graph', [
        'isEdgeWeightVisible'
      ]),
      edgeCursor() {
        const mapStateToCursor = {
          [pgStates.DELETE_EDGE]: 'pointer'
        };
        const currentPgState = this.$store.state.currentPgState;

        return mapStateToCursor[currentPgState];
      }
    }
  }
</script>

<style scoped>

</style>
