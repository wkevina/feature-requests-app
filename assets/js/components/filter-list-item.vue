<template>
  <li class="list-group-item filter-list-item"
      @click="beginEdit">

    <!-- Generate select from filterOptions -->
    <select v-show="editing" v-model="model.opt" class="filter-input" tabindex="0"
            v-el:opt-select @change="forceValidValue">

      <option v-for="opt in filterOptions" :value="opt">{{opt.title}}</option>
    </select>

    <span v-show="editing" class="filter-relation">equals</span>

    <!-- Render as select if there is a values array -->
    <select v-show="values && editing" class="filter-input" tabindex="0"
            v-el:value-select v-model="model.value"
            @keyup.enter="endEdit">

      <option v-for="value in values" :value="value">
        {{ value }}
      </option>
    </select>

    <!-- Render as input for open-ended filters -->
    <input v-show="editing && !values" class="filter-input" tabindex="0"
           placeholder="Value" v-el:value-input v-model="model.value"
           @keyup.enter="endEdit">


    <!-- Render filter info statically -->
    <span v-show="!editing" class="filter-value"
          v-focus:value-select:opt-select>{{ model.opt.title }}</span>

    <span v-show="!editing" class="filter-relation">equals</span>

    <span v-show="!editing" class="filter-value"
          v-focus:value-select:value-input>
      {{ model.value || '&nbsp;' }}
    </span>

    <div>
      <a class="filter-control btn btn-success" @click.stop="endEdit"
         :disabled="!editing">
        <span class="glyphicon glyphicon-ok"></span>
      </a>
      <a class="filter-control btn btn-danger" @click="removeFilter(filter)" >
        <span class="glyphicon glyphicon-remove"></span>
      </a>
    </div>

  </li>


</template>

<script>
import {filterOptions} from '../vuex/getters.js';
import {updateFilter, removeFilter} from '../vuex/actions.js';
import Vue, {util} from 'vue';

const camelize = util.camelize;
const on = util.on;
const off = util.off;

export default {
    props: {
        filter: Object
    },

    directives: {
        'focus': {
            bind: function () {
                if (!this.arg)
                    return;

                this.targets = this.arg.split(':').map(camelize);

                on(this.el, 'click', () => {
                    setTimeout(() => {
                        this.focusTargets();
                    }, 100);
                });
            },
            focusTargets() {
                for (let target of this.targets) {
                    // Lookup each target in parent
                    const t = this.vm.$els[target];
                    t.focus();
                }
            }
        }
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

    watch: {
        'model.value': 'commit'
    },

    methods: {
        /**
           Enter editing mode
         */
        beginEdit() {
            if (!this.editing) {
                this.editing = true;
                this.sync();
            }
        },

        /**
           Leave editing mode
         */
        endEdit() {
            this.editing = false;
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
