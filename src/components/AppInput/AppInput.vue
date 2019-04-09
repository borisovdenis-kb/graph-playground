<template>
  <div class="app-input">
    <el-input v-model="innerText"
              v-bind:placeholder="placeholderValue"
              size="mini">
    </el-input>
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
