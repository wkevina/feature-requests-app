/* Mock api/backend.js */
function mockBackend() {
    return {
        endpoints:  {
            features: {
                getAll: function () {}
            },
            client: {
                getAll: function () {}
            },
            productArea: {
                getAll: function () {}
            }
        }
    };
}

/* Mock response api/backend.js endpoints */
function mockResponse(payload, status=200, headers={}) {
    return {
        body() {
            return {
                data() {
                    return payload;
                }
            };
        },

        statusCode() {
            return status;
        },

        headers() {
            return headers;
        }
    };
}

function mockState() {
    return {
        features: [
            {
                title: 'Mock1',
                client: '/api/client/1/',
                product_area: '/api/productarea/1/'
            },
            {
                title: 'Mock2',
                client: '/api/client/2/',
                product_area: '/api/productarea/2/'
            },
            {
                title: 'Mock3',
                client: '/api/client/3/',
                product_area: '/api/productarea/3/'
            }
        ],
        clients: [
            {
                name: 'Client A',
                url: '/api/client/1/'
            },
            {
                name: 'Client B',
                url: '/api/client/2/'
            },
            {
                name: 'Client C',
                url: '/api/client/3/'
            }
        ],
        productAreas: [
            {
                name: 'Sales',
                url: '/api/productarea/1/'
            },
            {
                name: 'Marketing',
                url: '/api/productarea/2/'
            },
            {
                name: 'Widgets',
                url: '/api/productarea/3/'
            }
        ]
    };
}

export {mockBackend, mockResponse, mockState};
