import prop from '../../js/filters/prop.js';

describe('prop', function () {
    it('should return nested property if found', function () {
        let ob = {
            a: {
                b: 'c',
                d: false,
                e: undefined
            }
        };

        // if property is truthy
        expect(prop(ob, 'a.b')).toEqual('c');

        // if property is falsey
        expect(prop(ob, 'a.d')).toEqual(false);

    });

    it('should return None if not found', function () {
        let ob = {
            a: {
                d: undefined
            }
        };

        // if there is no a.c
        expect(prop(ob, 'a.c')).toEqual('None');

        // if there is an a.d, but its value is undefined
        expect(prop(ob, 'a.d')).toEqual('None');
    });

    it('should return third argument if not found', function () {
        let ob = {
            a: {
                b: 'c'
            }
        };

        expect(prop(ob, 'a.d', 'empty')).toEqual('empty');
    });
});
