<template>
  <div class="filter-list">

    <h4>Active filters</h4>

    <button @click.prevent="addFilter()" class="btn btn-primary">
      Add Filter
    </button>

    <ul class="list-group filter-list-group">
      <li class="list-group-item filter-list-item" v-for="filter in filterList"
          @click="setEdit(filter)">

        <template v-if="filter == filterToEdit && isEditing">
          <input class="filter-input" :value="filter.prop"
                 @focus="setEdit(filter)"
                 @blur="finishEdit()"
                 @keyup.enter="finishEdit()">
        </template>
        <template v-else>
          <span class="filter-value">{{ filter.prop }}</span>
        </template>

        <span class="filter-relation">equals</span>

        <template v-if="filter == filterToEdit && isEditing">
          <input class="filter-input" :value="filter.value"
                 @focus="setEdit(filter)"
                 @blur="finishEdit()"
                 @keyup.enter="finishEdit()">
        </template>
        <template v-else>
          <span class="filter-value">{{ filter.value }}</span>
        </template>

        <div class="filter-control">
          <a class="glyphicon glyphicon-remove"></a>
        </div>

      </li>
    </ul>

  </div>
</template>


<script>
import {filterList} from '../vuex/getters.js';

class Cancellable {
    constructor(fn, timeout=100) {
        this.timer = setTimeout(() => fn(), timeout);
    }

    cancel() {
        clearTimeout(this.timer);
    }
}

export default {
    data() {
        return {
            isEditing: false,
            filterToEdit: null,
            finishTimeout: null
        }
    },
    methods: {
        setEdit(filter) {
            if (filter) {
                this.isEditing = true;
                this.filterToEdit = filter;
            } else {
                this.isEditing = false;
                this.filterToEdit = null;
            }

            if (this.finishTimeout) {
                this.finishTimeout.cancel();
                this.finishTimeout = null;
            }
        },
        finishEdit() {
            if (this.finishTimeout) {
                this.finishTimeout.cancel();
            }

            this.finishTimeout = new Cancellable(() => this.setEdit(null));
        }
    },
    vuex: {
        getters: {
            filterList
        },
        actions: {
            addFilter(store, filter={prop: 'Client', value: 'Bob'}) {
                store.dispatch('FILTER_APPEND', filter);
            }
        }
    }
}
</script>

<style lang="sass">

 .filter-list-group {
     .filter-list-item {
         * {
             display: inline-block;
             line-height: 24px;
             padding: 2px;
         }

         .filter-relation {
             text-align: center;
         }

         .filter-input, .filter-value {
             width: 25%;
         }

         .filter-input {
             line-height: 20px;
             border: 0;
             border-bottom: solid 2px #c9c9c9;
             transition: border 0.3s;
         }

         .filter-input:focus {
             border-bottom: solid 2px #111;
         }
     }
 }


</style>
