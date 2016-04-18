/*
 Actions

 Functions that operate on store data but may be asynchronous

 This is the public API of the store for components
 */

import backend from '../api/backend.js';

function fetchFeatures({dispatch}) {
    backend.endpoints.features.getAll().then((response) => {
        if (response.statusCode() == 200) {
            const newFeatures = response.body().data().results;
            dispatch('FEATURES_REPLACE', newFeatures);
        }
    });
};

export {fetchFeatures};
