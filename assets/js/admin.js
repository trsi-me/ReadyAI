(function () {
    function t(k) {
        return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t(k) : k;
    }

    var usersOffset = 0;
    var attemptsOffset = 0;
    var attemptsMode = '';
    var usersQ = '';

    function esc(s) {
        if (s == null || s === '') return '—';
        var d = document.createElement('div');
        d.textContent = String(s);
        return d.innerHTML;
    }

    function showForbidden() {
        document.getElementById('admin-gate').style.display = 'none';
        document.getElementById('admin-need-server').style.display = 'none';
        document.getElementById('admin-need-login').style.display = 'none';
        document.getElementById('admin-forbidden').style.display = 'block';
    }

    function showMain() {
        document.getElementById('admin-gate').style.display = 'none';
        document.getElementById('admin-need-server').style.display = 'none';
        document.getElementById('admin-need-login').style.display = 'none';
        document.getElementById('admin-forbidden').style.display = 'none';
        document.getElementById('admin-app').style.display = 'block';
        var iq = document.getElementById('users-q');
        if (iq) iq.placeholder = t('admin_search_placeholder');
    }

    function loadSummary() {
        return window.ReadyAPI.get('/api/admin/summary').then(function (d) {
            if (!d.ok) throw new Error('summary');
            var c = d.counts;
            document.getElementById('kpi-users').textContent = c.users;
            document.getElementById('kpi-attempts').textContent = c.attempts;
            document.getElementById('kpi-full').textContent = c.full_mode;
            document.getElementById('kpi-unit').textContent = c.unit_mode;
            document.getElementById('kpi-guest').textContent = c.guest_attempts;
            var dist = d.score_distribution;
            document.getElementById('dist-weak').textContent = dist.bands[0];
            document.getElementById('dist-med').textContent = dist.bands[1];
            document.getElementById('dist-strong').textContent = dist.bands[2];
            document.getElementById('dist-total').textContent = dist.total_full;

            var tbody = document.getElementById('recent-tbody');
            tbody.innerHTML = '';
            var viewLabel = t('admin_view_json');
            (d.recent_attempts || []).forEach(function (r) {
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' +
                    esc(r.id) +
                    '</td><td>' +
                    esc(r.user_email || t('admin_guest')) +
                    '</td><td>' +
                    esc(r.mode === 'unit' ? t('admin_mode_unit') : t('admin_mode_full')) +
                    '</td><td>' +
                    esc(r.total_score) +
                    '/' +
                    esc(r.max_total) +
                    '</td><td>' +
                    esc(r.created_at) +
                    '</td><td><button type="button" class="btn btn-secondary btn-sm admin-open-detail" data-id="' +
                    esc(r.id) +
                    '"></button></td>';
                tr.querySelector('.admin-open-detail').textContent = viewLabel;
                tbody.appendChild(tr);
            });
        });
    }

    function loadUsers() {
        var q = encodeURIComponent(usersQ);
        var url =
            '/api/admin/users?limit=40&offset=' + usersOffset + (usersQ ? '&q=' + q : '');
        return window.ReadyAPI.get(url).then(function (d) {
            if (!d.ok) throw new Error('users');
            var tbody = document.getElementById('users-tbody');
            if (usersOffset === 0) tbody.innerHTML = '';
            (d.users || []).forEach(function (u) {
                var tr = document.createElement('tr');
                var role = u.is_admin ? t('admin_role_admin') : t('admin_role_user');
                tr.innerHTML =
                    '<td>' +
                    esc(u.id) +
                    '</td><td>' +
                    esc(u.email) +
                    '</td><td>' +
                    esc(u.name) +
                    '</td><td>' +
                    esc(role) +
                    '</td><td>' +
                    esc(u.created_at) +
                    '</td>';
                tbody.appendChild(tr);
            });
            document.getElementById('users-more').style.display =
                usersOffset + d.users.length < d.total ? 'inline-block' : 'none';
        });
    }

    function loadAttempts() {
        var url = '/api/admin/attempts?limit=40&offset=' + attemptsOffset;
        if (attemptsMode) url += '&mode=' + encodeURIComponent(attemptsMode);
        return window.ReadyAPI.get(url).then(function (d) {
            if (!d.ok) throw new Error('attempts');
            var tbody = document.getElementById('attempts-tbody');
            if (attemptsOffset === 0) tbody.innerHTML = '';
            var viewLabel = t('admin_view_json');
            (d.attempts || []).forEach(function (r) {
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' +
                    esc(r.id) +
                    '</td><td>' +
                    esc(r.user_email || t('admin_guest')) +
                    '</td><td>' +
                    esc(r.mode === 'unit' ? t('admin_mode_unit') : t('admin_mode_full')) +
                    '</td><td>' +
                    esc(r.total_score) +
                    '/' +
                    esc(r.max_total) +
                    '</td><td>' +
                    esc(r.created_at) +
                    '</td><td><button type="button" class="btn btn-secondary btn-sm admin-open-detail" data-id="' +
                    esc(r.id) +
                    '"></button></td>';
                tr.querySelector('.admin-open-detail').textContent = viewLabel;
                tbody.appendChild(tr);
            });
            document.getElementById('attempts-more').style.display =
                attemptsOffset + d.attempts.length < d.total ? 'inline-block' : 'none';
        });
    }

    function openDetail(id) {
        window.ReadyAPI.get('/api/admin/attempt/' + id).then(function (d) {
            if (!d.ok) {
                alert(t('admin_err_load'));
                return;
            }
            document.getElementById('admin-json-pre').textContent = JSON.stringify(d.attempt, null, 2);
            document.getElementById('admin-modal').setAttribute('aria-hidden', 'false');
            document.getElementById('admin-modal').classList.add('is-open');
        });
    }

    function closeModal() {
        document.getElementById('admin-modal').classList.remove('is-open');
        document.getElementById('admin-modal').setAttribute('aria-hidden', 'true');
    }

    function refreshAll() {
        usersOffset = 0;
        attemptsOffset = 0;
        return loadSummary()
            .then(function () {
                return loadUsers();
            })
            .then(function () {
                return loadAttempts();
            })
            .catch(function () {
                alert(t('admin_err_network'));
            });
    }

    function boot() {
        if (!window.ReadyAPI || !window.ReadyAPI.enabled) {
            document.getElementById('admin-gate').style.display = 'none';
            document.getElementById('admin-need-server').style.display = 'block';
            return;
        }
        window.ReadyAPI.get('/api/auth/me').then(function (data) {
            document.getElementById('admin-gate').style.display = 'none';
            if (!data || !data.user) {
                document.getElementById('admin-need-login').style.display = 'block';
                return;
            }
            if (!data.user.is_admin) {
                showForbidden();
                return;
            }
            showMain();
            refreshAll();
        });
    }

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.admin-open-detail');
        if (btn) {
            var id = btn.getAttribute('data-id');
            if (id) openDetail(id);
        }
        if (e.target.id === 'admin-modal-close' || e.target.id === 'admin-modal-backdrop') {
            closeModal();
        }
    });

    document.getElementById('users-more').addEventListener('click', function () {
        usersOffset += 40;
        loadUsers();
    });
    document.getElementById('attempts-more').addEventListener('click', function () {
        attemptsOffset += 40;
        loadAttempts();
    });
    document.getElementById('admin-refresh').addEventListener('click', function () {
        usersOffset = 0;
        attemptsOffset = 0;
        refreshAll();
    });
    document.getElementById('users-search').addEventListener('click', function () {
        usersQ = (document.getElementById('users-q') || {}).value || '';
        usersOffset = 0;
        loadUsers();
    });
    document.getElementById('attempt-filter').addEventListener('change', function () {
        attemptsMode = this.value;
        attemptsOffset = 0;
        loadAttempts();
    });

    window.addEventListener('site-lang-change', function () {
        var nodes = document.querySelectorAll('#admin-app [data-i18n]');
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            var key = el.getAttribute('data-i18n');
            if (key && window.SITE_I18N && window.SITE_I18N.t) el.textContent = window.SITE_I18N.t(key);
        }
        var iq = document.getElementById('users-q');
        if (iq && window.SITE_I18N) iq.placeholder = window.SITE_I18N.t('admin_search_placeholder');
        if (document.getElementById('admin-app').style.display !== 'none') {
            usersOffset = 0;
            attemptsOffset = 0;
            refreshAll();
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
