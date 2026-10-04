(function() {
    var USERS_KEY = 'readiness_local_users';
    var SESSION_KEY = 'readiness_session';
    var serverUser = null;

    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    function saveUsers(arr) {
        try {
            localStorage.setItem(USERS_KEY, JSON.stringify(arr));
        } catch (e) {}
    }

    function simpleEnc(p) {
        try {
            return btoa(unescape(encodeURIComponent(p)));
        } catch (e) {
            return '';
        }
    }

    function getLocalSession() {
        try {
            return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
        } catch (e) {
            return null;
        }
    }

    function setLocalSession(obj) {
        try {
            if (obj) localStorage.setItem(SESSION_KEY, JSON.stringify(obj));
            else localStorage.removeItem(SESSION_KEY);
        } catch (e) {}
    }

    function registerLocal(email, password, name) {
        email = (email || '').trim().toLowerCase();
        if (!email || !password) return { ok: false, msgKey: 'auth_err_required' };
        var users = getUsers();
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email) return { ok: false, msgKey: 'auth_err_exists' };
        }
        users.push({
            email: email,
            ph: simpleEnc(password),
            name: (name || '').trim(),
            created: Date.now()
        });
        saveUsers(users);
        setLocalSession({ email: email, name: (name || '').trim() });
        return { ok: true };
    }

    function loginLocal(email, password) {
        email = (email || '').trim().toLowerCase();
        var users = getUsers();
        var ph = simpleEnc(password);
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].ph === ph) {
                setLocalSession({ email: users[i].email, name: users[i].name || '' });
                return { ok: true };
            }
        }
        return { ok: false, msgKey: 'auth_err_badlogin' };
    }

    function logoutLocal() {
        setLocalSession(null);
    }

    function t(key) {
        return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t(key) : key;
    }

    function useServer() {
        return typeof window.ReadyAPI !== 'undefined' && window.ReadyAPI.enabled && window.ReadyAPI.post;
    }

    function renderAuthPage() {
        var box = document.getElementById('auth-panel');
        if (!box) return;

        var sess = useServer() ? serverUser : getLocalSession();
        var showEmail = sess && (sess.email || (sess.user && sess.user.email));
        var showName = sess && (sess.name !== undefined ? sess.name : sess.user && sess.user.name);
        if (useServer() && serverUser) {
            showEmail = serverUser.email;
            showName = serverUser.name || '';
        }

        if (showEmail) {
            var adminLink =
                useServer() && serverUser && serverUser.is_admin
                    ? '<p class="mt-2"><a class="btn btn-outline" href="admin.html">' +
                      escapeHtml(t('auth_link_admin')) +
                      '</a></p>'
                    : '';
            box.innerHTML =
                '<div class="auth-welcome result-box result-good">' +
                '<p><strong>' +
                escapeHtml(t('auth_logged_as')) +
                '</strong> ' +
                escapeHtml(showName || showEmail) +
                '</p>' +
                '<p class="text-muted" style="font-size:0.9rem">' +
                escapeHtml(showEmail) +
                '</p>' +
                adminLink +
                '<button type="button" class="btn btn-secondary mt-2" id="auth-btn-logout">' +
                escapeHtml(t('auth_logout')) +
                '</button></div>';
            var btn = document.getElementById('auth-btn-logout');
            if (btn)
                btn.addEventListener('click', function() {
                    if (useServer()) {
                        window.ReadyAPI.post('/api/auth/logout', {}).then(function() {
                            serverUser = null;
                            renderAuthPage();
                        });
                    } else {
                        logoutLocal();
                        renderAuthPage();
                    }
                });
            return;
        }

        box.innerHTML =
            '<p class="auth-tabs-hint text-muted mb-2">' +
            escapeHtml(t('auth_tabs_hint')) +
            '</p>' +
            '<div class="auth-tabs mb-3" role="tablist" aria-label="' +
            escapeHtml(t('auth_tabs_aria')) +
            '">' +
            '<button type="button" role="tab" class="btn btn-secondary auth-tab active" data-tab="login" aria-selected="true">' +
            escapeHtml(t('auth_tab_login')) +
            '</button> ' +
            '<button type="button" role="tab" class="btn btn-secondary auth-tab auth-tab-register" data-tab="register" aria-selected="false">' +
            escapeHtml(t('auth_tab_register')) +
            '</button></div>' +
            '<form id="form-login" class="auth-form">' +
            '<label class="auth-label"><span>' +
            escapeHtml(t('auth_email')) +
            '</span><input type="email" class="auth-input" name="email" required autocomplete="username"></label>' +
            '<label class="auth-label"><span>' +
            escapeHtml(t('auth_pass')) +
            '</span><input type="password" class="auth-input" name="password" required autocomplete="current-password"></label>' +
            '<button type="submit" class="btn btn-primary mt-2">' +
            escapeHtml(t('auth_submit_login')) +
            '</button></form>' +
            '<form id="form-register" class="auth-form" style="display:none">' +
            '<label class="auth-label"><span>' +
            escapeHtml(t('auth_name')) +
            '</span><input type="text" class="auth-input" name="name" autocomplete="name"></label>' +
            '<label class="auth-label"><span>' +
            escapeHtml(t('auth_email')) +
            '</span><input type="email" class="auth-input" name="email" required autocomplete="email"></label>' +
            '<label class="auth-label"><span>' +
            escapeHtml(t('auth_pass')) +
            '</span><input type="password" class="auth-input" name="password" required autocomplete="new-password"></label>' +
            '<button type="submit" class="btn btn-primary mt-2">' +
            escapeHtml(t('auth_submit_register')) +
            '</button></form>' +
            '<p class="text-muted mt-3" style="font-size:0.85rem">' +
            escapeHtml(t(useServer() ? 'auth_note_server' : 'auth_note')) +
            '</p>';

        function setAuthTab(tab) {
            var tabs = box.querySelectorAll('.auth-tab');
            var j;
            for (j = 0; j < tabs.length; j++) {
                var isActive = tabs[j].getAttribute('data-tab') === tab;
                tabs[j].classList.toggle('active', isActive);
                tabs[j].setAttribute('aria-selected', isActive ? 'true' : 'false');
            }
            var fl = document.getElementById('form-login');
            var fr = document.getElementById('form-register');
            if (fl) fl.style.display = tab === 'login' ? 'block' : 'none';
            if (fr) fr.style.display = tab === 'register' ? 'block' : 'none';
        }

        var tabs = box.querySelectorAll('.auth-tab');
        for (var ti = 0; ti < tabs.length; ti++) {
            tabs[ti].addEventListener('click', function() {
                setAuthTab(this.getAttribute('data-tab'));
            });
        }

        try {
            var u = new URL(window.location.href);
            if (u.searchParams.get('register') === '1' || u.hash === '#register') {
                setAuthTab('register');
            }
        } catch (e) {}

        document.getElementById('form-login').addEventListener('submit', function(ev) {
            ev.preventDefault();
            var fd = new FormData(this);
            var email = fd.get('email');
            var password = fd.get('password');
            if (useServer()) {
                window.ReadyAPI.post('/api/auth/login', { email: email, password: password }).then(function(res) {
                    if (res.ok && res.user) {
                        serverUser = res.user;
                        renderAuthPage();
                    } else {
                        alert(
                            res.error
                                ? window.SITE_I18N.apiErr(res.error)
                                : t('auth_err_badlogin')
                        );
                    }
                });
            } else {
                var r = loginLocal(email, password);
                if (r.ok) renderAuthPage();
                else alert(t(r.msgKey || 'auth_err_badlogin'));
            }
        });
        document.getElementById('form-register').addEventListener('submit', function(ev) {
            ev.preventDefault();
            var fd = new FormData(this);
            if (useServer()) {
                window.ReadyAPI
                    .post('/api/auth/register', {
                        email: fd.get('email'),
                        password: fd.get('password'),
                        name: fd.get('name')
                    })
                    .then(function(res) {
                        if (res.ok && res.user) {
                            serverUser = res.user;
                            renderAuthPage();
                        } else {
                            alert(
                                res.error
                                    ? window.SITE_I18N.apiErr(res.error)
                                    : t('auth_err_exists')
                            );
                        }
                    });
            } else {
                var r2 = registerLocal(fd.get('email'), fd.get('password'), fd.get('name'));
                if (r2.ok) renderAuthPage();
                else alert(t(r2.msgKey || 'auth_err_required'));
            }
        });
    }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function boot() {
        if (useServer()) {
            window.ReadyAPI.get('/api/auth/me').then(function(data) {
                serverUser = data && data.user ? data.user : null;
                renderAuthPage();
            }).catch(function() {
                serverUser = null;
                renderAuthPage();
            });
        } else {
            renderAuthPage();
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
    window.addEventListener('site-lang-change', function() {
        renderAuthPage();
    });
})();
