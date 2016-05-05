/**
A list of feature requests
*/

<template>
  <div class="feature-list">

    <div class="row">
      <div class="col-md-8">
        <toggle-content dismiss-on="form-submitted">
          <span slot="button">
            Add Feature Request
          </span>
          <feature-form slot="content" transition="fade"></feature-form>

          <hr slot="footer" transition="fade">
        </toggle-content>

      </div>
    </div>

    <div class="row">

      <div class="col-md-6">
        <filter-list></filter-list>
      </div>

      <div class="col-md-6">
        <paginator :page="page"
                   :max-page="maxPage"
                   route-name="list-all"
                   klass="pull-right">
        </paginator>
      </div>

    </div>

    <table class="table">

      <thead>
        <td v-for="name in columns">
          <sort-button
              :title="name.title"
              :sort-by="name.property">
          </sort-button>
        </td>

      </thead>
      <tbody>

        <tr class="feature"
            v-for="item in features | limitBy pageSize (page-1)*pageSize">

          <!-- Render according to this.columns -->
          <td v-for="col in columns">
            {{ item | prop col.property }}
          </td>

        </tr>

      </tbody>

    </table>

    <paginator :page="page"
               :max-page="maxPage"
               route-name="list-all"
               klass="pull-right">
    </paginator>

  </div>
</template>

<script>
import {filteredFeatures, filterList} from '../vuex/getters.js';
import '../filters/prop';
import Paginator from './paginator.vue';
import SortButton from './sort-button.vue';
import FilterList from './filter-list.vue';
import FeatureForm from './featureform.vue';
import ToggleContent from './toggle-content.vue';


export default {
    data() {
        return {
            columns: [
                {title: 'Title', property: 'title'},
                {title: 'Description', property: 'description'},
                {title: 'Client', property: 'client.name'},
                {title: 'Priority', property: 'client_priority'},
                {title: 'Product Area', property: 'product_area.name'},
                {title: 'Target Date', property: 'target_date'},
                {title: 'Ticket', property: 'ticket_url'}
            ],
            pageSize: 20
        }
    },
    components: {
        SortButton,
        Paginator,
        FilterList,
        FeatureForm,
        ToggleContent
    },
    vuex: {
        getters: {
            /* Expose features array */
            features: filteredFeatures,
            page: state => {
                const raw = parseInt(state.route.params.page) || 1;
                return raw > 0 ? raw : 1;
            }
        }
    },
    computed: {
        // Highest page number given length this.features and this.pageSize
        maxPage() {
            return this.features.length / this.pageSize;
        }
    }
}
</script>
