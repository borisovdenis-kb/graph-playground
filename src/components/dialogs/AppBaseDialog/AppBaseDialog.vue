<template>
  <div class="app-base-dialog common-dialog"
       v-bind:class="{'app-base-dialog--appear': isReady}"
       v-bind:style="inlineStyles">
    <div class="app-base-dialog__header">
      <div class="app-base-dialog__caption">{{ options.caption }}</div>
      <div class="app-base-dialog__btn-cancel--header"
           v-on:click="cancelClick">✕
      </div>
    </div>

    <div class="app-base-dialog__content">
      <slot name="content"></slot>
    </div>

    <div class="app-base-dialog__footer">
      <div class="app-base-dialog__btn app-base-dialog__btn-ok"
           v-on:click="okClick">
        OK
      </div>
      <div class="app-base-dialog__btn app-base-dialog__btn-cancel"
           v-on:click="cancelClick">
        CANCEL
      </div>
    </div>
  </div>
</template>

<script>
  import './app-base-dialog.css';

  export default {
    name: "AppBaseDialog",
    props: ['options'],
    data() {
      return {
        windowTop: 0,
        windowLeft: 0,
        isReady: false,
        blackOutElement: null
      }
    },
    methods: {
      okClick() {
        this.$emit('dialogOk');
      },
      cancelClick() {
        this.$emit('dialogCancel');
      },
      getWindowLeft() {
        if (this.options.windowLeft) {
          return this.options.windowLeft;
        }

        const appRect = document.getElementById('app').getBoundingClientRect();

        return (appRect.width - this.options.width) / 2;
      },
      getWindowTop() {
        if (this.options.windowTop) {
          return this.options.windowTop;
        }

        const appRect = document.getElementById('app').getBoundingClientRect();

        return (appRect.height - this.options.height) / 2;
      }
    },
    computed: {
      inlineStyles() {
        return {
          left: `${this.windowLeft}px`,
          top: `${this.windowTop}px`,
          width: `${this.options.width}px`,
          height: `${this.options.height}px`
        }
      }
    },
    beforeMount() {
      this.windowLeft = this.getWindowLeft();
      this.windowTop = this.getWindowTop();

      if (!this.options.isBlackoutDisabled) {
        this.blackOutElement = document.getElementsByClassName('global-blackout')[0];
        this.blackOutElement.style.display = 'block';
      }
    },
    mounted() {
      this.isReady = true;
    },
    beforeDestroy() {
      this.isReady = false;
    },
    destroyed() {
      if (!this.options.isBlackoutDisabled) {
        this.blackOutElement.style.display = 'none';
      }
    }
  }
</script>

<style scoped>

</style>
