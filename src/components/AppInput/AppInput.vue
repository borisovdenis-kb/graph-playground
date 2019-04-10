<template>
  <div class="app-input">
    <el-input v-model="innerValue"
              v-bind:placeholder="placeholderValue"
              size="mini">
    </el-input>
    <app-field-bottom v-bind:label="label"
                      v-bind:is-value-changed="isValueChanged"
                      v-on:onSave="$emit('onSave')">
    </app-field-bottom>
  </div>
</template>

<script>
  import './app-input.css';
  import AppFieldBottom from "../AppFieldBottom/AppFieldBottom";

  export default {
    name: "AppInput",
    components: {AppFieldBottom},
    props: ['value', 'label', 'placeholder'],
    data() {
      return {
        innerValue: '',
        lastValue: '',
        isValueChanged: false
      }
    },
    watch: {
      innerValue: function (value) {
        if (this.lastValue !== value) {
          this.isValueChanged = true;
        } else {
          this.isValueChanged = false;
        }

        this.$emit('input', value);
      }
    },
    computed: {
      placeholderValue() {
        return this.placeholder || 'Enter text';
      }
    },
    mounted() {
      this.innerValue = this.value || '';
      this.lastValue = this.innerValue;
    }
  }
</script>
