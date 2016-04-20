/**
A list of feature requests
*/

<template>
  <div class="feature-list row">
    <table class="table">

      <thead>
        <td v-for="name in columnNames"><b>{{name}}</b></td>
      </thead>

      <tbody>
        <tr is="feature" v-for="item in features" :item="item"></tr>
      </tbody>

    </table>

  </div>
</template>

<script>
import {expandedFeatures} from '../vuex/getters.js';
import Feature from './feature.vue';

export default {
    data() {
        return {
            columnNames: [
                'Title', 'Description', 'Priority',
                'Target Date', 'Ticket', 'Client',
                'Product Area'
            ]
        }
    },
    components: {Feature},
    vuex: {
        getters: {
            /* Expose features array */
            features: expandedFeatures
        }
    }
}
</script>
