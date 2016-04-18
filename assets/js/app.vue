<template lang="html">
  <div>
    <client-list></client-list>
    <feature-list></feature-list>
  </div>
</template>

<script>
import FeatureList from './components/featurelist.vue';
import ClientList from './components/clientlist.vue';

export default {
    components: {
        FeatureList,
        ClientList
    }
}
</script>
