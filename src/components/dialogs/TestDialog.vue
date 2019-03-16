<template>
  <app-base-dialog caption="Hello Dialog World">
    <template slot="content">
      <h1>Hey Hey Hey</h1>
    </template>
  </app-base-dialog>
</template>

<script>
  import AppBaseDialog from "./AppBaseDialog/AppBaseDialog";

  export default {
    name: "TestDialog",
    components: {AppBaseDialog}
  }
</script>

<style scoped>

</style>
