<template>
  <div class="app-input">
    <el-input v-model="innerValue"
              v-bind:placeholder="placeholderValue"
              size="mini">
    </el-input>
    <app-field-bottom v-bind:label="label"
                      v-bind:is-value-changed="isValueChanged"
                      v-on:onSave="onSaveClick()">
    </app-field-bottom>
  </div>
</template>

<script>
  import './app-input.css';
  import AppFieldBottom from "../AppFieldBottom/AppFieldBottom";

  export default {
    name: "AppInput",
    components: {AppFieldBottom},
    props: ['value', 'label', 'placeholder', 'onSave'],
    data() {
      return {
        innerValue: '',
        lastValue: '',
        isValueChanged: false
      }
    },
    methods: {
      onSaveClick() {
        if (this.isValueChanged) {
          const result = this.onSave();

          if (result && result instanceof Promise) {
            result.then(() => {
              this.lastValue = this.innerValue;
              this.isValueChanged = false;
            });
          } else {
            this.lastValue = this.innerValue;
            this.isValueChanged = false;
          }
        }
      }
    },
    watch: {
      value: function (value) {
        if (this.innerValue !== value) {
          this.innerValue = value;
          this.isValueChanged = false;
        }
      },
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
