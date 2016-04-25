/**
 Vue.js filter that returns a nested property of the filtered
 object
 */

import Vue from 'vue';
import objectPath from 'object-path';

function prop(value, dotted, notFound='None') {
    return objectPath.get(value, dotted, notFound);
}

Vue.filter('prop', prop);

export default prop;
