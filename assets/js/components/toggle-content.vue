<template>
  <div class="toggle-content-container">

    <slot name="header" v-if="show"></slot>

    <button @click="toggle(true)" class="btn btn-primary"
            v-if="!show">

      <slot name="button"></slot>

    </button>

    <slot name="content" v-if="show"></slot>

    <button class="btn btn-info dismiss" @click="toggle(false)"
            v-if="show">
      Dismiss&nbsp;
      <span class="glyphicon glyphicon-remove"></span>
    </button>
    <slot name="footer" v-if="show"></slot>
  </div>
</template>

<script>
export default {
    props: ['dismiss-on'],
    data() {
        return {
            show: false
        }
    },
    methods: {
        toggle(show) {
            this.show = show;
        }
    },
    ready() {
        if (this.dismissOn) {
            this.$on(this.dismissOn, () => this.toggle(false));
        }
    },
    events: {
        /*[this.dismissOn]: function() {
         *    this.toggle(false);
         *}*/
    }
}
</script>

<style lang="sass">
 .toggle-content-container {
     width: 100%;
     height: 100%;
     position: relative;

     .dismiss {
         position: absolute;
         right: 0;
         top: 0;
     }
 }


</style>
