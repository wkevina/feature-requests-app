/**
A single feature request
*/

<template>
  <div class="feature">
    <p>{{ item.title }}</p>
  </div>
</template>

<script>
export default {
    props: ['item']
}
</script>
