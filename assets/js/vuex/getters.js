/*
 Store getter functions
 */

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
