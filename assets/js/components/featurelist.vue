/**
A list of feature requests
*/

<template>
  <div class="feature-list row">
    <table class="table">

      <thead>
        <td v-for="name in columnNames">{{name}}</td>
      </thead>

      <tbody>
        <tr is="feature" v-for="item in features" :item="item"></tr>
      </tbody>

    </table>

  </div>
</template>

<script>
import Feature from './feature.vue';

export default {
    data() {
        return {
            columnNames: [
                'Title', 'Description', 'Priority',
                'Target Date', 'Ticket', 'Client',
                'Product Area', 'URL'
            ]
        }
    },
    components: {Feature},
    vuex: {
        getters: {
            /* Expose features array */
            features: state => state.features
        }
    }
}
</script>
