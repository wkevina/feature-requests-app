<template lang="html">
  <div class="container">
    <h3>Feature Requests</h3>
    <ul class="nav nav-tabs">
      <li v-link-active>
        <a v-link="{name: 'list-all', params: {page: 1}}">Home</a>
      </li>
      <li v-link-active>
        <a v-link="{name: 'new-feature'}">Create</a>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
