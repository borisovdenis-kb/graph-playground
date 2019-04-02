<template>
  <div class="app-button"
       v-bind:class="{'app-button--selected': isSelected,
                      'app-button--disabled': isDisabled}"
       v-on:click="onBtnClick()">

    <div class="app-button--long" v-if="text">
      <div class="app-button__text" v-if="text">{{text}}</div>
    </div>

    <div class="app-button--short" v-if="!text">
      <div class="app-button__icon">{{iconText}}</div>
    </div>
  </div>
</template>

<script>
  import './app-button.css';

  export default {
    name: "AppButton",
    props: ['text', 'iconText', 'isDisabled', 'isSelected', 'onClick'],
    data() {
      return {}
    },
    methods: {
      onBtnClick () {
        if (!this.isDisabled) {
          this.$emit('click');
        }
      }
    }
  }
</script>

<style scoped>

</style>
