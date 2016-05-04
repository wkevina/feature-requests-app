<template>
  <div class="feature-form">
    <h4>Create new feature request</h4>
    <form v-form name="newForm" @submit.prevent="onSubmit" hook="formHook">

      <!-- Title -->
      <div class="row">
        <div class="col-md-12">
          <div class="form-group"
               :class="{'has-error': errors.title}">
            <label for="feature-title">Title</label>
            <input type="text" id="feature-title" class="form-control"
                   v-model="model.title" v-form-ctrl name="title"
                   maxlength="200" required>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="row">
        <div class="col-md-12">
          <div class="form-group"
               :class="{'has-error': errors.description}">
            <label for="feature-description">Description</label>
            <textarea id="feature-description" class="form-control"
                      v-model="model.description" v-form-ctrl
                      name="description" required></textarea>
          </div>
        </div>
      </div>

      <!-- Client -->
      <div class="row">
        <div class="col-md-3 col-sm-6">
          <div class="form-group"
               :class="{'has-error': errors.client}">
            <label for="feature-client">Client</label>
            <select id="feature-client" class="form-control"
                    v-model="model.client" v-form-ctrl
                    name="client" required>
              <option v-for="client in clients" :value="client.url">
                {{client.name}}
              </option>
            </select>
          </div>
        </div>

        <!-- Client Priority -->
        <div class="col-md-2 col-sm-6">
          <div class="form-group"
               :class="{'has-error': errors.client_priority}">
            <label for="feature-client-priority">Priority</label>
            <input id="feature-client-priority" type="number" class="form-control"
                   v-model="model.client_priority" v-form-ctrl
                   name="client_priority" min="1" required>
          </div>
        </div>

        <!-- Product Area -->
        <div class="col-md-3 col-sm-6">
          <div class="form-group"
               :class="{'has-error': errors.product_area}">
            <label for="feature-product-area">Product Area</label>
            <select id="feature-product-area" class="form-control"
                    v-model="model.product_area" v-form-ctrl name="product_area" required>
              <option v-for="area in productAreas" :value="area.url">
                {{area.name}}
              </option>
            </select>
          </div>
        </div>

        <!-- Target Date -->
        <div class="col-md-4 col-sm-6">
          <div class="form-group"
               :class="{'has-error': errors.target_date}">
            <label for="feature-target-date">Target Date</label>
            <input id="feature-target-date" type="date" class="form-control"
                   v-model="model.target_date" v-form-ctrl name="target_date"
                   required custom-validator="validateDate">
          </div>
        </div>
      </div>

      <!-- Ticket URL -->
      <div class="row">
        <div class="col-md-6">
          <div class="form-group"
               :class="{'has-error': errors.ticket_url}">
            <label for="feature-ticket-url">Ticket URL</label>
            <input id="feature-ticket-url" type="url" class="form-control"
                   v-model="model.ticket_url" v-form-ctrl name="ticket_url">
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-success"
              :disabled="newForm.$invalid && !locked">
        Submit
      </button>

      <momentary v-ref:spinner>
        <div class="loading" transition="fade">
          <div class="backdrop"></div>
          <div class="content">
            <i class="fa fa-spinner fa-pulse fa-3x"></i>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </momentary>
    </form>
  </div>

</template>

<style lang="sass">

 $backdrop-color: #5BC0DE;

 .feature-form {
     position: relative;

     .loading {
         position: absolute;
         width: 100%;
         height: 100%;
         top: 0;
         left: 0;
         display: flex;
         align-items: center;
         justify-content: center;

         .backdrop {
             position: absolute;
             background: $backdrop-color;
             box-shadow: 0 0 1em 1em $backdrop-color;
             border-radius: 1em;
             opacity: 0.25;
             width: 100%;
             height: 100%;
             top: 0;
             left: 0;
         }
     }
 }

 /* always present */
 .fade-transition {
     transition: opacity 0.3s ease;
 }

 /* .expand-enter defines the starting state for entering */
 /* .expand-leave defines the ending state for leaving */
 .fade-enter, .fade-leave {
     opacity: 0;
 }
</style>

<script>
import 'nodep-date-input-polyfill';
import moment from 'moment';
import {clients, productAreas} from '../vuex/getters.js';
import { postFeature } from '../vuex/actions.js';
import Momentary from './momentary.vue';

export default {
    data() {
        return {
            model: {
                title: '',
                description: '',
                client: '',
                client_priority: '',
                product_area: '',
                target_date: '',
                ticket_url: ''
            },
            newForm: {},
            locked: false
        }
    },
    vuex: {
        getters: {
            clients,
            productAreas
        },
        actions: {
            postFeature
        }
    },
    computed: {
        /**
           Compute validation errors for each field
           Returns object of the form:
           {
           ...
           fieldName: $dirty && $invalid,
           ...
           }
         */
        errors() {
            const errorStates = Object.entries(this.newForm.$error);
            const processed = errorStates.map((pair) => {
                const propName = pair[0];
                const state = pair[1];

                return {
                    [propName]: state.$dirty && state.$invalid
                }
            });
            return Object.assign({}, ...processed);
        }
    },
    methods: {
        formHook(form) {
            this.form = form;
        },
        onSubmit() {
            // Disable submit button
            this.locked = true;

            // Show progress overlay
            this.$refs.spinner.show();

            this.postFeature(this.model)
            // Clear form
                .then(() => {
                    this.reset();
                })
            // Handle errors
                .catch()
            // Unlock form
                .then(() => {
                    this.locked = false;
                    this.$refs.spinner.dismiss();
                });
        },
        /**
           Custom date validator
           Returns true is value is a string in ISO 8601 date format (YYYY-MM-DD)
         */
        validateDate(value) {
            // strictly parse string with moment
            return moment(value, 'YYYY-MM-DD', true).isValid();
        },
        /**
           Reset model to default values
         */
        reset() {
            this.model = {
                title: '',
                description: '',
                client: '',
                client_priority: '',
                product_area: '',
                target_date: '',
                ticket_url: ''
            };

            this.locked = false;

            this.$nextTick(() => {
                this.form.setPristine();
            });
        }
    },
    components: {
        Momentary
    },
    transitions: {
        'fade': {}
    }
}

</script>
