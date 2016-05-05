<template>
  <nav v-if="maxPage" :class="klass">

    <ul class="pagination">

      <li :class="previous ? '': 'disabled'">
        <a v-link="previous">
          &laquo;
        </a>
      </li>

      <template v-for="pageNum in maxPage">

        <li v-link-active>
          <a v-link="{name: routeName,
                     params: {page: pageNum + 1}
                     }">
            {{ pageNum + 1 }}
          </a>
        </li>

      </template>

      <li :class="next ? '': 'disabled'">
        <a v-link="next">
          &raquo;
        </a>
      </li>

    </ul>

  </nav>

</template>

<script>
export default {
    props: ['maxPage', 'page', 'routeName', 'klass'],
    computed: {
        previous() {
            if (this.page - 1 > 0) {
                return {
                    name: this.routeName,
                    params: {page: this.page-1}
                }
            } else {
                return null;
            }
        },
        next() {
            if (this.page + 1 <= this.maxPage) {
                return {
                    name: this.routeName,
                    params: {page: this.page+1}
                }
            } else {
                return null;
            }
        }
    }
}
</script>
