<template>
  <div class="app-entity-counter">
    <div class="app-entity-counter__counter">
      <div class="app-entity-counter__label app-entity-counter__label--vertexes">
        vertexes
      </div>
      <div class="app-entity-counter__count">{{vertexCount}}</div>
    </div>

    <div class="app-entity-counter__counter">
      <div class="app-entity-counter__label app-entity-counter__label--edges">
        edges
      </div>
      <div class="app-entity-counter__count">{{edgeCount}}</div>
    </div>
  </div>
</template>

<script>
  import './app-entity-counter.css';
  import {mapGetters} from 'vuex';

  export default {
    name: "AppEntityCounter",
    computed: {
      ...mapGetters('graph', [
        'vertexCount',
        'edgeCount'
      ])
    }
  }
</script>

<style scoped>

</style>
