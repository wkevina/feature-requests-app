<template>
  <div class="filter-list">

    <div class="row">
      <div class="col-xs-12">
        <button @click.prevent="add" class="btn btn-primary">
          Add Filter
        </button>
      </div>
    </div>

    <div class="buffer">
      <ul class="list-group filter-list-group">
        <filter-list-item v-for="filter in filterList" :filter="filter"></filter-list-item>
      </ul>
    </div>
  </div>
</template>


<script>
import {filterList} from '../vuex/getters.js';

import {addEmptyFilter} from '../vuex/actions.js';

import FilterListItem from './filter-list-item.vue';

/**
   Call function after timeout, if not cancelled before timeout
 */
class Cancellable {
    constructor(fn, timeout=100) {
        this.timer = setTimeout(() => fn(), timeout);
    }

    cancel() {
        clearTimeout(this.timer);
    }
}

export default {
    methods: {
        /**
           Add new filter
         */
        add() {
            this.addEmptyFilter();

            this.$nextTick(() => {
                const newest = this.filterList[this.filterList.length-1];
                /* Notify children of new filter */
                this.$broadcast('filter-added', newest)
            });
        }
    },
    vuex: {
        getters: {
            filterList
        },
        actions: {
            addEmptyFilter,
        }
    },
    components: {FilterListItem}
}
</script>

<style lang="sass">

 .filter-list-group {
     .filter-list-item {

         display: flex;
         justify-content: space-between;
         align-items: baseline;
         padding: 0 0 0 1em;

         .filter-relation {
             text-align: center;
         }

         .filter-value {
             padding: 0.27em;
             padding-left: 0.47em;
             background: #EEE;
             border-radius: 0.3em;
         }

         .filter-input, .filter-value {
             width: 25%;
         }

         .filter-input {
             line-height: 20px;
             border: 0;
             padding: 0.2em;
         }

         input.filter-input {
             border-bottom: solid 2px #c9c9c9;
             transition: border 0.3s;
             padding-left: 0.47em;
         }

         input.filter-input:focus {
             border-bottom: solid 2px #111;
         }

         select.filter-input {
             padding-left: 0.2em;
         }
     }
 }
</style>
