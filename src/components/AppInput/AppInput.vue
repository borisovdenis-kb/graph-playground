<template>
  <div class="app-input">
    <el-input v-model="innerValue"
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
    props: ['value', 'label', 'placeholder'],
    data() {
      return {
        innerValue: ''
      }
    },
    watch: {
      innerValue: function (value) {
        this.$emit('input', value);
      }
    },
    computed: {
      placeholderValue() {
        return this.placeholder || 'Enter text';
      }
    },
    mounted() {
      this.innerValue = this.value;
    }
  }
</script>
