/**
Super simple component to test fetching client data
*/

<template>
  <ul>
    <li v-for="client in clients">{{client.name}}</li>
  </ul>
</template>

<script>
export default {
    vuex: {
        getters: {
            clients({clients}) {
                return clients;
            }
        }
    }
}
</script>
