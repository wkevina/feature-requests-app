/**
Super simple component to test fetching productArea data
*/

<template>
  <ul>
    <li v-for="area in productAreas">{{area.name}}</li>
  </ul>
</template>

<script>
export default {
    vuex: {
        getters: {
            productAreas({productAreas}) {
                return productAreas;
            }
        }
    }
}
</script>
