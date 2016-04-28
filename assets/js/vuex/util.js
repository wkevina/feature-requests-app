import objectPath from 'object-path';

function empty(val) {
    return val == null ||
        val == undefined ||
        val == '';
}

/* Return filter function that tests each element against
 each filter in filters array */
export function makeFilter(filters) {
    return function (feature) {

        return filters.every(function (filter) {
            // ignore if value is blank
            if (empty(filter.value) || empty(filter.opt)) {
                return true;
            }

            return objectPath.get(feature, filter.opt.prop) == filter.value;
        });
    };
}
