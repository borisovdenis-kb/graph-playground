<template>
  <div class="app-separator"
       v-bind:class="{'app-separator--horizontal': !isVertical,
                      'app-separator--vertical': isVertical}"
       v-bind:style="inlineStyles">
  </div>
</template>

<script>
  import './app-separator.css';

  export default {
    name: "AppSeparator",
    props: ['is-vertical', 'width', 'height'],
    data() {
      return {
        horizontalStyles: {
          width: this.width
        },
        verticalStyles: {
          height: this.height
        }
      }
    },
    computed: {
      inlineStyles() {
        return this.isVertical ? this.verticalStyles: this.horizontalStyles;
      }
    }
  }
</script>

<style scoped>

</style>
