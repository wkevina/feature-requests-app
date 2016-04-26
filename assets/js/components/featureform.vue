<template>
  <div class="feature-form">
  <h4>Create new feature request</h4>
  <form>

    <!-- Title -->
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label for="feature-title">Title</label>
          <input type="text" id="feature-title" class="form-control"
                 v-model="form.title">
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="feature-description">Description</label>
          <textarea id="feature-description" class="form-control"
                    v-model="form.description"></textarea>
        </div>
      </div>
    </div>

    <!-- Client -->
    <div class="row">
      <div class="col-md-3 col-sm-6">
        <div class="form-group">
          <label for="feature-client">Client</label>
          <select id="feature-client" class="form-control"
                  v-model="form.client">
            <option v-for="client in clients" :value="client.url">
              {{client.name}}
            </option>
          </select>
        </div>
      </div>

      <!-- Client Priority -->
      <div class="col-md-3 col-sm-6">
        <div class="form-group">
          <label for="feature-client-priority">Priority</label>
          <input id="feature-client-priority" type="number" class="form-control"
          v-model="form.client_priority">
        </div>
      </div>

      <!-- Product Area -->
      <div class="col-md-3 col-sm-6">
        <div class="form-group">
          <label for="feature-product-area">Product Area</label>
          <select id="feature-product-area" class="form-control"
          v-model="form.product_area">
            <option v-for="area in productAreas" :value="productAreas.url">
              {{area.name}}
            </option>
          </select>
        </div>
      </div>

      <!-- Target Date -->
      <div class="col-md-3 col-sm-6">
        <div class="form-group">
          <label for="feature-target-date">Target Date</label>
          <input id="feature-target-date" type="date" class="form-control"
          v-model="form.target_date">
        </div>
      </div>
    </div>

    <!-- Ticket URL -->
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="feature-ticket-url">Ticket URL</label>
          <input id="feature-ticket-url" type="url" class="form-control"
                 v-model="form.ticket_url">
        </div>
      </div>
    </div>

    <button @click="log" type="submit" class="btn btn-default">Submit</button>

</template>


<script>
import 'nodep-date-input-polyfill';
import {clients, productAreas} from '../vuex/getters.js';

export default {
    data() {
        return {
            form: {
                title: '',
                description: '',
                client: '',
                client_priority: '',
                product_area: '',
                target_date: '',
                ticket_url: ''
            }
        }
    },
    vuex: {
        getters: {
            clients,
            productAreas
        }
    },
    methods: {
        log() {
            console.log(JSON.stringify(this.form));
        }
    }
}

</script>
