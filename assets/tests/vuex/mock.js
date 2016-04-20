/* Mock api/backend.js */
function mockBackend() {
    return {
        endpoints:  {
            features: {
                getAll: function() {}
            },
            client: {
                getAll: function() {}
            },
            productArea: {
                getAll: function() {}
            }
        }
    };
}

/* Mock response api/backend.js endpoints */
function mockResponse(payload, status=200) {
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
        }
    };
}

export {mockBackend, mockResponse};
