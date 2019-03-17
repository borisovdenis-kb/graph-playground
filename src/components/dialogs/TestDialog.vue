<template>
  <div class="test-dialog">
    <app-base-dialog v-bind:options="options">
      <template slot="content">
        <h1>{{ inData.text }}</h1>
      </template>

      <template slot="footer">
        <button v-on:click="onOkCLick">OK</button>
        <button v-on:click="onCloseCLick">Close</button>
      </template>
    </app-base-dialog>
  </div>
</template>

<script>
  import AppBaseDialog from "./AppBaseDialog/AppBaseDialog";

  export default {
    name: "TestDialog",
    components: {AppBaseDialog},
    props: ['inData', 'options', 'onResolveClose', 'onRejectClose'],
    methods: {
      onOkCLick() {
        this.onResolveClose({text: 'Hello!'});
      },
      onCloseCLick() {
        this.onRejectClose({text: 'Hello!'});
      }
    },
    mounted() {
      console.log(this.options);
    }
  }
</script>

<style scoped>

</style>
