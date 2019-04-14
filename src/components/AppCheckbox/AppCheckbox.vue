<template>
  <div class="app-checkbox">
    <el-checkbox v-model="innerValue" style="margin: 0"></el-checkbox>
    <label class="app-checkbox__label">{{label}}</label>
  </div>
</template>

<script>
  import './app-checkbox.css';

  export default {
    name: "AppCheckbox",
    props: ['value', 'label'],
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
    mounted() {
      this.innerValue = this.value;
    }
  }
</script>
