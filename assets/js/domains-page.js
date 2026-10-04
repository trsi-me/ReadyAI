document.addEventListener('DOMContentLoaded', function() {
    var root = document.getElementById('domains-root');
    if (!root || typeof DOMAIN_AREAS === 'undefined') return;

    function t(key) {
        return typeof window.SITE_I18N !== 'undefined' ? window.SITE_I18N.t(key) : key;
    }

    function render() {
        var en = typeof window.SITE_I18N !== 'undefined' && window.SITE_I18N.getLang() === 'en';
        root.innerHTML = '';

        DOMAIN_AREAS.forEach(function(domain, idx) {
            var section = document.createElement('section');
            section.className = 'domain-section';
            section.setAttribute('aria-labelledby', 'domain-title-' + (idx + 1));

            var title = document.createElement('h2');
            title.id = 'domain-title-' + (idx + 1);
            title.className = 'domain-section-title';
            var titleEn = domain.titleEn || domain.titleAr;
            title.textContent = en
                ? idx + 1 + '. Domain: ' + titleEn
                : idx + 1 + '. المجال: ' + domain.titleAr;

            section.appendChild(title);

            var blurb = document.createElement('p');
            blurb.className = 'domain-blurb';
            blurb.lang = en ? 'en' : 'ar';
            blurb.textContent = en ? domain.blurbEn : domain.blurbAr || domain.blurbEn;
            section.appendChild(blurb);

            var grid = document.createElement('div');
            grid.className = 'domain-course-grid';

            domain.courses.forEach(function(course) {
                var card = document.createElement('article');
                card.className = 'domain-course-card';

                var top = document.createElement('div');
                top.className = 'domain-course-block domain-course-block--topic';
                var topicLabel = document.createElement('span');
                topicLabel.className = 'domain-card-sublabel';
                topicLabel.textContent = t('domains_topic');
                var topic = document.createElement('h3');
                topic.className = 'domain-topic-en';
                topic.lang = 'en';
                topic.textContent = course.topicEn;
                top.appendChild(topicLabel);
                top.appendChild(topic);

                var mid = document.createElement('div');
                mid.className = 'domain-course-block domain-course-block--course';
                var courseLabel = document.createElement('span');
                courseLabel.className = 'domain-card-sublabel';
                courseLabel.textContent = t('domains_course');
                var meta = document.createElement('p');
                meta.className = 'domain-course-name-ar';
                meta.lang = en ? 'en' : 'ar';
                meta.textContent = en ? (course.courseEn || course.topicEn) : course.courseAr;
                mid.appendChild(courseLabel);
                mid.appendChild(meta);

                var bottom = document.createElement('div');
                bottom.className = 'domain-course-block domain-course-block--staff';
                var staffLabel = document.createElement('span');
                staffLabel.className = 'domain-card-sublabel';
                staffLabel.textContent = t('domains_staff');

                var ul = document.createElement('ul');
                ul.className = 'domain-instructor-list';

                var names = course.instructors && course.instructors.length ? course.instructors : null;

                if (names) {
                    names.forEach(function(name) {
                        var li = document.createElement('li');
                        li.textContent = name;
                        ul.appendChild(li);
                    });
                } else {
                    var li = document.createElement('li');
                    li.className = 'domain-instructor-placeholder';
                    li.textContent = t('domains_placeholder');
                    ul.appendChild(li);
                }

                bottom.appendChild(staffLabel);
                bottom.appendChild(ul);

                card.appendChild(top);
                card.appendChild(mid);
                card.appendChild(bottom);
                grid.appendChild(card);
            });

            section.appendChild(grid);
            root.appendChild(section);
        });
    }

    render();
    window.addEventListener('site-lang-change', render);
});
