<template>
  <div class="app-base-dialog"
       v-bind:class="{'app-base-dialog--appear': isReady}"
       v-bind:style="{left: windowLeft + 'px', top: windowTop + 'px'}">
    <div class="app-base-dialog__header">
      <div class="app-base-dialog__caption">{{ options.caption }}</div>
      <div class="app-base-dialog__btn-close-header">✕</div>
    </div>

    <div class="app-base-dialog__content">
      <slot name="content"></slot>
    </div>

    <div class="app-base-dialog__footer">
      <div class="app-base-dialog__btn app-base-dialog__btn-ok"
           v-on:click="okCLick">
        OK
      </div>
      <div class="app-base-dialog__btn app-base-dialog__btn-close"
           v-on:click="closeCLick">
        CLOSE
      </div>
    </div>
  </div>
</template>

<script>
  import './app-base-dialog.css';
  import {EventBus} from '../../../bus/eventBus';

  export default {
    name: "AppBaseDialog",
    props: ['options', 'onOkCLick', 'onCloseClick'],
    data() {
      return {
        windowTop: 0,
        windowLeft: 0,
        isReady: false,
        blackOutElement: null
      }
    },
    methods: {
      okCLick() {
        this.options.onResolveClose({text: 'Hello!'});
      },
      closeCLick() {
        this.options.onRejectClose({text: 'Hello!'});
      }
    },
    mounted() {
      const vm = this;

      EventBus.$on('componentAppended', () => {
        const appRect = document.getElementById('app').getBoundingClientRect();

        vm.windowLeft = (appRect.width - vm.options.width) / 2;
        vm.windowTop = (appRect.height - vm.options.height) / 2;

        vm.isReady = true;

        vm.blackOutElement = document.getElementsByClassName('global-blackout')[0];
        vm.blackOutElement.style.display = 'block';
      });
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
