<template>
  <div class="test-dialog">
    <app-base-dialog v-bind:options="options">
      <template slot="content">
        <h1>{{ inData.text }}</h1>
      </template>
    </app-base-dialog>
  </div>
</template>

<script>
  import AppBaseDialog from "./AppBaseDialog/AppBaseDialog";

  export default {
    name: "TestDialog",
    components: {AppBaseDialog},
    props: ['inData', 'options']
  }
</script>

<style scoped>

</style>
