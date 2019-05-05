<template>
  <div class="app-button"
       v-bind:class="{'app-button--selected': isSelected,
                      'app-button--disabled': isDisabled}"
       v-on:click="onBtnClick()">
    <img v-if="iconPath" class="app-button__icon" v-bind:src="iconPath">
  </div>
</template>

<script>
  import './app-button.css';
  import { getIconPath } from "../../services/utils";

  export default {
    name: "AppButton",
    props: ['text', 'icon', 'isDisabled', 'isSelected', 'onClick'],
    data() {
      return {
        iconPath: ''
      }
    },
    methods: {
      getIconPath,
      onBtnClick () {
        if (!this.isDisabled) {
          this.$emit('click');
        }
      }
    },
    mounted() {
      this.iconPath = getIconPath(this.icon);
    }
  }
</script>

<style scoped>

</style>
