(function () {
    function t(k) {
        return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t(k) : k;
    }

    function esc(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function profileHref(m) {
        var en = typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en';
        return en && m.profileUrlEn ? m.profileUrlEn : m.profileUrl;
    }

    function displayName(m) {
        var en = typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en';
        if (en && m.nameEn) return m.nameEn;
        return m.nameAr;
    }

    function render(list) {
        var grid = document.getElementById('faculty-grid');
        var empty = document.getElementById('faculty-empty');
        if (!grid) return;

        if (!list || !list.length) {
            grid.innerHTML = '';
            if (empty) {
                empty.hidden = false;
                empty.textContent = t('faculty_no_results');
            }
            return;
        }
        if (empty) empty.hidden = true;

        var html = '';
        var i;
        for (i = 0; i < list.length; i++) {
            var m = list[i];
            var imgHtml = '';
            if (m.photoUrl) {
                imgHtml =
                    '<img class="faculty-photo" src="' +
                    esc(m.photoUrl) +
                    '" alt="" loading="lazy" width="200" height="260">';
            } else {
                imgHtml =
                    '<span class="faculty-photo-placeholder" aria-hidden="true"><i class="fa-solid fa-user"></i></span>';
            }
            html +=
                '<article class="faculty-card" role="listitem">' +
                '<div class="faculty-photo-wrap">' +
                imgHtml +
                '</div>' +
                '<h3 class="faculty-name">' +
                esc(displayName(m)) +
                '</h3>' +
                '<a class="faculty-readmore" href="' +
                esc(profileHref(m)) +
                '" target="_blank" rel="noopener noreferrer">' +
                esc(t('faculty_read_more')) +
                '</a>' +
                '</article>';
        }
        grid.innerHTML = html;
    }

    function filterList(q) {
        if (typeof FACULTY_MEMBERS === 'undefined') return [];
        var needle = (q || '').trim().toLowerCase();
        if (!needle) return FACULTY_MEMBERS.slice();

        return FACULTY_MEMBERS.filter(function (m) {
            var a = (m.nameAr || '').toLowerCase();
            var e = (m.nameEn || '').toLowerCase();
            return a.indexOf(needle) !== -1 || e.indexOf(needle) !== -1;
        });
    }

    function boot() {
        var input = document.getElementById('faculty-search');
        function run() {
            render(filterList(input ? input.value : ''));
        }
        if (input) {
            input.addEventListener('input', run);
            input.addEventListener('search', run);
        }
        var btn = document.getElementById('faculty-search-btn');
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                run();
            });
        }
        run();
        window.addEventListener('site-lang-change', function () {
            render(filterList(input ? input.value : ''));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
