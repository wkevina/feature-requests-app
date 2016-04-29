<template lang="html">
  <div class="container">
    <h1>Feature Requests</h1>
    <ul class="nav nav-tabs">
      <li v-link-active>
        <a v-link="{name: 'home'}">Home</a>
      </li>
      <li v-link-active>
        <a v-link="{name: 'new-feature'}">Create</a>
      </li>
    </ul>

    <div class="buffer">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
 .buffer {
     margin-top: 24px;
 }
</style>
