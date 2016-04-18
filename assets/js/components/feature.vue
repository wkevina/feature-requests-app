/**
A single feature request
*/

<template>
  <tr class="feature">
    <td>{{ item.title }}</td>
    <td>{{ item.description }}</td>
    <td>{{ item.client_priority }}</td>
    <td>{{ item.target_date }}</td>
    <td>{{ item.ticket_url || 'None' }}</td>
    <td>{{ clientName }}</td>
    <td>{{ item.product_area }}</td>
    <td>{{ item.url }}</td>
  </tr>
</template>

<script>
export default {
    props: ['item'],
    computed: {
        clientName() {
            const clientObj = this.clients.find(
                (el) => el.url == this.item.client
            );

            return clientObj ? clientObj.name : '';
        }
    },
    vuex: {
        getters: {
            clients: (state) => state.clients
        }
    }
}
</script>
