<template>
  <div class="app-base-dialog" v-bind:style="{left: windowLeft + 'px', top: windowTop + 'px'}">
    <div class="app-base-dialog__header">
      <div class="app-base-dialog__caption">{{ caption }}</div>
      <div class="app-base-dialog__btn-close-header">✕</div>
    </div>

    <div class="app-base-dialog__content">
      <slot name="content"></slot>
    </div>

    <div class="app-base-dialog__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  import './app-base-dialog.css';
  import {EventBus} from '../../../bus/eventBus';

  export default {
    name: "AppBaseDialog",
    props: ['caption'],
    data() {
      return {
        windowTop: 500,
        windowLeft: 500,
        blackOutElement: null
      }
    },
    mounted() {
      // const appElement = document.getElementById('app');
      //
      // EventBus.$on('componentAppended', () => {
      //   const appRect = appElement.getBoundingClientRect();
      //   const dialogWindowRect = document.getElementsByClassName('app-base-dialog')[0].getBoundingClientRect();
      //   this.blackOutElement = document.getElementsByClassName('global-blackout')[0];
      //
      //   this.windowTop = (appRect.height - dialogWindowRect.height) / 2;
      //   this.windowLeft = (appRect.width - dialogWindowRect.width) / 2;
      //
      //   this.blackOutElement.style.display = 'block';
      // });
    },
    destroyed() {
      this.blackOutElement.style.display = 'none';
    }

  }
</script>

<style scoped>

</style>
