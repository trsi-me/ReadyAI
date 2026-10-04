(function(global) {
    function post(path, body) {
        var base = global.API_BASE || '';
        return fetch(base + path, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body || {})
        }).then(function(r) {
            return r.json().then(function(j) {
                if (!r.ok) j._httpError = r.status;
                return j;
            });
        });
    }

    function get(path) {
        var base = global.API_BASE || '';
        return fetch(base + path, { credentials: 'same-origin' }).then(function(r) {
            return r.json();
        });
    }

    global.ReadyAPI = {
        enabled: !!global.USE_FLASK_API,
        post: post,
        get: get
    };
})(typeof window !== 'undefined' ? window : this);
