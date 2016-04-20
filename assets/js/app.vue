<template lang="html">
  <div class="container">
    <h3>Feature Requests</h3>
    <feature-list></feature-list>
  </div>
</template>

<script>
import FeatureList from './components/featurelist.vue';

export default {
    components: {
        FeatureList
    }
}
</script>
