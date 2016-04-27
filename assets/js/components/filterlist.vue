<template>
  <div class="filter-list">

    <div class="row">
      <div class="col-xs-12">
        <button @click.prevent="add" class="btn btn-primary">
          Add Filter
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <ul class="list-group filter-list-group">
          <li class="list-group-item filter-list-item" v-for="filter in filterList"
              @click="setEdit(filter)">

            <template v-if="filter == filterToEdit">
              <input class="filter-input" v-model="model.prop"
                     placeholder="Property"
                     @focus="setEdit(filter)"
                     @blur="finishEdit()"
                     @keyup.enter="finishEdit()">
            </template>
            <template v-else>
              <span class="filter-value">{{ filter.prop }}</span>
            </template>

            <span class="filter-relation">equals</span>

            <template v-if="filter == filterToEdit">
              <input class="filter-input" v-model="model.value"
                     placeholder="Value"
                     @focus="setEdit(filter)"
                     @blur="finishEdit()"
                     @keyup.enter="finishEdit()">
            </template>
            <template v-else>
              <span class="filter-value">{{ filter.value }}</span>
            </template>

            <div class="filter-control">
              <a @click="removeFilter(filter)" class="glyphicon glyphicon-remove"></a>
            </div>

          </li>
        </ul>

      </div>
    </div>
  </div>
</template>


<script>
import {filterList} from '../vuex/getters.js';

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
    data() {
        return {
            filterToEdit: null,
            finishTimeout: null,
            model: {
                prop: null,
                value: null
            }
        }
    },
    methods: {
        /**
           Add new filter and begin editing
         */
        add() {
            this.addFilter();
            this.filterToEdit = this.filterList[this.filterList.length-1];
            console.log(this.filterToEdit);
        },
        /**
           Set filter object to edit
         */
        setEdit(filter) {
            if (filter && filter != this.filterToEdit) {
                this.filterToEdit = filter;
                this.model = {
                    prop: filter.prop,
                    value: filter.value
                }
            } else if(!filter) {
                this.filterToEdit = null;
            }

            if (this.finishTimeout) {
                this.finishTimeout.cancel();
                this.finishTimeout = null;
            }
        },
        /**
           Leave editing mode after a short delay
           Can be cancelled by calling setEdit before execution
         */
        finishEdit() {
            if (this.finishTimeout) {
                this.finishTimeout.cancel();
            }

            this.finishTimeout = new Cancellable(() => {
                console.log('finishEdit');
                this.commit();
                this.setEdit(null);
            });
        },
        /**
           Send changes to store
         */
        commit() {
            this.updateFilter(this.filterToEdit, this.model);
        }
    },
    vuex: {
        getters: {
            filterList
        },
        actions: {
            addFilter(store, filter={prop: '', value: ''}) {
                store.dispatch('FILTER_APPEND', filter);
            },
            updateFilter(store, filter, updated) {
                store.dispatch('FILTER_MODIFY', filter, updated);
            },
            removeFilter(store, filter) {
                store.dispatch('FILTER_REMOVE', filter);
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
