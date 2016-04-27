/*
 Store getter functions
 */

import arraySort from 'array-sort';

/* Return features array */
export const features = (state) => state.features;

/* Return clients array */
export const clients = (state) => state.clients;

/* Return productAreas array */
export const productAreas = (state) => state.productAreas;

/* Return features array with client and product_area fields
 replaced with Client and ProductArea objects */
export const expandedFeatures = (state) => {
    const extract = (el) => [el.url, el];
    const clientLookup = new Map(state.clients.map(extract));
    const areaLookup = new Map(state.productAreas.map(extract));

    return state.features.map((el) => {
        const expanded = {
            client: clientLookup.get(el.client) || '',
            product_area: areaLookup.get(el.product_area) || ''
        };

        return Object.assign({}, el, expanded);
    });
};

/* Return features list sorted by criteria */
export const sortedFeatures = (state) => {
    const expanded = expandedFeatures(state);

    if (!state.sort.by) {
        return expanded;
    }

    const reverse = state.sort.reverse;

    return arraySort(expanded, state.sort.by, {reverse});
};

/* Return current sorting property */
export const sortProperty = (state) => state.sort.by;

/* Return sorting reverse state */
export const sortReverse = (state) => state.sort.reverse;

/* Return filters list */
export const filterList = (state) => state.filters;

/* Return array describing available filters, including which property,
 title, and a value list if applicable */
export const filterOptions = (state) => {
    return [
        {
            /* Display */
            title: 'Title',
            /* Which property in data */
            prop: 'title'
        },
        {
            /* Display */
            title: 'Client Name',
            /* Which property in data */
            prop: 'client.name',
            /* Values */
            values: state.clients.map(el => el.name)
        },
        {
            /* Display */
            title: 'Product Area',
            /* Which property in data */
            prop: 'product_area.name',
            /* Values */
            values: state.productAreas.map(el => el.name)
        }
    ];
};
