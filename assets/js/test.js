(function() {
    var currentQuestion = 0;
    var answers = {};

    var unitParam = NaN;
    try {
        unitParam = parseInt(new URLSearchParams(window.location.search).get('unit') || '', 10);
    } catch (e) {}

    var isUnitMode = unitParam >= 1 && unitParam <= 20;

    var questions = TEST_DATA.questions;
    if (isUnitMode) {
        questions = TEST_DATA.questions.filter(function(q) {
            return q.standardId === unitParam;
        });
    }

    function labelForDifficulty(diff) {
        if (typeof window.SITE_I18N !== 'undefined') {
            if (diff === 'easy') return window.SITE_I18N.t('diff_easy');
            if (diff === 'medium') return window.SITE_I18N.t('diff_medium');
            if (diff === 'hard') return window.SITE_I18N.t('diff_hard');
        }
        return { easy: 'سهل', medium: 'متوسط', hard: 'صعب' }[diff] || diff;
    }

    function langIsEn() {
        return typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en';
    }

    function qText(q) {
        if (q.textEn !== undefined && q.textAr !== undefined) {
            return langIsEn() ? q.textEn : q.textAr;
        }
        return q.text;
    }

    function qOptions(q) {
        if (q.optionsEn !== undefined && q.optionsAr !== undefined) {
            return langIsEn() ? q.optionsEn : q.optionsAr;
        }
        return q.options;
    }

    function init() {
        var note = document.getElementById('test-mode-note');
        if (note && isUnitMode) {
            var st = TEST_DATA.standards.find(function(s) {
                return s.id === unitParam;
            });
            note.style.display = 'block';
            var tb = typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t('test_unit_badge') : 'اختبار الوحدة';
            var sl = typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t('test_standard_label') : 'المعيار:';
            var useEn = langIsEn();
            var stdTitle = st ? (useEn ? st.nameEn : st.nameAr) : '';
            note.innerHTML =
                '<strong>' +
                escapeHtml(tb) +
                '</strong> — ' +
                escapeHtml(sl) +
                ' ' +
                unitParam +
                ': <span lang="' +
                (useEn ? 'en' : 'ar') +
                '">' +
                escapeHtml(stdTitle) +
                '</span><br><span class="text-muted">' +
                (typeof window.SITE_I18N !== 'undefined'
                    ? window.SITE_I18N.t('test_unit_intro')
                    : 'ثلاثة أسئلة لهذا المعيار فقط (الدرجة القصوى 6).') +
                '</span>';
        }
        if (isUnitMode) {
            var introP = document.querySelector('.test-intro-full');
            if (introP) introP.style.display = 'none';
        }
        renderQuestion();
        renderProgress();
    }

    function t(key) {
        return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t(key) : '';
    }

    function renderProgress() {
        var progressEl = document.getElementById('test-progress');
        if (!progressEl) return;
        var percent = ((currentQuestion + 1) / questions.length) * 100;
        progressEl.innerHTML = '<div class="progress-fill" style="width:' + percent + '%"></div>';
        var pt = progressEl.nextElementSibling;
        if (pt) {
            pt.textContent =
                t('test_progress_q') +
                ' ' +
                (currentQuestion + 1) +
                ' ' +
                t('test_progress_of') +
                ' ' +
                questions.length;
        }
    }

    function renderQuestion() {
        if (currentQuestion >= questions.length) {
            submitTest();
            return;
        }

        var q = questions[currentQuestion];
        var standard = TEST_DATA.standards.find(function(s) {
            return s.id === q.standardId;
        });
        var opts = qOptions(q);
        var optionsHtml = '';
        for (var i = 0; i < opts.length; i++) {
            var selected = answers[q.id] === i ? ' selected' : '';
            optionsHtml +=
                '<li class="option-item' +
                selected +
                '" data-qid="' +
                q.id +
                '" data-opt="' +
                i +
                '">' +
                escapeHtml(opts[i]) +
                '</li>';
        }

        var useEn = langIsEn();
        var stdName = standard ? (useEn ? standard.nameEn : standard.nameAr) : '';
        var dLabel = labelForDifficulty(q.difficulty) || q.difficulty;

        document.getElementById('question-container').innerHTML =
            '<div class="question-card">' +
            '<p class="text-muted mb-1">' +
            escapeHtml(t('test_standard_label')) +
            ' <strong>' +
            escapeHtml(stdName) +
            '</strong></p>' +
            '<p class="test-meta-line mb-2"><span class="test-diff test-diff-' +
            q.difficulty +
            '">' +
            escapeHtml(dLabel) +
            '</span> ' +
            '<span class="test-weight">(' +
            escapeHtml(t('test_weight_label')) +
            ' ' +
            q.weight +
            ')</span></p>' +
            '<h4>' +
            escapeHtml(qText(q)) +
            '</h4>' +
            '<ul class="options-list">' +
            optionsHtml +
            '</ul>' +
            '</div>';

        renderProgress();

        var items = document.querySelectorAll('.option-item');
        for (var j = 0; j < items.length; j++) {
            items[j].addEventListener('click', function() {
                var qid = parseInt(this.getAttribute('data-qid'), 10);
                var opt = parseInt(this.getAttribute('data-opt'), 10);
                answers[qid] = opt;
                document.querySelectorAll('.option-item').forEach(function(el) {
                    el.classList.remove('selected');
                });
                this.classList.add('selected');
            });
        }
    }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function scoreToLevel(score) {
        if (score <= 2) return { ar: 'ضعيف', en: 'Weak', key: 'weak' };
        if (score <= 4) return { ar: 'متوسط', en: 'Intermediate', key: 'medium' };
        return { ar: 'قوي', en: 'Strong', key: 'strong' };
    }

    /** مستوى إجمالي للاختبار الكامل من 120 حسب نطاقات الجاهزية (0–40 / 41–80 / 81–120). */
    function overallLevelFromTotal(totalScore) {
        if (totalScore <= 40) return { ar: 'ضعيف', en: 'Weak', key: 'weak' };
        if (totalScore <= 80) return { ar: 'متوسط', en: 'Intermediate', key: 'medium' };
        return { ar: 'قوي', en: 'Strong', key: 'strong' };
    }

    function buildLocalAttempt() {
        var byStandard = {};
        var i;
        var q;
        var sid;

        for (i = 0; i < TEST_DATA.standards.length; i++) {
            sid = TEST_DATA.standards[i].id;
            byStandard[sid] = {
                score: 0,
                max: 6,
                correctEasy: false,
                correctMedium: false,
                correctHard: false
            };
        }

        var totalScore = 0;

        for (i = 0; i < questions.length; i++) {
            q = questions[i];
            var ans = answers[q.id];
            if (ans === undefined) ans = -1;
            var isCorrect = ans === q.correct;
            sid = q.standardId;

            if (!byStandard[sid]) continue;

            if (isCorrect) {
                byStandard[sid].score += q.weight;
                totalScore += q.weight;
                if (q.difficulty === 'easy') byStandard[sid].correctEasy = true;
                if (q.difficulty === 'medium') byStandard[sid].correctMedium = true;
                if (q.difficulty === 'hard') byStandard[sid].correctHard = true;
            }
        }

        var standardsOut = [];
        var isUnit = isUnitMode && questions.length === 3;

        if (isUnit) {
            var stOne = TEST_DATA.standards.find(function(s) {
                return s.id === unitParam;
            });
            if (stOne) {
                var row = byStandard[unitParam];
                var lvl = scoreToLevel(row.score);
                standardsOut.push({
                    id: unitParam,
                    nameEn: stOne.nameEn,
                    nameAr: stOne.nameAr,
                    score: row.score,
                    max: 6,
                    level: lvl
                });
            }
        } else {
            for (i = 0; i < TEST_DATA.standards.length; i++) {
                var st = TEST_DATA.standards[i];
                sid = st.id;
                var row2 = byStandard[sid];
                var lvl2 = scoreToLevel(row2.score);
                standardsOut.push({
                    id: sid,
                    nameEn: st.nameEn,
                    nameAr: st.nameAr,
                    score: row2.score,
                    max: 6,
                    level: lvl2
                });
            }
        }

        var overall;
        var maxTotal;
        if (isUnit) {
            overall = scoreToLevel(totalScore);
            maxTotal = 6;
        } else {
            overall = overallLevelFromTotal(totalScore);
            maxTotal = 120;
        }

        var d = new Date();
        var dateStr =
            d.getFullYear() +
            '-' +
            String(d.getMonth() + 1).padStart(2, '0') +
            '-' +
            String(d.getDate()).padStart(2, '0');
        return {
            date: dateStr,
            time: d.toLocaleTimeString(
                typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en'
                    ? 'en-US'
                    : 'ar-SA'
            ),
            totalScore: totalScore,
            maxTotal: maxTotal,
            overallLevel: overall,
            byStandardList: standardsOut,
            byStandard: byStandard,
            version: 3,
            mode: isUnit ? 'unit' : 'full',
            unitId: isUnit ? unitParam : null
        };
    }

    function finalizeAttempt(attempt) {
        try {
            var history = JSON.parse(localStorage.getItem('readiness_attempts') || '[]');
            history.unshift(attempt);
            if (history.length > 10) history.pop();
            localStorage.setItem('readiness_attempts', JSON.stringify(history));
        } catch (e) {}

        if (typeof recordPeerScore === 'function' && attempt.mode !== 'unit' && !attempt.attempt_id) {
            recordPeerScore(attempt.totalScore, 'full');
        }

        localStorage.setItem('readiness_last_result', JSON.stringify(attempt));
        window.location.href = 'results.html';
    }

    function submitTest() {
        var payload = {
            answers: {},
            mode: isUnitMode ? 'unit' : 'full',
            unit_id: isUnitMode ? unitParam : null,
            lang: typeof SITE_I18N !== 'undefined' ? SITE_I18N.getLang() : 'ar'
        };
        for (var ak in answers) {
            if (Object.prototype.hasOwnProperty.call(answers, ak)) {
                payload.answers[ak] = answers[ak];
            }
        }

        if (typeof window.ReadyAPI !== 'undefined' && window.ReadyAPI.enabled && window.ReadyAPI.post) {
            window.ReadyAPI.post('/api/exam/submit', payload)
                .then(function(res) {
                    if (res && res.ok && res.attempt) {
                        finalizeAttempt(res.attempt);
                    } else {
                        finalizeAttempt(buildLocalAttempt());
                    }
                })
                .catch(function() {
                    finalizeAttempt(buildLocalAttempt());
                });
            return;
        }

        finalizeAttempt(buildLocalAttempt());
    }

    function bootTest() {
        if (!questions.length) {
            var qc = document.getElementById('question-container');
            if (qc)
                qc.innerHTML =
                    '<p class="text-muted">' +
                    (typeof window.SITE_I18N !== 'undefined'
                        ? window.SITE_I18N.t('test_no_questions')
                        : 'لا توجد أسئلة لهذا المعيار.') +
                    '</p>';
            return;
        }
        var btnNext = document.getElementById('btn-next');
        if (btnNext) {
            btnNext.addEventListener('click', function() {
                var q = questions[currentQuestion];
                if (answers[q.id] === undefined) {
                    alert(t('test_select_first'));
                    return;
                }
                currentQuestion++;
                renderQuestion();
            });
        }
        init();
        window.addEventListener('site-lang-change', function() {
            var btn = document.getElementById('btn-next');
            if (btn && typeof window.SITE_I18N !== 'undefined') {
                btn.textContent = window.SITE_I18N.t('test_btn_next');
            }
            if (currentQuestion >= questions.length) return;
            init();
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootTest);
    } else {
        bootTest();
    }
})();
