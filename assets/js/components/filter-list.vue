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
import {filterList, clients, productAreas,
        filterOptions} from '../vuex/getters.js';

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
    data() {
        return {
            filterToEdit: null,
            finishTimeout: null,
            model: {
                opt: null,
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
            this.setEdit(this.filterList[this.filterList.length-1]);
        },
        /**
           Set filter object to edit
         */
        setEdit(filter) {
            if (filter) {
                if(filter != this.filterToEdit){
                    if (this.filterToEdit) {
                        this.commit();
                    }

                    this.filterToEdit = filter;

                    if (filter.prop) {
                        // find filterOption that matches prop
                        const opt = this.filterOptions.find(
                            el => el.prop == filter.prop);

                        if (opt) {
                            this.model.opt = opt;
                            this.model.value = filter.value;
                        } else {
                            this.clearModel();
                        }
                    }
                }
            } else if(!filter) {
                this.filterToEdit = null;
                this.clearModel();
            }

            if (this.finishTimeout) {
                this.finishTimeout.cancel();
                this.finishTimeout = null;
            }
        },
        clearModel() {
            this.model.opt = null;
            this.model.value = null;
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
                this.commit();
                this.setEdit(null);
            });
        },
        /**
           Send changes to store
         */
        commit() {
            /* Validate model data */
            const hasData = !!this.model.opt && !!this.model.value;

            if (hasData) {
                let isValid = true;

                if (this.model.opt.values) {
                    isValid = this.model.opt.values.includes(this.model.value)
                }

                if (isValid) {
                    const prop = this.model.opt.prop;
                    const title = this.model.opt.title;
                    const value = this.model.value;

                    /* Submit modified data */
                    this.updateFilter(this.filterToEdit, {prop, title, value});
                }
            }
        }
    },
    computed: {
        /**
           Return true if current filterOption has value list
         */
        hasValueList() {
            const currentOption = this.model.opt;

            if (currentOption && currentOption.values) {
                return true;
            }

            return false;
        }
    },
    vuex: {
        getters: {
            filterList,
            clients,
            productAreas,
            filterOptions
        },
        actions: {
            addFilter(store, filter={prop: 'client.name', value: 'Client A'}) {
                store.dispatch('FILTER_APPEND', filter);
            },
            updateFilter(store, filter, updated) {
                store.dispatch('FILTER_MODIFY', filter, updated);
            },
            removeFilter(store, filter) {
                store.dispatch('FILTER_REMOVE', filter);
            }
        }
    },
    components: {FilterListItem}
}
</script>

<style lang="sass">

 .filter-list-group {
     .filter-list-item {
         > * {
             display: inline-block;
             line-height: 24px;
             padding: 4px;
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
         }

         input.filter-input {
             border-bottom: solid 2px #c9c9c9;
             transition: border 0.3s;
         }

         input.filter-input:focus {
             border-bottom: solid 2px #111;
         }

         select.filter-input {
             padding: 2px;
         }
     }
 }


</style>
