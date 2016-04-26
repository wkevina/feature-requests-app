<template>
  <nav v-if="maxPage" :class="klass">

    <ul class="pagination">

      <template v-for="pageNum in maxPage">

        <li v-link-active>
          <a v-link="{name: routeName,
                     params: {page: pageNum + 1}
                     }">
            {{ pageNum + 1 }}
          </a>
        </li>

      </template>

    </ul>

  </nav>

</template>

<script>
export default {
    props: ['maxPage', 'page', 'routeName', 'klass']
}
</script>
