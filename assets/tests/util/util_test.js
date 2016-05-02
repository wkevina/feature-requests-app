import cookie from 'cookie';

import { token, header,
         CSRF_HEADER, CSRF_COOKIE_NAME } from '../../js/util/csrf.js';

describe('js/util/csrf.js', function () {

    beforeEach(function () {
        const csrfValue = 'abcdefghijk1230zxcvb';

        document.cookie = cookie.serialize(CSRF_COOKIE_NAME, csrfValue);

        this.csrfValue = csrfValue;
    });

    describe('token', function () {

        it('should return value of CSRF token from window', function () {

            const got = token();

            expect(got).toEqual(this.csrfValue);
        });
    });

    describe('header', function () {
        it('should return object with header name as key and token as value', function () {
            const got = header();

            expect(got[CSRF_HEADER], this.csrfValue);
        });
    });
});
