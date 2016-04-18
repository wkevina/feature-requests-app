<template lang="html">
  <div>
    <h3>Clients</h3>
    <client-list></client-list>
    <hr>
    <h3>Product Areas</h3>
    <product-area-list></product-area-list>
    <hr>
    <h3>Feature Requests</h3>
    <feature-list></feature-list>
  </div>
</template>

<script>
import FeatureList from './components/featurelist.vue';
import ClientList from './components/clientlist.vue';
import ProductAreaList from './components/productarealist.vue';

export default {
    components: {
        FeatureList,
        ClientList,
        ProductAreaList
    }
}
</script>
