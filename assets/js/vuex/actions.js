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

function fetchFeatures({dispatch}) {
    const getAll = backend.endpoints.features.getAll;

    const handler = (response) => {
        if (response.statusCode() == 200) {

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
        if (response.statusCode() == 200) {
            dispatch('CLIENTS_REPLACE', unwrapResponse(response));
        }
    });
}

function fetchProductAreas({dispatch}) {
    backend.endpoints.productArea.getAll().then((response) => {
        if (response.statusCode() == 200) {
            dispatch('PRODUCTAREAS_REPLACE', unwrapResponse(response));
        }
    });
}

export {fetchFeatures, fetchClients, fetchProductAreas};
