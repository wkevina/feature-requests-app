/* Utility module to help retrieve CSRF tokens */

import cookie from 'cookie';

export const CSRF_HEADER = 'X-CSRFToken';
export const CSRF_COOKIE_NAME = 'csrftoken';

export function token() {
    const all = cookie.parse(document.cookie);

    return all[CSRF_COOKIE_NAME];
}

export function header() {
    return {
        [CSRF_HEADER]: token()
    };
}
