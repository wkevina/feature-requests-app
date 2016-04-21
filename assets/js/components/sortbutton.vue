<template>
  <button
      @click="toggle"
      class="btn"
      :class="{'btn-primary': activated}"
  >{{ displayName }}</button>
</template>

<script>

import {setSortProperty, setSortReverse} from '../vuex/actions.js';
import {sortProperty, sortReverse} from '../vuex/getters.js';

export default {
    props: ['displayName', 'sortBy'],

    methods: {
        toggle() {
            console.log(this.displayName);
            console.log(this.sortBy);
            if (!this.activated) {
                this.activated = true;
                this.setSortProperty(this.sortBy);
                this.setSortReverse(false);
            } else {
                this.setSortReverse(!this.sortReverse);
            }
        }
    },

    computed: {
        activated() {
            return (this.sortProperty !== null &&
                    this.sortProperty !== undefined &&
                    this.sortProperty === this.sortBy);
        }
    },

    vuex: {
        actions: {
            setSortProperty,
            setSortReverse
        },
        getters: {
            sortProperty,
            sortReverse
        }
    }
}
</script>
