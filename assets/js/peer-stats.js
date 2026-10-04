// Anonymous peer stats in localStorage only (this browser) — no names, optional server aggregate.
(function(global) {
    var KEY = 'readiness_peer_scores';

    function bandFromScore(s) {
        if (typeof s !== 'number' || s < 0) return 0;
        if (s <= 40) return 0;
        if (s <= 80) return 1;
        return 2;
    }

    function recordPeerScore(totalScore, mode) {
        if (mode !== 'full') return;
        try {
            var arr = JSON.parse(localStorage.getItem(KEY) || '[]');
            arr.push({ t: Date.now(), s: totalScore });
            if (arr.length > 800) arr = arr.slice(-800);
            localStorage.setItem(KEY, JSON.stringify(arr));
        } catch (e) {}
    }

    function getPeerDistribution() {
        try {
            var arr = JSON.parse(localStorage.getItem(KEY) || '[]');
            var c = [0, 0, 0];
            for (var i = 0; i < arr.length; i++) {
                c[bandFromScore(arr[i].s)]++;
            }
            return {
                counts: c,
                total: arr.length,
                labelsAr: ['ضعيف (0–40)', 'متوسط (41–80)', 'قوي (81–120)'],
                labelsEn: ['Weak (0–40)', 'Intermediate (41–80)', 'Strong (81–120)']
            };
        } catch (e) {
            return {
                counts: [0, 0, 0],
                total: 0,
                labelsAr: ['ضعيف (0–40)', 'متوسط (41–80)', 'قوي (81–120)'],
                labelsEn: ['Weak (0–40)', 'Intermediate (41–80)', 'Strong (81–120)']
            };
        }
    }

    global.recordPeerScore = recordPeerScore;
    global.getPeerDistribution = getPeerDistribution;
    global.peerBandFromTotalScore = bandFromScore;
})(typeof window !== 'undefined' ? window : this);
