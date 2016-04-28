<template>
  <li class="list-group-item filter-list-item"
      @click="beginEdit">

    <template v-if="editing">

      <!-- Generate select from filterOptions -->
      <select v-model="model.title" class="filter-input" tabindex="0"
              @blur="finishEdit()" @keyup.enter="finishEdit()"
              @change="onTitleChanged">

        <option v-for="title in titles" :value="title">{{title}}</option>
      </select>

      <span class="filter-relation">equals</span>

      <!-- Render as select if there is a values array -->
      <select v-show="values" class="filter-input" tabindex="0"
              v-model="model.value" @blur="finishEdit()"
              @keyup.enter="finishEdit()">

        <option v-for="value in values" :value="value">
          {{ value }}
        </option>
      </select>

      <!-- Render as input for open-ended filters -->
      <input v-else class="filter-input" tabindex="0" placeholder="Value"
             v-model="model.value" @blur="finishEdit()"
             @keyup.enter="finishEdit()">

    </template>

    <template v-else>
      <!-- Render filter info statically -->
      <span class="filter-value">{{ model.title }}</span>
      <span class="filter-relation">equals</span>
      <span class="filter-value">{{ model.value }}</span>
    </template>

    <div class="filter-control">
      <a @click="removeFilter(filter)" class="glyphicon glyphicon-remove"></a>
    </div>

    <p>valueIsValid: {{valueIsValid ? 'True':'False'}}</p>

  </li>

</template>

<script>
import {filterOptions} from '../vuex/getters.js';

export default {
    props: {
        filter: Object
    },

    data() {
        return {
            editing: false,
            model: {
                title: null,
                value: null
            }
        }
    },

    computed: {
        titles() {
            return this.filterOptions.map(el => el.title);
        },

        option() {
            return this.filterOptions.find(el => el.title == this.model.title);
        },

        values() {
            if (this.option) {
                return this.option.values
            }

            return null;
        },

        titleFromProp() {
            return this.filterOptions
                       .find(el => this.filter.prop == el.prop)
                       .title;
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
            }
        },
        /**
           Copy filter prop data to model
         */
        sync() {
            this.model.title = this.titleFromProp;
            this.model.value = this.filter.value;
        },

        onTitleChanged() {
            if (!this.valueIsValid) {
                console.log('onValueChanged');
                this.model.value = this.values[0];
            } else if(!this.values) {
                this.model.value = '';
            }
        }
    },

    vuex: {
        getters: {
            filterOptions
        }
    }
}
</script>
