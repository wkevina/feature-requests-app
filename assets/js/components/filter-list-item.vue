<template>
  <li class="list-group-item filter-list-item"
      @click="beginEdit">

    <template v-if="editing">

      <!-- Generate select from filterOptions -->
      <select v-model="model.opt" class="filter-input" tabindex="0"
              v-el:opt-select @change="forceValidValue">

        <option v-for="opt in filterOptions" :value="opt">{{opt.title}}</option>
      </select>

      <span class="filter-relation">equals</span>

      <!-- Render as select if there is a values array -->
      <select v-show="values" class="filter-input" tabindex="0"
              v-model="model.value" @keyup.enter="commit">

        <option v-for="value in values" :value="value">
          {{ value }}
        </option>
      </select>

      <!-- Render as input for open-ended filters -->
      <input v-else class="filter-input" tabindex="0" placeholder="Value"
             v-model="model.value" @keyup.enter="commit">

    </template>

    <template v-else>
      <!-- Render filter info statically -->
      <span class="filter-value">{{ model.opt.title }}</span>
      <span class="filter-relation">equals</span>
      <span class="filter-value">{{ model.value || '&nbsp;' }}</span>
    </template>

    <a class="filter-control btn btn-danger" @click="removeFilter(filter)" >
      <span class="glyphicon glyphicon-remove"></span>
    </a>

  </li>

</template>

<script>
import {filterOptions} from '../vuex/getters.js';
import {updateFilter, removeFilter} from '../vuex/actions.js';

export default {
    props: {
        filter: Object
    },

    data() {
        return {
            editing: false,
            model: {
                opt: null,
                value: null
            }
        }
    },

    computed: {
        titles() {
            return this.filterOptions.map(el => el.title);
        },

        values() {
            if (this.model.opt) {
                return this.model.opt.values
            }

            return null;
        },

        valueIsValid() {
            if (this.values) {
                return this.values.includes(this.model.value);
            }

            return true;
        }
    },

    ready() {
        this.sync();
    },

    methods: {
        /**
           Enter editing mode
         */
        beginEdit() {
            if (!this.editing) {
                this.editing = true;
                this.sync();
                this.$nextTick(() => this.$els.optSelect.focus());
            }
        },

        /**
           Copy filter data to model
         */
        sync() {
            if (this.filter.opt) {
                this.model.opt = this.filter.opt;
                this.model.value = this.filter.value;
            } else {
                this.model.opt = this.filterOptions[0];
                if (this.values) {
                    this.model.value = this.values[0];
                } else {
                    this.model.value = '';
                }
            }
        },

        /**
           Triggered when filter option select is changed
           Ensures that value input has reasonable value after change
         */
        forceValidValue() {
            if (!this.valueIsValid) {
                this.model.value = this.values[0];
            } else if(!this.values) {
                this.model.value = '';
            }
        },
        /**
           Commit changes and leave editing mode
         */
        commit() {
            const opt = this.model.opt;
            const value = this.model.value;

            /* Submit modified data */
            this.updateFilter(this.filter, {opt, value});
            this.editing = false;
        }

    },

    events: {
        /* Called when new filter is added
           If it belongs to this component, it enters editing mode
        */
        'filter-added': function(filter) {
            if (filter === this.filter) {
                this.beginEdit();
            }
        }
    },

    vuex: {
        getters: {
            filterOptions
        },
        actions: {
            updateFilter,
            removeFilter
        }
    }
}
</script>
