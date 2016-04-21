var data = require('./data.json');

var converted = data.map((data) => {
    var fields = {};
    [
        'title',
        'description',
        'client_priority',
        'target_date',
        'client',
        'product_area'
    ].forEach(key => fields[key] = data[key]);

    fields.target_date = fields.target_date.split('T')[0];

    return {
        model: data.model,
        pk: data.pk,
        fields: fields
    };
});

var keys = new Set();

var deduped = converted.map((data) => {
    var fields = data.fields,
        key = [fields.client, fields.client_priority].join(',');

    if (keys.has(key)) {
        while(keys.has(key)) {
            fields.client_priority += 1;
            key = [fields.client, fields.client_priority].join(',');
        }
    }

    keys.add(key);

    return data;
});

console.log(JSON.stringify(deduped,null, 2));
