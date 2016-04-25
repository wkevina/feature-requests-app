<template>
  <button
      @click="toggle"
      class="btn"
      :class="{'btn-primary': activated}"
  >{{ title }}</button>
</template>

<script>

import {setSort} from '../vuex/actions.js';
import {sortProperty, sortReverse} from '../vuex/getters.js';

export default {
    props: ['title', 'sortBy'],

    methods: {
        toggle() {
            if (!this.activated) {
                const property = this.sortBy !== '' ? this.sortBy : null;

                this.setSort({property, reverse: false});
            } else {
                this.setSort({reverse: !this.sortReverse});
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
            setSort
        },
        getters: {
            sortProperty,
            sortReverse
        }
    }
}
</script>
