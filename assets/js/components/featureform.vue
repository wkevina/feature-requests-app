<template>
  <form>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label for="feature-title">Title</label>
          <input type="text" id="feature-title" class="form-control">
        </div>

        <div class="form-group">
          <label for="feature-description">Description</label>
          <textarea id="feature-description" class="form-control"></textarea>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="feature-client">Client</label>
          <select id="feature-client" class="form-control">
            <option v-for="client in clients" :value="client.url">
              {{client.name}}
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label for="feature-client-client">Priority</label>
          <input id="feature-client-priority" type="number" class="form-control">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="feature-product-area">Product Area</label>
          <select id="feature-product-area" class="form-control">
            <option v-for="area in productAreas" :value="productAreas.url">
              {{area.name}}
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label for="feature-target-date">Target Date</label>
          <input id="feature-target-date" type="date" class="form-control">
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-default">Submit</button>

  </form>
</template>


<script>
import 'nodep-date-input-polyfill';
import {clients, productAreas} from '../vuex/getters.js';

export default {
    /* computed: {
       clientOptions() {
       return;
       }
       }, */
    vuex: {
        getters: {
            clients,
            productAreas
        }
    }
}

</script>