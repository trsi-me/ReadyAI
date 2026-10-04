(function () {
    var injected = false;

    function adminHref() {
        return window.location.pathname.indexOf('/pages/') !== -1 ? 'admin.html' : 'pages/admin.html';
    }

    function label() {
        return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t('nav_admin') : 'Admin';
    }

    function inject() {
        if (injected) return;
        var nav = document.querySelector('.main-nav ul');
        if (!nav) return;
        if (nav.querySelector('[data-admin-nav]')) return;

        fetch((typeof window.API_BASE !== 'undefined' ? window.API_BASE : '') + '/api/auth/me', {
            credentials: 'same-origin'
        })
            .then(function (r) {
                return r.json();
            })
            .then(function (data) {
                if (!data || !data.user || !data.user.is_admin) return;
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = adminHref();
                a.setAttribute('data-admin-nav', '1');
                a.setAttribute('data-i18n', 'nav_admin');
                a.textContent = label();
                li.appendChild(a);
                nav.appendChild(li);
                injected = true;
                if (typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang) {
                    var lang = window.SITE_I18N.getLang();
                    var dict = window.SITE_I18N.STR && window.SITE_I18N.STR[lang];
                    if (dict && dict.nav_admin) a.textContent = dict.nav_admin;
                }
            })
            .catch(function () {});
    }

    function onLang() {
        var a = document.querySelector('a[data-admin-nav]');
        if (a && typeof window.SITE_I18N !== 'undefined') {
            var k = a.getAttribute('data-i18n');
            if (k) a.textContent = window.SITE_I18N.t(k);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
    window.addEventListener('site-lang-change', onLang);
})();
