/**
 * عند تشغيل الموقع عبر خادم Flask (python server/app.py) فعّل USE_FLASK_API.
 * عند فتح الملفات مباشرة من القرص (file://) اتركها false.
 */
window.USE_FLASK_API =
    typeof window.USE_FLASK_API !== 'undefined' ? window.USE_FLASK_API : true;
window.API_BASE = typeof window.API_BASE !== 'undefined' ? window.API_BASE : '';
