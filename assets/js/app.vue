<template lang="html">
  <div class="container">
    <h3>Feature Requests</h3>
    <div class="row">
      <sort-button display-name="Reset" sort-by=""></sort-button>
    </div>
    <feature-list></feature-list>
  </div>
</template>

<script>
import FeatureList from './components/featurelist.vue';
import SortButton from './components/sortbutton.vue';

export default {
    components: {
        FeatureList,
        SortButton
    }
}
</script>
