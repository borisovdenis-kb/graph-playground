<template>
  <div class="app-edit-edge-dialog common-dialog"
       v-bind:style="inlineStyles">

    <div class="app-edit-edge-dialog__header">
      Edit Edge
    </div>

    <div class="app-edit-edge-dialog__row">
      <app-input v-bind:text="edge.weight"
                 label="Weight"
                 placeholder="Enter weight">
      </app-input>
    </div>

    <div class="app-edit-edge-dialog__row">
      <app-checkbox label="Orientation">
      </app-checkbox>
    </div>

    <div class="app-edit-edge-dialog__row">
      <div>A - B</div>
      <div>B - A</div>
    </div>
  </div>
</template>

<script>
  import './app-edit-edge-dialog.css';
  import $store from '../../../store/index';
  import AppInput from "../../AppInput/AppInput";
  import AppCheckbox from "../../AppCheckbox/AppCheckbox";

  export default {
    name: "AppEditEdgeDialog",
    components: {
      AppCheckbox,
      AppInput
    },
    props: ['inData'],
    data() {
      return {
        edge: {},
        windowTop: 0,
        windowLeft: 0
      }
    },
    computed: {
      inlineStyles() {
        return {
          left: `${this.windowLeft}px`,
          top: `${this.windowTop}px`
        }
      }
    },
    beforeMount() {
      this.edge = $store.getters['graph/edgeById'](this.inData.edgeId);

      this.windowLeft = (this.edge.x1 + this.edge.x2) / 2 + 20;
      this.windowTop = (this.edge.y1 + this.edge.y2) / 2 + 20;
    }
  }
</script>

<style scoped>

</style>
