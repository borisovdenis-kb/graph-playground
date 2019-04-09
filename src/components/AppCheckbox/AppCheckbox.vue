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
    props: ['label', 'value'],
    data() {
      return {
        innerValue: ''
      }
    },
    watch: {
      innerValue: function (val) {
        this.$emit('change', {value: val});
      }
    },
    mounted() {
      this.innerValue = this.text;
    }
  }
</script>
