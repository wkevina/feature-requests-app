/*
 Actions

 Functions that operate on store data but may be asynchronous

 This is the public API of the store for components
 */

import backend from '../api/backend.js';
import URI from 'urijs';

function unwrapResponse(response) {
    return response.body().data().results;
}

function statusOk(r) {
    return r.statusCode && r.statusCode() == 200;
}

function fetchFeatures({dispatch}) {
    const getAll = backend.endpoints.features.getAll;

    const handler = (response) => {

       if (statusOk(response)) {

            const data = response.body().data();
            const newFeatures = data.results;

            /* Store data */
            if (data.previous === null || data.previous === undefined) {
                dispatch('FEATURES_REPLACE', newFeatures);
            } else {
                dispatch('FEATURES_APPEND', newFeatures);
            }

            /* Handle pagination */
            if (data.next) {
                // Construct URI
                const uri = URI(data.next);
                const params = uri.search(true);

                getAll(params).then(handler);
            }
        }
    };

    backend.endpoints.features.getAll().then(handler);
};

function fetchClients({dispatch}) {
    backend.endpoints.client.getAll().then((response) => {
        if (statusOk(response)) {
            dispatch('CLIENTS_REPLACE', unwrapResponse(response));
        }
    });
}

function fetchProductAreas({dispatch}) {
    backend.endpoints.productArea.getAll().then((response) => {
        if (statusOk(response)) {
            dispatch('PRODUCTAREAS_REPLACE', unwrapResponse(response));
        }
    });
}

function setSort({dispatch}, {property, reverse}) {
    if (property !== undefined) {
        dispatch('SORT_SET_PROPERTY', property);
    }
    if (reverse !== undefined) {
        dispatch('SORT_SET_REVERSE', !!reverse);
    }
}

function addEmptyFilter({dispatch}) {
    dispatch('FILTER_APPEND', {opt: null, value: null});
}

export {fetchFeatures, fetchClients, fetchProductAreas,
        setSort,
        addEmptyFilter};
