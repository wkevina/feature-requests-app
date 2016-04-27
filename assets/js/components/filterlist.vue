<template>
  <div class="filter-list">

      <h4>Active filters</h4>

      <button @click.prevent="addFilter()" class="btn btn-primary">
        Add Filter
      </button>

      <ul class="list-group">
        <li class="list-group-item" v-for="filter in filterList"
        @click.prevent="setEdit(filter)" @focusout="setEdit()">
          <div class="row">

            <div class="col-xs-4">
              <template v-if="filter == filterToEdit && isEditing">
                <input class="form-control" :value="filter.prop">
              </template>
              <template v-else>
                <p>{{ filter.prop }}</p>
              </template>
            </div>

            <div class="col-xs-2 filter-relation">
              <p>equals</p>
            </div>

            <div class="col-xs-4">
              <template v-if="filter == filterToEdit && isEditing">
                <input class="form-control" :value="filter.value">
              </template>
              <template v-else>
                <p>{{ filter.value }}</p>
              </template>
            </div>

            <div class="col-xs-2">
              <a class="glyphicon glyphicon-remove"></a>
            </div>

          </div>
        </li>
      </ul>

  </div>
</template>


<script>
import {filterList} from '../vuex/getters.js';

export default {
    data() {
        return {
            isEditing: false,
            filterToEdit: null
        }
    },
    methods: {
        setEdit(filter) {
            if (filter) {
                this.isEditing = true;
                this.filterToEdit = filter;
            }
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

<style>
 .filter-list .filter-relation {
     text-align: center;
 }
</style>
