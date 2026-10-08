(function () {
    var STORAGE_KEY = 'site_lang';

    var STR = {
        ar: {
            nav_home: 'الرئيسية',
            nav_about: 'نبذة عن الاختبار',
            nav_programs: 'التخصصات',
            nav_domains: 'مجالات اختبار الجاهزية',
            nav_services: 'الخدمات',
            nav_resources: 'مصادر تعليمية',
            nav_tests: 'نماذج',
            nav_team: 'من نحن',
            nav_faculty: 'أعضاء هيئة التدريس',
            nav_contact: 'تواصل معنا',
            nav_account: 'دخول / حساب جديد',
            nav_admin: 'لوحة الإدارة',
            admin_loading: 'جاري التحقق من الصلاحيات…',
            admin_need_server: 'شغّل الموقع عبر خادم Flask لاستخدام لوحة الإدارة.',
            admin_need_login: 'يجب تسجيل الدخول بحساب مسؤول.',
            admin_forbidden_page: 'ليس لديك صلاحية الوصول إلى لوحة الإدارة.',
            admin_back_home: 'الرئيسية',
            admin_title: 'لوحة الإدارة',
            admin_subtitle: 'إحصاءات المستخدمين والمحاولات وعرض تفاصيل النتائج.',
            admin_refresh: 'تحديث',
            admin_demo_hint:
                'حسابات تجريبية: مسؤول admin@readyai.local — مستخدم demo@readyai.local',
            admin_kpi_title: 'نظرة عامة',
            admin_stat_users: 'المستخدمون',
            admin_stat_attempts: 'المحاولات',
            admin_stat_full: 'اختبار كامل',
            admin_stat_unit: 'وحدة',
            admin_stat_guest: 'محاولات بدون حساب',
            admin_dist_title: 'توزيع الدرجات (اختبار كامل)',
            admin_dist_total_label: 'عدد المحاولات الكاملة',
            admin_recent: 'آخر المحاولات',
            admin_users_title: 'المستخدمون',
            admin_attempts_title: 'كل المحاولات',
            admin_filter_label: 'تصفية',
            admin_filter_all: 'الكل',
            admin_filter_full: 'كامل',
            admin_filter_unit: 'وحدة',
            admin_search_placeholder: 'بحث بالبريد أو الاسم…',
            admin_search_btn: 'بحث',
            admin_th_id: 'المعرّف',
            admin_th_user: 'المستخدم',
            admin_th_mode: 'الوضع',
            admin_th_score: 'الدرجة',
            admin_th_date: 'التاريخ',
            admin_th_detail: 'تفاصيل',
            admin_th_role: 'الدور',
            admin_role_admin: 'مسؤول',
            admin_role_user: 'مستخدم',
            admin_load_more: 'المزيد',
            admin_detail_title: 'تفاصيل المحاولة (JSON)',
            admin_close: 'إغلاق',
            admin_guest: '(زائر)',
            admin_mode_full: 'كامل',
            admin_mode_unit: 'وحدة',
            admin_view_json: 'عرض JSON',
            admin_err_load: 'تعذر تحميل التفاصيل.',
            admin_err_network: 'تعذر تحميل البيانات. تحقق من الجلسة أو الشبكة.',
            auth_link_admin: 'لوحة الإدارة',
            badge_home: 'مشروع تخرج — جامعة الحدود الشمالية — كلية العلوم، علوم الحاسب',
            badge_sub: 'منصة تعليمية رسمية — جامعة الحدود الشمالية — كلية العلوم، علوم الحاسب',
            footer_copy: 'منصة الاستعداد لاختبار الجاهزية © جامعة الحدود الشمالية — كلية العلوم، علوم الحاسب',
            lang_switch_en: 'English',
            lang_switch_ar: 'العربية',
            hero_title: 'منصة الاستعداد لاختبار الجاهزية',
            hero_desc:
                'منصة إلكترونية رسمية تساعد طلاب علوم الحاسب على قياس جاهزيتهم للانخراط في سوق العمل أو متابعة الدراسة العليا. تُعرِّف بالمعايير التخصصية العشرين، وتوفر اختباراً تجريبياً (60 سؤالاً)، مع توصيات وخطط تحسين مبنية على الأداء.',
            hero_start: 'ابدأ الآن',
            hero_register: 'إنشاء حساب جديد',
            hero_pdf: 'تحميل دليل الاختبار PDF',
            stat_standards: 'معيار تخصصي',
            stat_test: 'اختبار ذاتي',
            stat_free: 'مجاني للطلبة',
            services_title: 'الخدمات والتسهيلات',
            svc_tab: 'خدمات الطلبة',
            svc1_title: 'اختبار الجاهزية',
            svc1_desc:
                'اختبار تجريبي إلكتروني يقيس جاهزية طالب علوم الحاسب وفق عشرين معياراً تخصصياً (ثلاثة أسئلة لكل معيار بأوزان 1–2–3). يقدّم تقريراً مفصلاً مع توصيات وخطة تحسين مبنية على الأداء.',
            svc2_title: 'دليل الاختبار',
            svc2_desc:
                'دليل شامل يوضح معايير الاختبار وأقسامه، طريقة الأداء، ونصائح للاستعداد. يتضمن شرحاً للمعايير ومصادر التعلم الموصى بها لكل مجال.',
            svc3_title: 'المعايير والمصادر',
            svc3_desc:
                'مرجع للمعايير التخصصية العشرين لعلوم الحاسب، مع روابط لمصادر التعلم والمراجع الموصى بها لمساعدتك على التحضير بشكل منهجي.',
            svc_tag: 'خدمات الطلبة',
            svc_btn_test: 'بدء الاختبار',
            svc_btn_pdf: 'تحميل دليل الاختبار PDF',
            svc_btn_std: 'عرض المعايير',
            faq_section: 'الأسئلة الشائعة',
            faq_badge: 'الدعم',
            faq_q1: 'ما الفرق بين الاختبار التجريبي في هذا الموقع واختبار الجاهزية الرسمي؟',
            faq_a1:
                'الاختبار التجريبي هنا تدريب ذاتي داخل المنصة: يقيّم أداءك آلياً ويعرض تقريراً فورياً لأغراض التحضير والتوجيه. أما اختبار الجاهزية المعياري الذي تقدّمه هيئة تقويم التعليم والتدريب (عبر وحدة التقويم والتدريب) فهو اختبار رسمي بإجراءات وتوقيت ومعايير محددة من الجهة، ونتيجته الرسمية صادرة عن الهيئة وليست عن هذا الموقع.',
            faq_q2: 'ما هو اختبار الجاهزية بشكل عام؟',
            faq_a2:
                'مقياس يهدف إلى تقييم مدى استعداد خريجي التخصصات المعنية للانتقال إلى سوق العمل أو الدراسات العليا، وفق معايير أكاديمية ومهنية تغطي مجالات المعرفة الأساسية في التخصص.',
            faq_q3: 'من يستهدف اختبار «جاهزية» الرسمي؟ وهل يقتصر على سنة تخرج معينة؟',
            faq_a3:
                'يستهدف الطلاب المتوقع تخرجهم ضمن الفئة التي تحددها الهيئة لكل دورة؛ الاختبار غير مخصص لسنة تخرج واحدة بشكل دائم — تُعلن الفئات والمواعيد في إعلانات هيئة تقويم التعليم والتدريب. راجع دفتر الاختبار والدليل الرسمي لأحدث الشروط.',
            faq_q4: 'كم يستغرق الاختبار التجريبي في الموقع؟',
            faq_a4:
                'يضم الاختبار التجريبي 60 سؤالاً (ثلاثة أسئلة لكل من العشرين معياراً). غالباً ما يستغرق من نحو 45 إلى 90 دقيقة حسب سرعة الإجابة، ويُفضّل إكماله في جلسة واحدة.',
            faq_q5: 'ماذا أحصل بعد إنهاء الاختبار التجريبي؟',
            faq_a5:
                'تقرير يوضح درجتك لكل معيار (من 6) والمستوى (ضعيف / متوسط / قوي)، ومجموع الجاهزية من 120 مع المستوى الإجمالي (0–40 ضعيف، 41–80 متوسط، 81–120 قوي)، مع تحليل وتوصيات وخطة تحسين.',
            faq_q6: 'هل يمكن إعادة الاختبار التجريبي؟',
            faq_a6: 'نعم، يمكنك إعادته في أي وقت لمتابعة تطور مستواك بعد المراجعة.',
            contact_section: 'تواصل معنا',
            contact_badge: 'الدعم',
            contact_desc:
                'للاستفسارات والدعم الفني بخصوص منصة الاستعداد لاختبار الجاهزية (مشروع تخرج)، يمكنكم التواصل مع فريق العمل عبر البيانات أدناه. للاستفسارات الرسمية حول اختبار الجاهزية المعياري ومواعيد التسجيل، الرجاء الرجوع إلى هيئة تقويم التعليم والتدريب.',
            contact_team: 'فريق عمل المشروع',
            contact_team_note: 'دعم فني واستفسارات عن المنصة التجريبية',
            contact_tile_email: 'البريد الإلكتروني',
            contact_tile_wa: 'واتساب',
            contact_tile_etec: 'اختبار جاهزية (رسمي)',
            contact_tile_univ: 'الجهة الأكاديمية',
            contact_univ: 'جامعة الحدود الشمالية — كلية العلوم — قسم علوم الحاسب',
            contact_etec: 'للاختبار الرسمي «جاهزية»:',
            contact_etec_name: 'هيئة تقويم التعليم والتدريب',
            contact_wa_aria: 'فتح واتساب',
            team_title: 'من نحن — فريق العمل',
            team_sub: 'المشرفون والطالبات المطورات على منصة الاستعداد لاختبار الجاهزية.',
            team_super: 'الإشراف الأكاديمي',
            team_super_name: 'الدكتورة مروى عماره',
            team_super_desc: 'الجامعه الحدود الشماليه - علوم الحاسب',
            team_dev: 'فريق التطوير',
            team_dev_desc: 'طالبات علوم الحاسب — مشروع التخرج',
            team_students: 'طالبات علوم الحاسب',
            resources_title: 'مصادر تعليمية',
            resources_intro:
                'ثلاثة عشر قسماً حسب تجميعة SKU: في كل قسم ملفات PDF (ومراجع عند الحاجة) ثم اختبارات وحدات للمعايير المرتبطة (3 أسئلة لكل معيار).',
            resources_heading_pdf: 'ملفات PDF والمراجع',
            resources_heading_practice: 'اختبار الوحدة بعد المراجعة',
            resources_unit_btn_n: 'اختبار المعيار {n}',
            resources_std_ids: 'معايير هذا القسم: {list}',
            faculty_title: 'أعضاء هيئة التدريس',
            faculty_intro:
                'قائمة أعضاء هيئة التدريس بقسم علوم الحاسب — كلية العلوم بجامعة الحدود الشمالية (عرعر). البيانات مُستخرَجة من صفحة القسم الرسمية؛ للصورة والبريد والهاتف والنبذة الكاملة استخدم «اقرأ المزيد» للانتقال إلى ملف العضو على بوابة الجامعة.',
            faculty_source_page: 'صفحة القسم على موقع الجامعة',
            faculty_search_label: 'بحث باسم عضو هيئة التدريس',
            faculty_search_placeholder: 'ابحث بالاسم (عربي أو إنجليزي)…',
            faculty_search_btn: 'بحث',
            faculty_read_more: 'اقرأ المزيد',
            faculty_no_results: 'لا توجد نتائج مطابقة لبحثك.',
            standards_title: 'التخصصات والمعايير',
            standards_intro:
                'المعايير العشرون أدناه هي نفس مواضيع المعايير المذكورة ضمن مجالات اختبار الجاهزية (الخوارزميات، البرمجة، الشبكات، الرياضيات المتقطعة، معماريات الحاسب، وغيرها). للتفاصيل والمقررات وأعضاء هيئة التدريس راجع صفحة «مجالات اختبار الجاهزية».',
            test_title: 'اختبار الجاهزية التجريبي',
            test_intro:
                '60 سؤالاً موزّعة على 20 معياراً؛ لكل معيار ثلاثة أسئلة: سهل (وزن 1)، متوسط (وزن 2)، صعب (وزن 3). الدرجة القصوى لكل معيار 6 درجات. اختر الإجابة الصحيحة ثم اضغط «التالي».',
            test_unit_intro: 'اختبار الوحدة: ثلاثة أسئلة لهذا المعيار فقط (الدرجة القصوى 6).',
            results_title: 'النتائج',
            results_total_label: 'الجاهزية الإجمالية (مجموع الدرجات من 120)',
            results_total_label_unit: 'درجة المعيار (من 6)',
            results_legend_title: 'تحويل الدرجة إلى مستوى (لكل معيار من 6 درجات)',
            results_legend_total: 'المستوى الإجمالي (من 120 درجة)',
            legend_total_weak: 'ضعيف',
            legend_total_med: 'متوسط',
            legend_total_strong: 'قوي',
            results_peer_title: 'مقارنة مجهولة مع محاولات المنصة (هذا المتصفح)',
            results_peer_note:
                'يُعرض توزيع المستويات الإجمالية دون أسماء. مع الخادم: تُجمَّع المحاولات الكاملة في قاعدة بيانات مجهولة المصدر.',
            results_legend_note:
                'كل معيار: سؤال سهل (وزن 1) + متوسط (وزن 2) + صعب (وزن 3)؛ إجابة صحيحة تُضِيف الوزن، وإجابة خاطئة تُضِيف 0.',
            results_by_std: 'النتيجة حسب المعيار',
            results_recs: 'التوصيات',
            results_plan: 'خطة التحسين',
            results_retry: 'إعادة الاختبار',
            results_standards: 'المعايير',
            th_score: 'الدرجة',
            th_level: 'المستوى',
            domains_title: 'مجالات اختبار الجاهزية',
            legend_row1: 'ضعيف',
            legend_row2: 'متوسط',
            legend_row3: 'قوي',
            auth_title: 'الحساب',
            auth_tab_login: 'تسجيل الدخول',
            auth_tab_register: 'إنشاء حساب',
            auth_tabs_hint: 'لديك حساب؟ استخدم «تسجيل الدخول». جديد؟ اضغط «إنشاء حساب» وأدخل البريد وكلمة المرور والاسم (اختياري).',
            auth_tabs_aria: 'تسجيل الدخول أو إنشاء حساب',
            auth_email: 'البريد',
            auth_pass: 'كلمة المرور',
            auth_name: 'الاسم (اختياري)',
            auth_submit_login: 'دخول',
            auth_submit_register: 'تسجيل',
            auth_logout: 'خروج',
            auth_note:
                'تنبيه: التخزين محلي في المتصفح للتجربة فقط وليس أماناً حقيقياً كالخوادم.',
            auth_note_server:
                'الحسابات تُدار على خادم المنصة (Flask + SQLite) مع جلسة آمنة نسبياً؛ لا تشارك كلمة المرور.',
            auth_logged_as: 'مرحباً،',
            auth_err_required: 'أدخل البريد وكلمة المرور',
            auth_err_exists: 'البريد مسجّل مسبقاً',
            auth_err_badlogin: 'بيانات الدخول غير صحيحة',
            err_auth_required: 'يجب تسجيل الدخول أولاً.',
            err_admin_forbidden: 'ليست لديك صلاحية الوصول.',
            err_invalid_score: 'درجة غير صالحة.',
            err_not_found: 'لم يُعثر على المورد.',
            err_need_20_scores: 'يُحتاج إلى 20 درجة على الأقل.',
            err_model_unavailable: 'النموذج غير متوفر حالياً.',
            api_err_unknown: 'خطأ غير متوقع ({code}).',
            team_stu_1: 'ابرار خالد الحميدان 202310220',
            team_stu_2: 'شهد حميدي الرويلي 202309845',
            team_stu_3: 'أرياف الاسود العنزي 202308432',
            team_stu_4: 'دانه حمود الكبسي 202205457',
            team_stu_5: 'رزن فياض العنزي 202310894',
            results_ai_title: 'تحليل التعلم الآلي (نموذج RandomForest)',
            test_btn_next: 'التالي',
            test_select_first: 'اختر إجابة قبل المتابعة.',
            test_progress_q: 'السؤال',
            test_progress_of: 'من',
            test_standard_label: 'المعيار:',
            test_weight_label: 'وزن',
            diff_easy: 'سهل',
            diff_medium: 'متوسط',
            diff_hard: 'صعب',
            domains_intro:
                'نظرة على مجالات اختبار الجاهزية والمقررات المرتبطة بكل مجال، مع أسماء أعضاء هيئة التدريس المعنيين بكل مقرر.',
            domains_pdf_bar: 'وثيقة مرجعية: مجالات التخصص لاختبار الجاهزية (PDF)',
            domains_download: 'تنزيل الملف',
            domains_noscript: 'يُرجى تفعيل JavaScript لعرض المجالات والمقررات.',
            domains_topic: 'الموضوع',
            domains_course: 'المقرر',
            domains_staff: 'أعضاء هيئة التدريس',
            domains_placeholder: 'يُحدَّث من الملف الرسمي',
            file_download: 'تحميل',
            file_cs_title: 'المعايير الأكاديمية لبرامج علوم الحاسب',
            file_cs_desc:
                'وثيقة «المعايير الأكاديمية لبرامج علوم الحاسب» لعام 2025 والصادرة عن هيئة تقويم التعليم والتدريب. تحدد الحد الأدنى من المتطلبات ونواتج التعلم لخريجي البكالوريوس في علوم الحاسب.',
            file_guide_title: 'الدليل الإرشادي للاختبارات المعيارية (جاهزية)',
            file_guide_desc:
                'دليل إرشادي للمرحلة الثانية من برنامج «جاهزية» التابع لهيئة تقويم التعليم والتدريب: الأهداف، التخصصات، الفئة المستهدفة، وآلية الاختبارات.',
            file_student_title: 'دليل الطالب — جاهزية 2026',
            file_student_desc:
                'دليل موجّه للطلاب المتقدمين لاختبارات «جاهزية» 2026: المواعيد، المعايير، التعليمات، ودخول منصة الاختبار.',
            site_brand: 'منصة الاستعداد لاختبار الجاهزية',
            logo_subtitle: 'READINESS TEST PREPARATION PLATFORM',
            img_alt_nbu: 'جامعة الحدود الشمالية',
            img_alt_site: 'منصة الاستعداد لاختبار الجاهزية',
            meta_title_home: 'منصة الاستعداد لاختبار الجاهزية — طلاب علوم الحاسب',
            meta_title_standards: 'التخصصات والمعايير — منصة الاستعداد لاختبار الجاهزية',
            meta_title_domains: 'مجالات اختبار الجاهزية — منصة الاستعداد لاختبار الجاهزية',
            meta_title_resources: 'مصادر تعليمية — منصة الاستعداد لاختبار الجاهزية',
            meta_title_test: 'اختبار الجاهزية التجريبي — منصة الاستعداد لاختبار الجاهزية',
            meta_title_results: 'النتائج — منصة الاستعداد لاختبار الجاهزية',
            meta_title_team: 'من نحن — منصة الاستعداد لاختبار الجاهزية',
            meta_title_faculty: 'أعضاء هيئة التدريس — منصة الاستعداد لاختبار الجاهزية',
            meta_title_auth: 'الحساب — منصة الاستعداد لاختبار الجاهزية',
            meta_title_admin: 'لوحة الإدارة — منصة الاستعداد لاختبار الجاهزية',
            about_badge: 'إكتشف رؤيتنا',
            about_section_title: 'توجهات الاختبار الرئيسية',
            about_c1_title: 'تعريف الاختبار',
            about_c1_text:
                'اختبار الجاهزية هو مقياس ذاتي يهدف إلى تقييم مدى استعداد طالب علوم الحاسب للانتقال إلى المرحلة التالية — سواء كانت الانخراط في سوق العمل أو الالتحاق ببرامج الدراسات العليا. يعتمد على معايير أكاديمية ومهنية معتمدة تغطي مجالات المعرفة الأساسية، البرمجة، قواعد البيانات، الشبكات والأمن، والذكاء الاصطناعي.',
            about_c2_title: 'أهميته لطلاب علوم الحاسب',
            about_c2_text:
                'يُعرِّف الطالب بنقاط القوة والضعف لديه قبل التخرج، مما يساعده على توجيه جهوده نحو المهارات المطلوبة في سوق العمل. كما يوفر فهماً واضحاً للمعايير التخصصية ويزيد فرص النجاح سواء في التوظيف أو في القبول ببرامج الدراسات العليا.',
            about_c3_title: 'طريقة وآلية أداء الاختبار',
            about_c3_text:
                'يُجرى الاختبار إلكترونياً من خلال المنصة: يجيب الطالب على أسئلة تغطي المعايير التخصصية، ويحصل فور انتهائه على تقريرٍ يوضح مستوى أدائه مع توصيات محددة وخطة تحسين مبنية على النتائج.',
            files_section_title: 'الملفات والوثائق',
            svc1_sub: 'Readiness Test',
            svc2_sub: 'Test Guide',
            svc3_sub: 'Standards & Resources',
            standards_btn_domains: 'مجالات الجاهزية والمقررات',
            standards_btn_resources: 'مصادر تعليمية',
            svc_btn_test_full: 'بدء الاختبار الكامل',
            resources_unit_btn: 'اختبار الوحدة (3 أسئلة)',
            test_unit_badge: 'اختبار الوحدة',
            test_no_questions: 'لا توجد أسئلة لهذا المعيار.',
            results_bar_aria: 'نسبة الإتقان حسب المعيار',
            results_peer_hist_aria: 'رسم بياني لتوزيع المستويات',
            results_sub_unit_ar: 'مستوى المعيار: {lvl} — من 6 درجات.',
            results_sub_unit_en: 'Standard level: {en} (score out of 6).',
            results_sub_full_ar:
                'مستوى الجاهزية الإجمالي: {lvl} — حسب مجموع الدرجات: 0–40 ضعيف، 41–80 متوسط، 81–120 قوي.',
            results_sub_full_en:
                'Overall band: {en} — from total score bands: 0–40 weak, 41–80 intermediate, 81–120 strong.',
            ai_confidence_ar: 'ثقة تقديرية للنموذج:',
            ai_confidence_en: 'Estimated confidence:',
            peer_caption_ar: 'الإطار المحدد = نطاقك التقريبي (مجموع {n}/120)',
            peer_caption_en: 'Border highlights your band (score {n}/120)',
            rec_weak_ar: 'معيار ضعيف — ركّز على المراجعة والتدرب في: {name}',
            rec_weak_en: 'Weak standard — focus review and practice on: {name}',
            rec_medium_ar: 'مستوى متوسط — واصل التدريب والمراجعات لرفع الأداء إلى «قوي».',
            rec_medium_en: 'Intermediate level — keep practicing to reach «strong».',
            rec_unit_good_title_ar: 'النتيجة',
            rec_unit_good_title_en: 'Result',
            rec_unit_good_ar: 'أداء قوي في اختبار هذه الوحدة.',
            rec_unit_good_en: 'Strong performance on this unit quiz.',
            rec_summary_title_ar: 'ملخص',
            rec_summary_title_en: 'Summary',
            rec_summary_msg_ar: 'لا توجد معايير ضعيفة (0–2). معايير متوسطة: {m}، قوية: {s} من أصل 20.',
            rec_summary_msg_en: 'No weak standards (0–2). Intermediate: {m}, strong: {s} out of 20.',
            plan_area_ar: 'منطقة تحتاج تعزيز:',
            plan_area_en: 'Area to strengthen:',
            plan_steps_ar: 'خطة مقترحة:',
            plan_steps_en: 'Suggested plan:',
            plan_unit_medium_ar:
                'مستوى متوسط في هذه الوحدة — راجع المصادر التعليمية المرتبطة بهذا المعيار في صفحة «مصادر تعليمية» وأعد اختبار الوحدة بعد التدريب.',
            plan_unit_medium_en:
                'Intermediate in this unit — review linked resources on the Resources page and retake the unit quiz after practice.',
            plan_unit_strong_ar: 'أداء قوي في هذه الوحدة. واصل التميز والمراجعة الدورية.',
            plan_unit_strong_en: 'Strong performance on this unit. Keep excelling and reviewing regularly.',
            plan_no_weak_ar: 'لا توجد معايير ضعيفة بحاجة لخطة عاجلة. واصل التميز والمراجعة الدورية.',
            plan_no_weak_en: 'No weak standards needing urgent focus. Keep excelling and reviewing regularly.',
            plan_medium_list_ar: 'معايير متوسطة (3–4): {names} — واصل التدريب لرفعها إلى «قوي».',
            plan_medium_list_en: 'Intermediate standards (3–4): {names} — keep practicing to reach «strong».',
            plan_step_1: 'مراجعة المفاهيم الأساسية المتعلقة بـ «{name}»',
            plan_step_1_en: 'Review core concepts related to «{name}»',
            plan_step_2_ar: 'حل تمارين إضافية من مصادر موثوقة',
            plan_step_2_en: 'Solve extra exercises from reliable sources',
            plan_step_3_ar: 'إعادة محاولة الأسئلة الخاطئة بعد أسبوعين',
            plan_step_3_en: 'Retry missed questions after two weeks',
            plan_step_weak_ar: 'تحديد نقاط الضعف من إجاباتك وربطها بموضوعات: {name}',
            plan_step_weak_en: 'Identify weak points from your answers and map them to: {name}',
            coach_lead_ar:
                'تحليل الجاهزية: مجموعك {total}/120 يضعك في المستوى الإجمالي «{band}». من أصل 20 معياراً: {w} ضعيف، {m} متوسط، {s} قوي.',
            coach_weakest_ar: 'أضعف النقاط حسب الدرجة: {list} — ركّز خطة المذاكرة عليها أولاً.',
            coach_weakest_en: 'Lowest scores: {list} — prioritize these in your study plan.',
            coach_no_weak_ar: 'لا توجد معايير بدرجة منخفضة جداً نسبياً؛ واصل التوازن بين المراجعة والتطبيق.',
            coach_no_weak_en: 'No very low relative scores; keep balancing depth and practice.',
            coach_bullets_ar:
                '<ul class="coach-bullets"><li>راجع الوحدات الضعيفة في صفحة «مصادر تعليمية» بالترتيب.</li><li>أعد اختبار الوحدة بعد كل مرحلة مراجعة.</li><li>اختبر الاختبار الكامل كل أسبوعين لقياس التحسن.</li></ul>',
            coach_bullets_en:
                '<ul class="coach-bullets"><li>Review weak units on the Resources page in order.</li><li>Retake the unit quiz after each review block.</li><li>Take the full test every two weeks to track progress.</li></ul>'
        },
        en: {
            nav_home: 'Home',
            nav_about: 'About the test',
            nav_programs: 'Programs',
            nav_domains: 'Readiness domains',
            nav_services: 'Services',
            nav_resources: 'Resources',
            nav_tests: 'Practice test',
            nav_team: 'About us',
            nav_faculty: 'Faculty',
            nav_contact: 'Contact',
            nav_account: 'Sign in / Register',
            nav_admin: 'Admin',
            admin_loading: 'Checking permissions…',
            admin_need_server: 'Run the site via the Flask server to use the admin panel.',
            admin_need_login: 'Sign in with an administrator account.',
            admin_forbidden_page: 'You do not have access to the admin panel.',
            admin_back_home: 'Home',
            admin_title: 'Admin dashboard',
            admin_subtitle: 'User and attempt statistics with full result details.',
            admin_refresh: 'Refresh',
            admin_demo_hint:
                'Demo accounts: admin admin@readyai.local — user demo@readyai.local',
            admin_kpi_title: 'Overview',
            admin_stat_users: 'Users',
            admin_stat_attempts: 'Attempts',
            admin_stat_full: 'Full test',
            admin_stat_unit: 'Unit',
            admin_stat_guest: 'Guest attempts',
            admin_dist_title: 'Score distribution (full test)',
            admin_dist_total_label: 'Full attempts count',
            admin_recent: 'Recent attempts',
            admin_users_title: 'Users',
            admin_attempts_title: 'All attempts',
            admin_filter_label: 'Filter',
            admin_filter_all: 'All',
            admin_filter_full: 'Full',
            admin_filter_unit: 'Unit',
            admin_search_placeholder: 'Search by email or name…',
            admin_search_btn: 'Search',
            admin_th_id: 'ID',
            admin_th_user: 'User',
            admin_th_mode: 'Mode',
            admin_th_score: 'Score',
            admin_th_date: 'Date',
            admin_th_detail: 'Details',
            admin_th_role: 'Role',
            admin_role_admin: 'Admin',
            admin_role_user: 'User',
            admin_load_more: 'Load more',
            admin_detail_title: 'Attempt details (JSON)',
            admin_close: 'Close',
            admin_guest: '(Guest)',
            admin_mode_full: 'Full',
            admin_mode_unit: 'Unit',
            admin_view_json: 'View JSON',
            admin_err_load: 'Could not load details.',
            admin_err_network: 'Could not load data. Check session or network.',
            auth_link_admin: 'Admin panel',
            badge_home: 'Graduation project — Northern Border University — College of Science, CS',
            badge_sub: 'Official educational platform — Northern Border University — College of Science, CS',
            footer_copy: 'Readiness test preparation platform © Northern Border University — College of Science, CS',
            lang_switch_en: 'English',
            lang_switch_ar: 'العربية',
            hero_title: 'Readiness test preparation platform',
            hero_desc:
                'An official student platform that helps computer science students assess readiness for employment or graduate studies. It explains twenty specialty standards, offers a 60-question trial test, and provides recommendations and improvement plans based on performance.',
            hero_start: 'Start now',
            hero_register: 'Create account',
            hero_pdf: 'Download test guide (PDF)',
            stat_standards: 'Specialty standards',
            stat_test: 'Self-assessment',
            stat_free: 'Free for students',
            services_title: 'Services',
            svc_tab: 'Student services',
            svc1_title: 'Readiness trial test',
            svc1_desc:
                'An online trial aligned with twenty specialty standards (three questions per standard with weights 1–2–3). You receive a detailed report with recommendations and an improvement plan.',
            svc2_title: 'Test guide',
            svc2_desc:
                'A guide covering test structure, how to sit the exam, and preparation tips, including learning resources by domain.',
            svc3_title: 'Standards & resources',
            svc3_desc:
                'Reference for the twenty computer science standards with links to recommended learning materials.',
            svc_tag: 'Student services',
            svc_btn_test: 'Start test',
            svc_btn_pdf: 'Download guide (PDF)',
            svc_btn_std: 'View standards',
            faq_section: 'FAQ',
            faq_badge: 'Support',
            faq_q1: 'What is the difference between this site’s trial test and the official readiness test?',
            faq_a1:
                'The trial here is for practice only: it is auto-scored and gives an instant report for preparation. The official standardized readiness test offered by the Education & Training Evaluation Commission (through its evaluation and training unit) follows official rules, timing, and procedures; official results are issued by the Commission, not by this website.',
            faq_q2: 'What is a readiness test in general?',
            faq_a2:
                'It measures how prepared graduates in targeted programs are for employment or further study, using academic and professional criteria across core knowledge areas.',
            faq_q3: 'Who is the official “Jahiziyah” test for? Is it limited to one graduation year?',
            faq_a3:
                'It targets students expected to graduate within the cohort announced for each cycle; it is not tied to a single graduation year forever — eligibility and dates are published in ETEC announcements. Always check the official student guide for the latest requirements.',
            faq_q4: 'How long does the on-site trial test take?',
            faq_a4:
                'The trial has 60 questions (three per standard across twenty standards). It often takes about 45–90 minutes depending on pace; completing it in one session is recommended.',
            faq_q5: 'What do I get after the trial test?',
            faq_a5:
                'A report with your score per standard (out of 6) and level (weak / intermediate / strong), total out of 120 with an overall band (0–40 weak, 41–80 intermediate, 81–120 strong), analysis, recommendations, and an improvement plan.',
            faq_q6: 'Can I retake the trial test?',
            faq_a6: 'Yes, you can retake it anytime to track progress after studying.',
            contact_section: 'Contact',
            contact_badge: 'Support',
            contact_desc:
                'For questions and technical support about this graduation project platform, use the contacts below. For official readiness test registration and schedules, refer to the Education & Training Evaluation Commission.',
            contact_team: 'Project team',
            contact_team_note: 'Technical support and questions about the trial platform',
            contact_tile_email: 'Email',
            contact_tile_wa: 'WhatsApp',
            contact_tile_etec: 'Official readiness test',
            contact_tile_univ: 'Academic affiliation',
            contact_univ: 'Northern Border University — College of Science — Computer Science Department',
            contact_etec: 'Official “Jahiziyah” test:',
            contact_etec_name: 'Education & Training Evaluation Commission (ETEC)',
            contact_wa_aria: 'Open WhatsApp',
            team_title: 'About us — Team',
            team_sub: 'Supervisors and student developers of the readiness preparation platform.',
            team_super: 'Academic supervision',
            team_super_name: 'Dr. Marwa Ammarah',
            team_super_desc: 'Northern Border University — Computer Science',
            team_dev: 'Development team',
            team_dev_desc: 'Computer Science students — graduation project',
            team_students: 'Computer Science students',
            resources_title: 'Learning resources',
            resources_intro:
                'Thirteen parts by SKU group: each part lists PDFs (and links where needed), then unit quizzes for the related standards (3 questions per standard).',
            resources_heading_pdf: 'PDF files & references',
            resources_heading_practice: 'Unit quiz after study',
            resources_unit_btn_n: 'Standard {n} quiz',
            resources_std_ids: 'Standards in this part: {list}',
            faculty_title: 'Faculty members',
            faculty_intro:
                'Computer Science faculty at the College of Science, Northern Border University (Arar). Data is synced from the official department listing; use Read more for full profile, email, phone, and photo on the university portal.',
            faculty_source_page: 'Department page on the university site',
            faculty_search_label: 'Search by faculty name',
            faculty_search_placeholder: 'Search by name (Arabic or English)…',
            faculty_search_btn: 'Search',
            faculty_read_more: 'Read more',
            faculty_no_results: 'No matching results.',
            standards_title: 'Programs & standards',
            standards_intro:
                'The twenty standards below match the topics listed under the readiness domains (algorithms, programming, networks, discrete math, computer architecture, etc.). For courses and instructors, see the Readiness domains page.',
            test_title: 'Trial readiness test',
            test_intro:
                '60 questions across 20 standards; each standard has three questions: easy (weight 1), medium (2), hard (3). Max 6 points per standard. Select an answer then press Next.',
            test_unit_intro: 'Unit quiz: three questions for this standard only (max score 6).',
            results_title: 'Results',
            results_total_label: 'Overall readiness (total score out of 120)',
            results_total_label_unit: 'Standard score (out of 6)',
            results_legend_title: 'Score to level (per standard, out of 6)',
            results_legend_total: 'Overall band (out of 120)',
            legend_total_weak: 'Weak',
            legend_total_med: 'Intermediate',
            legend_total_strong: 'Strong',
            results_peer_title: 'Anonymous comparison (this browser only)',
            results_peer_note:
                'Distribution of overall score bands without names. With the server, full attempts are stored in an anonymized aggregate database.',
            results_legend_note:
                'Per standard: one easy (weight 1) + one medium (2) + one hard (3); correct answers add the weight, incorrect add 0.',
            results_by_std: 'Results by standard',
            results_recs: 'Recommendations',
            results_plan: 'Improvement plan',
            results_retry: 'Retake test',
            results_standards: 'Standards',
            th_score: 'Score',
            th_level: 'Level',
            domains_title: 'Readiness domains',
            legend_row1: 'Weak',
            legend_row2: 'Intermediate',
            legend_row3: 'Strong',
            auth_title: 'Account',
            auth_tab_login: 'Sign in',
            auth_tab_register: 'Register',
            auth_tabs_hint:
                'Already have an account? Use Sign in. New here? Click Register and enter email, password, and optional name.',
            auth_tabs_aria: 'Sign in or register',
            auth_email: 'Email',
            auth_pass: 'Password',
            auth_name: 'Name (optional)',
            auth_submit_login: 'Sign in',
            auth_submit_register: 'Create account',
            auth_logout: 'Sign out',
            auth_note:
                'Note: credentials are stored only in this browser for demo purposes — not real server-side security.',
            auth_note_server:
                'Accounts are handled on the Flask + SQLite backend with a server session; do not share your password.',
            auth_logged_as: 'Hello,',
            auth_err_required: 'Enter email and password',
            auth_err_exists: 'This email is already registered',
            auth_err_badlogin: 'Invalid email or password',
            err_auth_required: 'You must sign in first.',
            err_admin_forbidden: 'You do not have permission to access this resource.',
            err_invalid_score: 'Invalid score.',
            err_not_found: 'Resource not found.',
            err_need_20_scores: 'At least 20 scores are required.',
            err_model_unavailable: 'The model is currently unavailable.',
            api_err_unknown: 'Unexpected error ({code}).',
            team_stu_1: 'Abrar Khaled Al-Humaidan — 202310220',
            team_stu_2: 'Shahad Humaidi Al-Ruwaili — 202309845',
            team_stu_3: 'Ariaf Al-Asoud Al-Anzi — 202308432',
            team_stu_4: 'Danah Hamoud Al-Kabsi — 202205457',
            team_stu_5: 'Razan Fayyad Al-Anzi — 202310894',
            results_ai_title: 'Machine learning analysis (RandomForest model)',
            test_btn_next: 'Next',
            test_select_first: 'Select an answer before continuing.',
            test_progress_q: 'Question',
            test_progress_of: 'of',
            test_standard_label: 'Standard:',
            test_weight_label: 'Weight',
            diff_easy: 'Easy',
            diff_medium: 'Medium',
            diff_hard: 'Hard',
            domains_intro:
                'Readiness domains and related courses, with instructors listed for each course.',
            domains_pdf_bar: 'Reference: readiness specialty domains (PDF)',
            domains_download: 'Download',
            domains_noscript: 'Enable JavaScript to view domains and courses.',
            domains_topic: 'Topic',
            domains_course: 'Course',
            domains_staff: 'Instructors',
            domains_placeholder: 'Updated from official records',
            file_download: 'Download',
            file_cs_title: 'Academic standards for Computer Science programs',
            file_cs_desc:
                'ETEC document (2025) defining minimum requirements and learning outcomes for CS bachelor graduates.',
            file_guide_title: 'Guidance for standardized graduate tests (Jahiziyah)',
            file_guide_desc:
                'Phase-two guidance for the Jahiziyah program: goals, targeted programs, cohorts, and test procedures.',
            file_student_title: 'Student guide — Jahiziyah 2026',
            file_student_desc:
                'Student-facing guide for 2026: schedules, standards, instructions, and platform access.',
            site_brand: 'Readiness test preparation platform',
            logo_subtitle: 'READINESS TEST PREPARATION PLATFORM',
            img_alt_nbu: 'Northern Border University',
            img_alt_site: 'Readiness test preparation platform',
            meta_title_home: 'Readiness test preparation — CS students',
            meta_title_standards: 'Programs & standards — Readiness platform',
            meta_title_domains: 'Readiness domains — Readiness platform',
            meta_title_resources: 'Learning resources — Readiness platform',
            meta_title_test: 'Trial readiness test — Readiness platform',
            meta_title_results: 'Results — Readiness platform',
            meta_title_team: 'About us — Readiness platform',
            meta_title_faculty: 'Faculty — Readiness platform',
            meta_title_auth: 'Account — Readiness platform',
            meta_title_admin: 'Admin — Readiness platform',
            about_badge: 'Discover our vision',
            about_section_title: 'Main test directions',
            about_c1_title: 'What the test is',
            about_c1_text:
                'The readiness test is a self-assessment of how prepared a computer science student is for the next step — entering the workforce or graduate programs. It is based on recognized academic and professional criteria covering core knowledge, programming, databases, networking and security, and AI.',
            about_c2_title: 'Why it matters for CS students',
            about_c2_text:
                'It highlights strengths and weaknesses before graduation so students can focus on skills employers expect. It also clarifies specialty standards and can improve hiring or graduate admission prospects.',
            about_c3_title: 'How the test is taken',
            about_c3_text:
                'The test is taken online on the platform: you answer questions covering the specialty standards and receive an immediate report with performance level, targeted recommendations, and an improvement plan.',
            files_section_title: 'Files & documents',
            svc1_sub: 'Readiness Test',
            svc2_sub: 'Test Guide',
            svc3_sub: 'Standards & Resources',
            standards_btn_domains: 'Readiness domains & courses',
            standards_btn_resources: 'Learning resources',
            svc_btn_test_full: 'Start full test',
            resources_unit_btn: 'Unit quiz (3 questions)',
            test_unit_badge: 'Unit test',
            test_no_questions: 'No questions for this standard.',
            results_bar_aria: 'Mastery bar by standard',
            results_peer_hist_aria: 'Histogram of score bands',
            results_sub_unit_en: 'Standard level: {en} (score out of 6).',
            results_sub_full_en:
                'Overall band: {en} — from total score bands: 0–40 weak, 41–80 intermediate, 81–120 strong.',
            ai_confidence_en: 'Estimated confidence:',
            peer_caption_en: 'Border highlights your band (score {n}/120)',
            rec_weak_en: 'Weak standard — focus review and practice on: {name}',
            rec_medium_en: 'Intermediate level — keep practicing to reach «strong».',
            rec_unit_good_title_en: 'Result',
            rec_unit_good_en: 'Strong performance on this unit quiz.',
            rec_summary_title_en: 'Summary',
            rec_summary_msg_en: 'No weak standards (0–2). Intermediate: {m}, strong: {s} out of 20.',
            plan_area_en: 'Area to strengthen:',
            plan_steps_en: 'Suggested plan:',
            plan_unit_medium_en:
                'Intermediate in this unit — review linked resources on the Resources page and retake the unit quiz after practice.',
            plan_unit_strong_en: 'Strong performance on this unit. Keep excelling and reviewing regularly.',
            plan_no_weak_en: 'No weak standards needing urgent focus. Keep excelling and reviewing regularly.',
            plan_medium_list_en: 'Intermediate standards (3–4): {names} — keep practicing to reach «strong».',
            plan_step_1_en: 'Review core concepts related to «{name}»',
            plan_step_2_en: 'Solve extra exercises from reliable sources',
            plan_step_3_en: 'Retry missed questions after two weeks',
            plan_step_weak_en: 'Identify weak points from your answers and map them to: {name}',
            coach_lead_en:
                'Readiness summary: your total {total}/120 places you in the overall band {band}. Across 20 standards: {w} weak, {m} intermediate, {s} strong.',
            coach_weakest_en: 'Lowest scores: {list} — prioritize these in your study plan.',
            coach_no_weak_en: 'No very low relative scores; keep balancing depth and practice.',
            coach_bullets_en:
                '<ul class="coach-bullets"><li>Review weak units on the Resources page in order.</li><li>Retake the unit quiz after each review block.</li><li>Take the full test every two weeks to track progress.</li></ul>'
        }
    };

    function getLang() {
        try {
            return localStorage.getItem(STORAGE_KEY) || 'ar';
        } catch (e) {
            return 'ar';
        }
    }

    function setLang(lang) {
        if (lang !== 'ar' && lang !== 'en') lang = 'ar';
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {}
        applyDocumentLang(lang);
        applyI18nStrings(lang);
        updateLangButtons(lang);
        try {
            window.dispatchEvent(new CustomEvent('site-lang-change', { detail: { lang: lang } }));
        } catch (e) {}
    }

    function applyDocumentLang(lang) {
        var html = document.documentElement;
        if (lang === 'en') {
            html.setAttribute('lang', 'en');
            html.setAttribute('dir', 'ltr');
            document.body.classList.add('lang-en');
            document.body.classList.remove('lang-ar');
        } else {
            html.setAttribute('lang', 'ar');
            html.setAttribute('dir', 'rtl');
            document.body.classList.add('lang-ar');
            document.body.classList.remove('lang-en');
        }
    }

    function applyI18nStrings(lang) {
        var dict = STR[lang] || STR.ar;
        var nodes = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            var key = el.getAttribute('data-i18n');
            if (key && dict[key]) {
                el.textContent = dict[key];
            }
        }
        var htmlNodes = document.querySelectorAll('[data-i18n-html]');
        for (var h = 0; h < htmlNodes.length; h++) {
            var hel = htmlNodes[h];
            var hkey = hel.getAttribute('data-i18n-html');
            if (hkey && dict[hkey]) {
                hel.innerHTML = dict[hkey];
            }
        }
        applyPageMeta(lang);
        applyI18nAttrs(lang);
    }

    function applyPageMeta(lang) {
        var dict = STR[lang] || STR.ar;
        if (document.body) {
            var tk = document.body.getAttribute('data-title-i18n');
            if (tk && dict[tk]) {
                document.title = dict[tk];
            }
        }
    }

    function applyI18nAttrs(lang) {
        var dict = STR[lang] || STR.ar;
        var i;
        var els = document.querySelectorAll('[data-i18n-title]');
        for (i = 0; i < els.length; i++) {
            var k = els[i].getAttribute('data-i18n-title');
            if (k && dict[k]) els[i].setAttribute('title', dict[k]);
        }
        els = document.querySelectorAll('[data-i18n-placeholder]');
        for (i = 0; i < els.length; i++) {
            var pk = els[i].getAttribute('data-i18n-placeholder');
            if (pk && dict[pk]) els[i].setAttribute('placeholder', dict[pk]);
        }
        els = document.querySelectorAll('[data-i18n-alt]');
        for (i = 0; i < els.length; i++) {
            var ak = els[i].getAttribute('data-i18n-alt');
            if (ak && dict[ak]) els[i].setAttribute('alt', dict[ak]);
        }
        els = document.querySelectorAll('[data-i18n-aria-label]');
        for (i = 0; i < els.length; i++) {
            var rk = els[i].getAttribute('data-i18n-aria-label');
            if (rk && dict[rk]) els[i].setAttribute('aria-label', dict[rk]);
        }
    }

    function updateLangButtons(lang) {
        var dict = STR[lang] || STR.ar;
        var btns = document.querySelectorAll('[data-lang-toggle]');
        for (var b = 0; b < btns.length; b++) {
            btns[b].textContent = lang === 'ar' ? dict.lang_switch_en : dict.lang_switch_ar;
            btns[b].setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
        }
    }

    function initI18n() {
        var lang = getLang();
        applyDocumentLang(lang);
        applyI18nStrings(lang);
        updateLangButtons(lang);

        document.addEventListener('click', function (e) {
            var t = e.target.closest('[data-lang-toggle]');
            if (!t) return;
            e.preventDefault();
            var next = getLang() === 'ar' ? 'en' : 'ar';
            setLang(next);
        });
    }

    window.SITE_I18N = {
        init: initI18n,
        getLang: getLang,
        setLang: setLang,
        t: function (key) {
            var lang = getLang();
            return (STR[lang] && STR[lang][key]) || (STR.ar && STR.ar[key]) || key;
        },
        tf: function (key, vars) {
            var s = this.t(key);
            if (vars && typeof vars === 'object') {
                for (var k in vars) {
                    if (Object.prototype.hasOwnProperty.call(vars, k)) {
                        s = s.split('{' + k + '}').join(String(vars[k]));
                    }
                }
            }
            return s;
        },
        apiErr: function (code) {
            if (!code) return this.tf('api_err_unknown', { code: '' });
            var k = 'err_' + code;
            var lang = getLang();
            var s = (STR[lang] && STR[lang][k]) || (STR.ar && STR.ar[k]);
            if (s) return s;
            if ((STR[lang] && STR[lang][code]) || (STR.ar && STR.ar[code])) {
                return this.t(code);
            }
            return this.tf('api_err_unknown', { code: String(code) });
        },
        STR: STR
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18n);
    } else {
        initI18n();
    }
})();
