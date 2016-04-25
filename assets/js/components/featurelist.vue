/**
A list of feature requests
*/

<template>
  <div class="feature-list row">
    <table class="table">

      <thead>
        <td v-for="name in columns">
          <sort-button
              :title="name.title"
              :sort-by="name.property">
          </sort-button>
        </td>

      </thead>

      <tbody>

        <tr class="feature"
            v-for="item in features | limitBy pageSize (page-1)*pageSize">

          <!-- Render according to this.columns -->
          <td v-for="col in columns">
            {{ item | prop col.property }}
          </td>

        </tr>

      </tbody>

    </table>

  </div>
</template>

<script>
import {sortedFeatures} from '../vuex/getters.js';
import '../filters/prop';
import SortButton from './sortbutton.vue';

export default {
    data() {
        return {
            columns: [
                {title: 'Title', property: 'title'},
                {title: 'Description', property: 'description'},
                {title: 'Client', property: 'client.name'},
                {title: 'Priority', property: 'client_priority'},
                {title: 'Product Area', property: 'product_area.name'},
                {title: 'Target Date', property: 'target_date'},
                {title: 'Ticket', property: 'ticket_url'}
            ],
            pageSize: 20
        }
    },
    components: {
        SortButton
    },
    vuex: {
        getters: {
            /* Expose features array */
            features: sortedFeatures,
            page: state => {
                const raw = parseInt(state.route.query.page) || 1;
                return raw > 0 ? raw : 1;
            }
        }
    }
}
</script>
