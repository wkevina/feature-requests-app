/**
A list of feature requests
*/

<template>
  <div class="feature-list">
    <ul>
      <li v-for="item in features">
        <feature :item="item"></feature>
      </li>
    </ul>
  </div>
</template>

<script>
import Feature from './feature.vue';

export default {
    components: {Feature},
    vuex: {
        getters: {
            /* Expose features array */
            features: state => state.features
        }
    }
}
</script>
