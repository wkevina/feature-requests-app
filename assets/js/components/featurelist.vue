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
        <tr is="feature" v-for="item in features | limitBy 20" :item="item"></tr>
      </tbody>

    </table>

  </div>
</template>

<script>
import {sortedFeatures} from '../vuex/getters.js';
import Feature from './feature.vue';
import SortButton from './sortbutton.vue';

export default {
    data() {
        return {
            columns: [
                {title: 'Title', property: 'title'},
                {title: 'Description', property: 'description'},
                {title: 'Priority', property: 'client_priority'},
                {title: 'Target Date', property: 'target_date'},
                {title: 'Ticket', property: 'ticket_url'},
                {title: 'Client', property: 'client.name'},
                {title: 'Product Area', property: 'product_area.name'}
            ]
        }
    },
    components: {
        Feature,
        SortButton
    },
    vuex: {
        getters: {
            /* Expose features array */
            features: sortedFeatures
        }
    }
}
</script>
