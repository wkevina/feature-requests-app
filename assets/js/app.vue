<template lang="html">
  <div class="container">
    <h3>Feature Requests</h3>
    <ul class="nav nav-tabs">
      <li v-for="nav in navs" v-link-active>
        <a v-link="{name: nav.route}">{{ nav.title }}</a>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    data() {
        return {
            navs: [
                {route: 'list-all', title: 'Home'},
                {route: 'new-feature', title: 'Create'},
            ]
        }
    }
}
</script>
