<template>
  <div class="app-field-bottom">
    <label class="app-field-bottom__label">{{label}}</label>
    <span class="app-field-bottom__btn app-field-bottom__btn--save"
          v-bind:class="{'app-field-bottom__btn--save-show': isValueChanged, 'app-field-bottom__btn--save-hide': !isValueChanged}"
          v-on:click="$emit('onSave')">
        save
    </span>
    <span class="app-field-bottom__btn app-field-bottom__btn--clear"
          v-bind:class="{'app-field-bottom__btn--clear-show': isValueChanged, 'app-field-bottom__btn--clear-hide': !isValueChanged}">
        clear
    </span>
  </div>
</template>

<script>
  import './app-field-bottom.css';

  export default {
    name: "AppFieldBottom",
    props: ['label', 'isValueChanged']
  }
</script>

<style scoped>

</style>
