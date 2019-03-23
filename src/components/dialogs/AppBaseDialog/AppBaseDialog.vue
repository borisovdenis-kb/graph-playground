<template>
  <div class="app-base-dialog"
       v-bind:class="{'app-base-dialog--appear': isReady}"
       v-bind:style="{left: windowLeft + 'px', top: windowTop + 'px'}">
    <div class="app-base-dialog__header">
      <div class="app-base-dialog__caption">{{ options.caption }}</div>
      <div class="app-base-dialog__btn-cancel--header"
           v-on:click="cancelClick">✕</div>
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
    props: ['options', 'onOkClick', 'onCancelClick'],
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
        this.options.onResolveClose({text: 'Hello!'});
      },
      cancelClick() {
        this.options.onRejectClose({text: 'Hello!'});
      }
    },
    beforeMount() {
      const appRect = document.getElementById('app').getBoundingClientRect();

      this.windowLeft = (appRect.width - this.options.width) / 2;
      this.windowTop = (appRect.height - this.options.height) / 2;

      this.blackOutElement = document.getElementsByClassName('global-blackout')[0];
      this.blackOutElement.style.display = 'block';
    },
    mounted() {
      this.isReady = true;
    },
    beforeDestroy() {
      this.isReady = false;
    },
    destroyed() {
      this.blackOutElement.style.display = 'none';
    }

  }
</script>

<style scoped>

</style>
