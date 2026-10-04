(function() {
    function getResult() {
        try {
            return JSON.parse(localStorage.getItem('readiness_last_result'));
        } catch (e) {
            return null;
        }
    }

    function normalizedOverallFull(totalScore) {
        if (totalScore <= 40) return { ar: 'ضعيف', en: 'Weak', key: 'weak' };
        if (totalScore <= 80) return { ar: 'متوسط', en: 'Intermediate', key: 'medium' };
        return { ar: 'قوي', en: 'Strong', key: 'strong' };
    }

    function levelCls(key) {
        if (key === 'strong') return 'result-good';
        if (key === 'medium') return 'result-medium';
        return 'result-weak';
    }

    function generateRecommendations(attempt) {
        var recs = [];
        var list = attempt.byStandardList || [];
        function t(k) {
            return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t(k) : k;
        }
        function tf(k, v) {
            return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.tf(k, v) : k;
        }
        var e = typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en';

        if (attempt.mode === 'unit' && list.length === 1) {
            var u = list[0];
            if (u.level.key === 'weak') {
                recs.push({
                    standard: e ? u.nameEn : u.nameAr,
                    type: 'weak',
                    msg: tf(e ? 'rec_weak_en' : 'rec_weak_ar', { name: e ? u.nameEn : u.nameAr })
                });
            } else if (u.level.key === 'medium') {
                recs.push({
                    standard: e ? u.nameEn : u.nameAr,
                    type: 'medium',
                    msg: t(e ? 'rec_medium_en' : 'rec_medium_ar')
                });
            } else {
                recs.push({
                    standard: t(e ? 'rec_unit_good_title_en' : 'rec_unit_good_title_ar'),
                    type: 'good',
                    msg: t(e ? 'rec_unit_good_en' : 'rec_unit_good_ar')
                });
            }
            return recs;
        }

        var j;
        var weakCount = 0;
        var medCount = 0;
        var strongCount = 0;
        for (j = 0; j < list.length; j++) {
            var s = list[j];
            if (s.level.key === 'weak') {
                weakCount++;
                recs.push({
                    standard: e ? s.nameEn : s.nameAr,
                    type: 'weak',
                    msg: tf(e ? 'rec_weak_en' : 'rec_weak_ar', { name: e ? s.nameEn : s.nameAr })
                });
            } else if (s.level.key === 'medium') {
                medCount++;
            } else {
                strongCount++;
            }
        }
        if (weakCount === 0) {
            recs.unshift({
                standard: t(e ? 'rec_summary_title_en' : 'rec_summary_title_ar'),
                type: 'good',
                msg: tf(e ? 'rec_summary_msg_en' : 'rec_summary_msg_ar', { m: medCount, s: strongCount })
            });
        }
        return recs;
    }

    function improvementPlanForStandard(nameAr, nameEn, score) {
        var e = typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en';
        function t(k) {
            return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t(k) : k;
        }
        function tf(k, v) {
            return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.tf(k, v) : k;
        }
        var nm = e ? nameEn : nameAr;
        var steps = [
            tf(e ? 'plan_step_1_en' : 'plan_step_1', { name: nm }),
            t(e ? 'plan_step_2_en' : 'plan_step_2_ar'),
            t(e ? 'plan_step_3_en' : 'plan_step_3_ar')
        ];
        if (score <= 2) {
            steps.unshift(tf(e ? 'plan_step_weak_en' : 'plan_step_weak_ar', { name: nm }));
        }
        return steps;
    }

    function buildCoachAnalysis(attempt, overall, list) {
        if (attempt.mode === 'unit') return '';
        var en =
            typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en';
        var aiBlock = '';
        if (attempt.ai && (attempt.ai.plan_ar || attempt.ai.plan_en)) {
            var plan = en && attempt.ai.plan_en ? attempt.ai.plan_en : attempt.ai.plan_ar;
            var aiTitle =
                typeof window.SITE_I18N !== 'undefined'
                    ? window.SITE_I18N.t('results_ai_title')
                    : 'تحليل التعلم الآلي';
            aiBlock =
                '<h3 class="ai-ml-heading">' +
                escapeHtml(aiTitle) +
                '</h3><div class="ai-ml-box"><pre class="ai-ml-pre">' +
                escapeHtml(plan) +
                '</pre></div>';
            if (attempt.ai.confidence != null) {
                var confLabel =
                    typeof window.SITE_I18N !== 'undefined'
                        ? window.SITE_I18N.t(en ? 'ai_confidence_en' : 'ai_confidence_ar')
                        : en
                          ? 'Estimated confidence: '
                          : 'ثقة تقديرية للنموذج: ';
                aiBlock +=
                    '<p class="text-muted" style="font-size:0.9rem">' +
                    (confLabel + ' ') +
                    (attempt.ai.confidence * 100).toFixed(0) +
                    '%</p>';
            }
        }
        var w = 0;
        var m = 0;
        var st = 0;
        var i;
        var sorted = list.slice().sort(function(a, b) {
            return a.score - b.score;
        });
        for (i = 0; i < list.length; i++) {
            if (list[i].level.key === 'weak') w++;
            else if (list[i].level.key === 'medium') m++;
            else st++;
        }
        var weakest = [];
        for (i = 0; i < Math.min(3, sorted.length); i++) {
            if (sorted[i].score < 6) weakest.push(sorted[i]);
        }
        var weakNames = [];
        var weakNamesEn = [];
        for (i = 0; i < weakest.length; i++) {
            weakNames.push(weakest[i].nameAr + ' (' + weakest[i].score + '/6)');
            weakNamesEn.push(weakest[i].nameEn + ' (' + weakest[i].score + '/6)');
        }
        function tf(key, vars) {
            return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.tf(key, vars) : '';
        }
        var intro;
        if (en) {
            intro =
                '<p class="coach-lead"><strong>Readiness summary:</strong> Your total ' +
                attempt.totalScore +
                '/120 places you in the overall band <strong>' +
                escapeHtml(overall.en) +
                '</strong>. Across 20 standards: <strong>' +
                w +
                '</strong> weak, <strong>' +
                m +
                '</strong> intermediate, <strong>' +
                st +
                '</strong> strong.</p>';
            if (weakNamesEn.length > 0) {
                intro +=
                    '<p class="coach-weakest">' +
                    tf('coach_weakest_en', { list: escapeHtml(weakNamesEn.join(', ')) }) +
                    '</p>';
            } else {
                intro += '<p class="coach-weakest text-muted">' + tf('coach_no_weak_en') + '</p>';
            }
            intro += tf('coach_bullets_en');
        } else {
            intro =
                '<p class="coach-lead"><strong>تحليل الجاهزية:</strong> مجموعك ' +
                attempt.totalScore +
                '/120 يضعك في المستوى الإجمالي «' +
                escapeHtml(overall.ar) +
                '». من أصل 20 معياراً: <strong>' +
                w +
                '</strong> ضعيف، <strong>' +
                m +
                '</strong> متوسط، <strong>' +
                st +
                '</strong> قوي.</p>';
            if (weakNames.length > 0) {
                intro +=
                    '<p class="coach-weakest">' +
                    tf('coach_weakest_ar', { list: escapeHtml(weakNames.join('، ')) }) +
                    '</p>';
            } else {
                intro += '<p class="coach-weakest text-muted">' + tf('coach_no_weak_ar') + '</p>';
            }
            intro += tf('coach_bullets_ar');
        }
        return aiBlock + intro;
    }

    function drawPeerHistogramWithDist(userTotal, dist) {
        var canvas = document.getElementById('peer-histogram');
        if (!canvas || !canvas.getContext) return;
        var ctx = canvas.getContext('2d');
        var counts = dist.counts;
        var W = canvas.width;
        var H = canvas.height;
        var pad = 36;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#f8faf9';
        ctx.fillRect(0, 0, W, H);
        var maxC = Math.max(counts[0], counts[1], counts[2], 1);
        var barW = (W - pad * 2) / 3 - 16;
        var colors = ['#ef4444', '#f59e0b', '#16a34a'];
        var userBand =
            typeof peerBandFromTotalScore === 'function' ? peerBandFromTotalScore(userTotal) : 0;
        for (var b = 0; b < 3; b++) {
            var x = pad + b * ((W - pad * 2) / 3) + 8;
            var h = ((H - 70) * counts[b]) / maxC;
            var y = H - 50 - h;
            ctx.fillStyle = colors[b];
            ctx.fillRect(x, y, barW, h);
            if (b === userBand) {
                ctx.strokeStyle = '#1a5f4a';
                ctx.lineWidth = 3;
                ctx.strokeRect(x - 2, y - 2, barW + 4, h + 4);
            }
            ctx.fillStyle = '#334155';
            ctx.font = '14px Segoe UI, Tahoma, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(String(counts[b]), x + barW / 2, y - 6);
        }
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Segoe UI, Tahoma, sans-serif';
        var en =
            typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en';
        var labels = en && dist.labelsEn ? dist.labelsEn : dist.labelsAr || ['ضعيف', 'متوسط', 'قوي'];
        for (var j = 0; j < 3; j++) {
            var x2 = pad + j * ((W - pad * 2) / 3) + 8 + barW / 2;
            ctx.fillText(labels[j], x2, H - 22);
        }
        ctx.fillStyle = '#1a5f4a';
        ctx.font = '11px Segoe UI, Tahoma, sans-serif';
        ctx.textAlign = 'center';
        var cap =
            typeof window.SITE_I18N !== 'undefined'
                ? window.SITE_I18N.tf(en ? 'peer_caption_en' : 'peer_caption_ar', { n: userTotal })
                : en
                  ? 'Border highlights your band (score ' + userTotal + '/120)'
                  : 'الإطار المحدد = نطاقك التقريبي (مجموع ' + userTotal + '/120)';
        ctx.fillText(cap, W / 2, H - 4);
    }

    function drawPeerHistogram(userTotal) {
        var fallback = function() {
            if (typeof getPeerDistribution === 'function') {
                return getPeerDistribution();
            }
            return {
                counts: [0, 0, 0],
                total: 0,
                labelsAr: ['ضعيف (0–40)', 'متوسط (41–80)', 'قوي (81–120)'],
                labelsEn: ['Weak (0–40)', 'Intermediate (41–80)', 'Strong (81–120)']
            };
        };
        if (typeof window.ReadyAPI !== 'undefined' && window.ReadyAPI.enabled && window.ReadyAPI.get) {
            window.ReadyAPI
                .get('/api/stats/peer-distribution')
                .then(function(data) {
                    drawPeerHistogramWithDist(userTotal, {
                        counts: data.counts,
                        total: data.total,
                        labelsAr: ['ضعيف (0–40)', 'متوسط (41–80)', 'قوي (81–120)'],
                        labelsEn: ['Weak (0–40)', 'Intermediate (41–80)', 'Strong (81–120)']
                    });
                })
                .catch(function() {
                    drawPeerHistogramWithDist(userTotal, fallback());
                });
            return;
        }
        drawPeerHistogramWithDist(userTotal, fallback());
    }

    function render() {
        var result = getResult();
        if (!result || !Array.isArray(result.byStandardList)) {
            window.location.href = 'test.html';
            return;
        }

        var total = result.totalScore;
        var maxT = result.maxTotal || 120;
        var overall =
            result.mode === 'full'
                ? normalizedOverallFull(total)
                : result.overallLevel;
        var list = result.byStandardList || [];

        document.getElementById('total-score').textContent = total + ' / ' + maxT;
        document.getElementById('total-score').className =
            'number ' + levelCls(overall.key);

        var lbl = document.getElementById('total-score-label');
        if (lbl) {
            if (typeof window.SITE_I18N !== 'undefined') {
                lbl.textContent =
                    result.mode === 'unit'
                        ? window.SITE_I18N.t('results_total_label_unit')
                        : window.SITE_I18N.t('results_total_label');
            } else {
                lbl.textContent =
                    result.mode === 'unit'
                        ? 'درجة المعيار (من 6)'
                        : 'الجاهزية الإجمالية (مجموع الدرجات من 120)';
            }
        }

        var sub = document.getElementById('total-score-sub');
        if (sub) {
            var e2 = typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en';
            if (typeof window.SITE_I18N !== 'undefined') {
                if (result.mode === 'unit') {
                    sub.textContent = e2
                        ? window.SITE_I18N.tf('results_sub_unit_en', { en: overall.en })
                        : window.SITE_I18N.tf('results_sub_unit_ar', { lvl: overall.ar });
                } else {
                    sub.textContent = e2
                        ? window.SITE_I18N.tf('results_sub_full_en', { en: overall.en })
                        : window.SITE_I18N.tf('results_sub_full_ar', { lvl: overall.ar });
                }
            } else {
                sub.textContent =
                    result.mode === 'unit'
                        ? 'مستوى المعيار: ' + overall.ar + ' (' + overall.en + ') — من 6 درجات.'
                        : 'مستوى الجاهزية الإجمالي: ' + overall.ar + ' (' + overall.en + ') — حسب مجموع الدرجات: 0–40 ضعيف، 41–80 متوسط، 81–120 قوي.';
            }
        }

        var coachEl = document.getElementById('coach-analysis');
        var totalBlock = document.getElementById('total-legend-block');
        var peerSec = document.getElementById('peer-section');
        if (result.mode === 'full') {
            if (coachEl) {
                coachEl.style.display = 'block';
                coachEl.className = 'coach-block mb-4 result-box';
                coachEl.innerHTML = buildCoachAnalysis(result, overall, list);
            }
            if (totalBlock) totalBlock.style.display = 'block';
            if (peerSec) {
                peerSec.style.display = 'block';
                setTimeout(function() {
                    drawPeerHistogram(total);
                }, 0);
            }
        } else {
            if (coachEl) {
                coachEl.style.display = 'none';
                coachEl.innerHTML = '';
            }
            if (totalBlock) totalBlock.style.display = 'none';
            if (peerSec) peerSec.style.display = 'none';
        }

        var byStandardHtml = '';
        var i;
        var langEn = typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en';
        var ariaBar =
            typeof window.SITE_I18N !== 'undefined'
                ? window.SITE_I18N.t('results_bar_aria')
                : 'نسبة الإتقان';
        for (i = 0; i < list.length; i++) {
            var s = list[i];
            var pct = (s.score / 6) * 100;
            var barCls = levelCls(s.level.key);
            var lvlTxt = langEn ? s.level.en : s.level.ar;
            var stdTitle = langEn ? s.nameEn : s.nameAr;
            byStandardHtml +=
                '<div class="result-standard-block">' +
                '<div class="result-standard-head">' +
                '<strong class="result-std-title" lang="' +
                (langEn ? 'en' : 'ar') +
                '">' +
                escapeHtml(stdTitle) +
                '</strong>' +
                '<span class="result-std-score ' + barCls + '">' + s.score + '/6 — ' + escapeHtml(lvlTxt) + '</span>' +
                '</div>' +
                '<div class="result-bar-wrap" role="img" aria-label="' + escapeHtml(ariaBar) + '">' +
                '<div class="result-bar-fill ' + barCls + '" style="width:' + pct + '%"></div>' +
                '</div>' +
                '</div>';
        }
        document.getElementById('by-standard').innerHTML = byStandardHtml;

        var recs = generateRecommendations(result);
        var recsHtml = '';
        for (var j = 0; j < recs.length; j++) {
            var r = recs[j];
            recsHtml +=
                '<div class="recommendation-item result-box ' +
                (r.type === 'weak' ? 'result-weak' : r.type === 'medium' ? 'result-medium' : 'result-good') +
                '"><strong>' +
                r.standard +
                ':</strong> ' +
                r.msg +
                '</div>';
        }
        document.getElementById('recommendations').innerHTML = recsHtml;

        document.getElementById('plan-content').innerHTML = buildPlan(result);
    }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function buildPlan(attempt) {
        function t(k) {
            return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t(k) : k;
        }
        function tf(k, v) {
            return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.tf(k, v) : k;
        }
        var e = typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en';

        var list = attempt.byStandardList || [];
        var html = '';
        var weakBlocks = [];

        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].level.key === 'weak') {
                weakBlocks.push(list[i]);
            }
        }

        if (attempt.mode === 'unit' && list.length === 1) {
            var one = list[0];
            if (weakBlocks.length > 0) {
                for (i = 0; i < weakBlocks.length; i++) {
                    var wu = weakBlocks[i];
                    var stepsU = improvementPlanForStandard(wu.nameAr, wu.nameEn, wu.score);
                    html += '<div class="improvement-card mb-4">';
                    html +=
                        '<p class="improvement-detect"><strong>' +
                        t(e ? 'plan_area_en' : 'plan_area_ar') +
                        '</strong> <span lang="' +
                        (e ? 'en' : 'ar') +
                        '">' +
                        escapeHtml(e ? wu.nameEn : wu.nameAr) +
                        '</span> — (' +
                        wu.score +
                        '/6)</p>';
                    html +=
                        '<p class="mb-2"><strong>' +
                        t(e ? 'plan_steps_en' : 'plan_steps_ar') +
                        '</strong></p><ol class="improvement-steps">';
                    var ku;
                    for (ku = 0; ku < stepsU.length; ku++) {
                        html += '<li>' + escapeHtml(stepsU[ku]) + '</li>';
                    }
                    html += '</ol></div>';
                }
            } else if (one.level.key === 'medium') {
                html += '<p class="text-muted mb-3">' + t(e ? 'plan_unit_medium_en' : 'plan_unit_medium_ar') + '</p>';
            } else {
                html +=
                    '<div class="result-box result-good mb-3"><strong>' +
                    t(e ? 'plan_unit_strong_en' : 'plan_unit_strong_ar') +
                    '</strong></div>';
            }
            return html;
        }

        if (weakBlocks.length === 0) {
            html +=
                '<div class="result-box result-good mb-3"><strong>' +
                t(e ? 'plan_no_weak_en' : 'plan_no_weak_ar') +
                '</strong></div>';
        }

        for (i = 0; i < weakBlocks.length; i++) {
            var w = weakBlocks[i];
            var steps = improvementPlanForStandard(w.nameAr, w.nameEn, w.score);
            html += '<div class="improvement-card mb-4">';
            html +=
                '<p class="improvement-detect"><strong>' +
                t(e ? 'plan_area_en' : 'plan_area_ar') +
                '</strong> <span lang="' +
                (e ? 'en' : 'ar') +
                '">' +
                escapeHtml(e ? w.nameEn : w.nameAr) +
                '</span> — (' +
                w.score +
                '/6)</p>';
            html +=
                '<p class="mb-2"><strong>' +
                t(e ? 'plan_steps_en' : 'plan_steps_ar') +
                '</strong></p><ol class="improvement-steps">';
            var k;
            for (k = 0; k < steps.length; k++) {
                html += '<li>' + escapeHtml(steps[k]) + '</li>';
            }
            html += '</ol></div>';
        }

        var medium = [];
        for (i = 0; i < list.length; i++) {
            if (list[i].level.key === 'medium') medium.push(list[i]);
        }
        if (medium.length > 0) {
            var mnames = [];
            for (var m = 0; m < medium.length; m++) mnames.push(e ? medium[m].nameEn : medium[m].nameAr);
            html +=
                '<p class="text-muted mb-2">' +
                tf(e ? 'plan_medium_list_en' : 'plan_medium_list_ar', {
                    names: escapeHtml(mnames.join(e ? ', ' : '، '))
                }) +
                '</p>';
        }

        return html;
    }

    function boot() {
        render();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
    window.addEventListener('site-lang-change', render);
})();
