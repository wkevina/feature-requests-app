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
    data () {
        return {
            features: [
                {title: 'sample'},
                {title: 'sample2'},
                {title: 'sample3'}
            ]
        }
    },
    components: {Feature}
}
</script>
