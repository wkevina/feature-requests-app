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

            const modelProperty = objectPath.get(feature, filter.opt.prop);

            // If filter uses value list, match exactly
            if (filter.values) {
                return modelProperty == filter.value;
            } else {
                return modelProperty == filter.value ||
                    modelProperty.toLowerCase().trim().includes(
                        filter.value.toLowerCase().trim()
                    );
            }
        });
    };
}
