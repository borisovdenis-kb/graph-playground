<template>
  <div class="app-input">
    <input class="app-input__input"
           v-model="innerText"
           v-bind:placeholder="placeholderValue"
           type="text">
    <label class="app-input__label">{{label}}</label>
  </div>
</template>

<script>
  import './app-input.css';

  export default {
    name: "AppInput",
    props: ['label', 'text', 'placeholder'],
    data() {
      return {
        innerText: ''
      }
    },
    watch: {
      innerText: function (val) {
        this.$emit('change', {value: val});
      }
    },
    computed: {
      placeholderValue() {
        return this.placeholder || 'Enter text';
      }
    },
    mounted() {
      this.innerText = this.text;
    }
  }
</script>
