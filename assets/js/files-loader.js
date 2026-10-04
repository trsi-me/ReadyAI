document.addEventListener('DOMContentLoaded', function() {
    var filesList = document.getElementById('files-list');
    if (!filesList || typeof FILES_DATA === 'undefined') return;

    function t(key) {
        return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t(key) : key;
    }

    function renderFiles() {
        filesList.innerHTML = '';
        var basePath = window.location.pathname.includes('/pages/') ? '../' : '';
        var pdfIcon = '<i class="fa-solid fa-file-pdf" aria-hidden="true"></i>';

        FILES_DATA.forEach(function(file) {
            var titleKey = 'file_' + file.id + '_title';
            var descKey = 'file_' + file.id + '_desc';
            var title = t(titleKey);
            var desc = t(descKey);
            var card = document.createElement('div');
            card.className = 'file-card';
            card.innerHTML =
                '<div class="file-card-icon">' +
                pdfIcon +
                '</div>' +
                '<div class="file-card-body">' +
                '<h4 class="file-card-title">' +
                escapeHtml(title) +
                '</h4>' +
                '<span class="file-card-filename">PDF · ' +
                escapeHtml(file.filename || file.path.split('/').pop()) +
                '</span>' +
                '<p class="file-card-desc">' +
                escapeHtml(desc) +
                '</p>' +
                '<a href="' +
                basePath +
                file.path +
                '" class="btn file-download-btn" download="' +
                escapeHtml(file.filename || file.path.split('/').pop()) +
                '">' +
                '<i class="fa-solid fa-download" aria-hidden="true"></i> ' +
                escapeHtml(t('file_download')) +
                '</a>' +
                '</div>';
            filesList.appendChild(card);
        });
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    renderFiles();
    window.addEventListener('site-lang-change', renderFiles);
});
