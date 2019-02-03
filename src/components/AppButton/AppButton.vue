<template>
  <div class="app-button"
       v-bind:class="{'app-button--clicked': isClicked,
                      'app-button--disabled': isDisabled}"
       v-on:click="onBtnClick()">
    <div class="app-button__icon">i</div>
    <div class="app-button__text">{{text}}</div>
  </div>
</template>

<script>
  import './app-button.css';

  export default {
    name: "AppButton",
    props: ['text', 'isDisabled', 'onClick'],
    data() {
      return {
        isClicked: false
      }
    },
    methods: {
      onBtnClick () {
        this.$emit('click');
        this.isClicked = !this.isClicked;
      }
    }
  }
</script>

<style scoped>

</style>
