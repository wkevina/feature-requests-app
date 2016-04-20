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
    <td>{{ item.client.name }}</td>
    <td>{{ item.product_area.name }}</td>
  </tr>
</template>

<script>

import Vue from 'vue';

export default {
    props: ['item']
}
</script>
