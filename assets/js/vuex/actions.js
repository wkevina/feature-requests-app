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

function fetchFeatures({ dispatch }) {
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

/**
 * POST data to server, creating a new feature request
 * If successful, the created data is added to the store
 * If server reports other feature requests were modified,
 * those are re-fetched and updated
 */
async function postFeature({ dispatch }, data) {
    const post = backend.endpoints.features.post;

    let response = await post(data);

    if (response.statusCode && response.statusCode() == 201) {
        const responseData = response.body().data();
        dispatch('FEATURES_APPEND', responseData);

        const headers = response.headers();
        if ('x-also-modified' in headers) {
            const modified = JSON.parse(headers['x-also-modified']);
            const getAll = backend.endpoints.features.getAll;

            if (modified.length == 0)
                return;

            let params = { id: modified };

            while (true) {
                let response = await getAll(params);

                if (statusOk(response)) {
                    let payload = response.body().data();
                    let updated = payload.results;

                    // Update features
                    updated.forEach(
                        feature => dispatch('FEATURES_UPDATE', feature)
                    );

                    if (payload.next) {
                        // Construct URI
                        const uri = URI(payload.next);
                        params = uri.search(true);
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
    }
}

function fetchClients({ dispatch }) {
    backend.endpoints.client.getAll().then((response) => {
        if (statusOk(response)) {
            dispatch('CLIENTS_REPLACE', unwrapResponse(response));
        }
    });
}

function fetchProductAreas({ dispatch }) {
    backend.endpoints.productArea.getAll().then((response) => {
        if (statusOk(response)) {
            dispatch('PRODUCTAREAS_REPLACE', unwrapResponse(response));
        }
    });
}

function setSort({ dispatch }, { property, reverse }) {
    if (property !== undefined) {
        dispatch('SORT_SET_PROPERTY', property);
    }

    if (reverse !== undefined) {
        dispatch('SORT_SET_REVERSE', !!reverse);
    }
}

function addEmptyFilter({ dispatch }) {
    dispatch('FILTER_APPEND', {
        opt: null, value: null
    });
}

function updateFilter({ dispatch }, filter, updated) {
    dispatch('FILTER_MODIFY', filter, updated);
}

function removeFilter({ dispatch }, filter) {
    dispatch('FILTER_REMOVE', filter);
}

export {fetchFeatures, fetchClients, fetchProductAreas,
        postFeature,
        setSort,
        addEmptyFilter, updateFilter, removeFilter};
