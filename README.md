# منصة الاستعداد لاختبار الجاهزية (ReadyAI)

موقع عربي وإنجليزي لطلاب علوم الحاسب: 20 معيار جاهزية، اختبار 60 سؤالاً، نتائج وتوصيات، مع خادم Flask وSQLite اختياري ونموذج RandomForest.

## 1 ما هو المشروع

المنصة تعرّف الطالب بمعايير الجاهزية وتتيح اختباراً كاملاً أو اختبار معيار واحد (`test.html?unit=N` بثلاثة أسئلة). بدون خادم تُحسب النتيجة في المتصفح وتُحفظ محلياً. مع الخادم تُحفظ الحسابات والمحاولات وتُحسب الدرجات على الخادم ويُستدعى تحليل تعلّم آلي عند توفر النموذج.

الملف `RANDOM_FOREST.md` يوثّق النموذج بجانب هذا الدليل. لقطات الواجهة في `image/README/`.

## 2 لماذا بُني

مساعدة طالب علوم الحاسب على معرفة نقاط القوة والضعف حسب المعيار، بخطة تحسين بعد الاختبار. الواجهة الثابتة تتيح التجربة بلا تثبيت، والخادم يضيف حسابات ولوحة إدارة.

## 3 من يستخدمه

| الشخص | الصلاحية |
| --- | --- |
| طالب | معايير، اختبار، نتائج، مصادر، أعضاء هيئة تدريس |
| مستخدم مسجّل | محاولات مرتبطة بحساب عند تشغيل Flask |
| مسؤول `is_admin = 1` | `pages/admin.html` |
| مطوّر | تدريب النموذج وتعديل بنك الأسئلة |

حسابات التجربة المحلية من `server/db.py` موثّقة أدناه. غيّرها خارج جهازك الشخصي.

## 4 الميزات

- 20 معياراً في `assets/js/data.js` وصفحات `standards.html` و`domains.html`.
- 60 سؤالاً، ثلاثة لكل معيار بدرجات صعوبة `easy` و`medium` و`hard` وأوزان 1 إلى 3.
- لغة عربية وإنجليزية عبر `i18n.js` مع `rtl` و`ltr`.
- نتائج وتوصيات وخطط وكتلة مدرّب عند توفر بيانات، ورسم أقران.
- مصادر SKU: 13 قسماً في `sources-local.js`.
- أعضاء هيئة تدريس في `faculty-data.js`.
- تسجيل ودخول Flask، ووضع احتياطي محلي في `auth.js`.
- لوحة إدارة للملخص والمستخدمين والمحاولات.
- ملفات PDF تحت `assets/files/` ومنها مصادر `assets/files/sources/`.

## 5 سير العمل

```
تصفح المعايير والمصادر
    |
    v
test.html  (كامل أو ?unit=N)
    |
    +-- Flask يعمل وUSE_FLASK_API -> POST /api/exam/submit
    |       حساب من exam_bank_correct.json + ML + حفظ attempts
    |
    +-- غير ذلك -> buildLocalAttempt() في المتصفح
    v
results.html يقرأ readiness_last_result
```

## 6 أمثلة حقيقية

1. طالب يفتح `pages/test.html` ويجيب 60 سؤالاً ثم `results.html`. بلا خادم تُحسب النتيجة محلياً.
2. التركيز على معيار: `test.html?unit=5` يعرض 3 أسئلة للمعيار 5.
3. حساب كامل: تشغيل Flask ثم `pages/auth.html` أو `auth.html?register=1`.
4. تبديل اللغة يخزّن `site_lang` ويعيد رسم النصوص ذات `data-i18n`.

مجموع الاختبار الكامل في الواجهة المحلية حتى 120 (وزن الأسئلة). وضع الوحدة حتى 6. مستويات الخادم لكل معيار: 0-2 ضعيف، 3-4 متوسط، 5-6 قوي. المجموع الكامل: 0-40 و41-80 و81-120.

## 7 رحلة المستخدم

1. الصفحة الرئيسية تعرض ملفات PDF وروابط الأقسام.
2. يقرأ معياراً أو مجالاً أو مصدراً أو عضواً من هيئة التدريس.
3. يبدأ الاختبار وتتبع الإجابات في كائن `{ questionId: optionIndex }`.
4. التسليم إما يعيد توجيه ناتج الخادم أو يحفظ محاولة محلية.
5. صفحة النتائج تعرض المجموع والأشرطة والتوصيات.
6. المسؤول يرى رابط الإدارة بعد `GET /api/auth/me` إذا `is_admin`.

## 8 الوحدات

| المسار | الدور |
| --- | --- |
| `index.html` | الرئيسية |
| `pages/standards.html` | المعايير |
| `pages/domains.html` | المجالات |
| `pages/resources.html` | مصادر SKU |
| `pages/test.html` | الاختبار |
| `pages/results.html` | النتائج |
| `pages/faculty.html` | أعضاء الهيئة |
| `pages/team.html` | فريق المشروع |
| `pages/auth.html` | دخول وتسجيل |
| `pages/admin.html` | الإدارة |
| `assets/js/*` | منطق الواجهة والبيانات |
| `assets/css/style.css` | التنسيق والاتجاهان |
| `server/app.py` | Flask |
| `server/db.py` | SQLite وبذور الحسابات |
| `server/config.py` | المسارات و`SECRET_KEY` و`DB_PATH` |
| `server/ml/train_model.py` | تدريب RandomForest |
| `server/ml/predict.py` | التوقع من التطبيق |
| `server/data/exam_bank_correct.json` | 60 فهرس إجابة من 0 إلى 3 |

## 9 الكيانات

| الجدول | المحتوى |
| --- | --- |
| users | بريد، تجزئة كلمة المرور، اسم، `is_admin` |
| attempts | مستخدم، نمط `full` أو `unit`، معرّف وحدة، درجات، `payload_json` |

كيانات الواجهة: معيار `{id, nameAr, nameEn}`، سؤال فيه `textAr` و`textEn` وخيارات وفهرس `correct`، قسم مصدر SKU، عضو هيئة تدريس.

قاعدة الملف: `server/instance/readiness.db` وتُنشأ عند `init_db()`.

## 10 الصلاحيات

| الحالة | القدرة |
| --- | --- |
| زائر بلا Flask | اختبار محلي |
| مستخدم `is_admin = 0` | حساب ومحاولاته |
| مسؤول | مسارات `/api/admin/*` المزينة بـ `admin_only` |
| غير مسؤول على الإدارة | `admin_forbidden` |

## 11 الأتمتة

`@app.before_request` يستدعي `init_db()` لمسارات `/api/`. بذور `DEFAULT_ACCOUNTS` تُنشئ أو تحدّث الحسابين عند التهيئة حتى تطابق كلمات README. لا cron. تدريب النموذج خطوة يدوية.

## 12 التكامل

الواجهة تتحدث إلى Flask عبر `ReadyAPI` في `api.js` مع `credentials: 'same-origin'`. `assets/js/config.js` يحدد `USE_FLASK_API` و`API_BASE`. عند إيقاف العلم تتجاوز `test.js` و`auth.js` الخادم.

## 13 المصطلحات

| المصطلح | المعنى هنا |
| --- | --- |
| SKU | تجميعة مصادر مرتبطة بمعايير |
| i18n | نصوص `STR.ar` و`STR.en` |
| RandomForest | نموذج أشجار في scikit-learn يُحفظ joblib |
| unit | اختبار معيار واحد |
| payload_json | تفاصيل المحاولة المخزنة |

## 14 الأسئلة الشائعة

| السؤال | الجواب |
| --- | --- |
| هل يعمل بلا بايثون؟ | التصفح والاختبار المحلي يعملان. `/api` لا يعمل |
| لماذا 401 رغم أن `/api/auth/me` يعيد 200؟ | 200 قد يعني `{"user": null}`. 401 مع `auth_err_badlogin` يعني عدم تطابق البريد أو الكلمة |
| أين أعدّل الأسئلة؟ | `exam-pdf-bank.js` و`exam-questions-ar.js` و`exam_bank_correct.json` معاً |
| ما إصدار بايثون؟ | يُفضَّل 3.10.6 أو سلسلة 3.10 لتوافق `requirements.txt` |

## 15 البنية المعمارية

```
[المتصفح HTML/CSS/JS]
    | localStorage
    | fetch /api  (إن فُعّل)
    v
[Flask app.py : المنفذ 5000 على 0.0.0.0]
    |-- SQLite server/instance/readiness.db
    |-- exam_bank_correct.json
    +-- ml/predict.py + models/readiness_model.joblib
```

فتح المتصفح الموثّق: `http://127.0.0.1:5000/`. الخادم في الكود يستمع على `0.0.0.0` والمنفذ 5000 مع `debug=True`.

## 16 التقنيات

الواجهة: HTML5 وCSS3 وJavaScript. الخادم: Python وFlask وWerkzeug (تجزئة كلمات المرور) وSQLite وNumPy وscikit-learn وjoblib. الخط IBM Plex Sans Arabic. لا إطار واجهة.

`server/requirements.txt`: flask>=3.0.0، werkzeug>=3.0.0، numpy>=1.24.0، scikit-learn>=1.3.0، joblib>=1.3.0.

## 17 شجرة الملفات

```
ReadyAI/
├── index.html
├── README.md
├── RANDOM_FOREST.md
├── pages/          (standards, domains, resources, test, results,
│                    faculty, team, auth, admin)
├── assets/
│   ├── css/style.css
│   ├── js/         (config, api, i18n, data, test, results, auth, admin, ...)
│   ├── files/      (PDF وsources)
│   ├── fonts/
│   └── images/
├── image/README/   (لقطات)
└── server/
    ├── app.py
    ├── config.py
    ├── db.py
    ├── requirements.txt
    ├── data/exam_bank_correct.json
    ├── instance/readiness.db
    ├── ml/train_model.py
    ├── ml/predict.py
    └── models/readiness_model.joblib
```

## 18 الواجهة الأمامية

`i18n.js` يطبّق `lang` و`dir` وأصناف `body.lang-ar` و`body.lang-en` ويحدّث `data-i18n` وما يتصل به من placeholder وtitle وalt. `test.js` يرشّح الأسئلة عند `unit`. `results.js` يرسم من `readiness_last_result`. `nav-admin.js` يضيف رابط الإدارة. `files-loader.js` يعرض ملفات الرئيسية من `files-data.js`.

مفاتيح التخزين المحلي:

| المفتاح | الاستخدام |
| --- | --- |
| site_lang | ar أو en |
| readiness_last_result | آخر محاولة |
| readiness_attempts | تاريخ محدود من `test.js` |
| جلسة Flask | كوكي بعد الدخول |

## 19 الخادم

`ROOT` في الإعداد هو أب مجلد `server`. `EXAM_CORRECT_PATH` يشير إلى JSON الإجابات. `SECRET_KEY` للجلسات موجود في `config.py` ويُستبدل في الإنتاج. لا تُنسخ قيمته هنا.

`compute_exam_from_answers` يطابق مفاتيح الإجابات مع مصفوفة طولها 60. `ml_analyze_and_plan` يعيد نطاقاً ونصوص خطط بالعربية والإنجليزية عند وجود النموذج.

## 20 تدفق الطلب

1. المتصفح يطلب `/` أو `/index.html` أو `/pages/...` أو `/assets/...`.
2. `POST /api/auth/register` أو `login` ينشئ جلسة.
3. `POST /api/exam/submit` يستقبل الإجابات و`mode` و`unit_id` ويخزّن المحاولة.
4. `GET /api/stats/peer-distribution` للإحصاء.
5. مسارات الإدارة ترفض غير المسؤول.

أخطاء شائعة تُترجم في الواجهة: `auth_err_required`، `auth_err_badlogin`، `auth_err_exists`، `admin_forbidden`، `invalid_score`، `not_found`. الطلبات JSON وفيها غالباً `ok`.

## 21 قاعدة البيانات

SQLite ملف واحد. `init_db()` ينشئ المجلد والجداول وترحيلات خفيفة مثل عمود `is_admin`.

بذور `DEFAULT_ACCOUNTS` (تجربة محلية، كلمات Werkzeug لا تُخزَّن كنص):

| البريد | كلمة المرور | الاسم | is_admin |
| --- | --- | --- | --- |
| admin@readyai.local | ! | مسؤول النظام | 1 |
| demo@readyai.local |  | مستخدم تجريبي | 0 |

عند كل تشغيل تُحدَّث هذه العناوين لتطابق البذرة. في إنتاج حقيقي غيّر الكلمات أو عطّل البذور واستبدل `SECRET_KEY`.

## 22 نقاط النهاية

| الطريقة | المسار | الوظيفة |
| --- | --- | --- |
| GET | `/` و`/index.html` | الرئيسية |
| GET | `/pages/<filename>` | صفحات HTML |
| GET | `/assets/<path>` | أصول |
| GET | `/api/health` | فحص |
| POST | `/api/auth/register` | تسجيل وجلسة |
| POST | `/api/auth/login` | دخول |
| POST | `/api/auth/logout` | إنهاء الجلسة |
| GET | `/api/auth/me` | المستخدم أو `user: null` |
| POST | `/api/exam/submit` | تصحيح وتخزين وتحليل |
| GET | `/api/stats/peer-distribution` | توزيع الأقران |
| POST | `/api/ml/analyze` | تحليل من 20 درجة |
| GET | `/api/admin/summary` | ملخص |
| GET | `/api/admin/users` | مستخدمون |
| GET | `/api/admin/attempts` | محاولات |
| GET | `/api/admin/attempt/<id>` | تفاصيل |

## 23 المصادقة

جلسة Flask عبر كوكي بعد الدخول أو التسجيل. كلمات المرور تُتحقق بتجزئة Werkzeug. الواجهة ترسل الاعتماد لنفس الأصل. وضع `USE_FLASK_API === false` يخزّن تجربة محلية في المتصفح فقط.

قصّ المسافات الزائدة عن كلمة المرور موثّق في الخادم. أعد تشغيل Flask بعد تعديل البذور، أو احذف `readiness.db` لبداية نظيفة.

## 24 الأمان

- حسابات البذرة معروفة ومخصصة للتطوير.
- `app.run(..., debug=True)` في نهاية `app.py`.
- `SECRET_KEY` في الملف يجب استبداله للنشر.
- لوحة الإدارة محمية بالجلسة وعلم المسؤول لا بإخفاء الرابط فقط.
- بنك الإجابات الصحيحة ملف على الخادم. الواجهة أيضاً تحمل فهرس `correct` داخل بيانات الأسئلة للوضع المحلي.

## 25 الإعدادات

```
window.USE_FLASK_API = true أو false
window.API_BASE = ''
```

`API_BASE` بادئة إذا كان الخادم على نطاق أو منفذ آخر. `DB_PATH` من `config.py` إلى `server/instance/readiness.db`.

## 26 التكاملات الخارجية

روابط ملفات أعضاء هيئة التدريس قد تشير إلى بوابة الجامعة من `faculty-data.js`. لا بوابة دفع ولا بريد في الكود المفحوص. الخط محلي.

## 27 المهام المجدولة

غير موجود في الملفات الحالية.

## 28 الملفات والتخزين

PDF للمعايير والمصادر تحت `assets/files/`. النموذج المدرَّب `server/models/readiness_model.joblib` موجود بعد التدريب. قاعدة SQLite تحت `instance/`. لقطات التوثيق في `image/README/`.

## 29 السجلات

وضع debug في Flask يطبع تتبع الاستثناءات في الطرفية أثناء التطوير. لا مجلد logs مخصص.

## 30 التثبيت

واجهة فقط: افتح الملفات أو أي خادم ثابت، مع `USE_FLASK_API` بقيمة false إذا لم يوجد API.

تشغيل كامل من مجلد `server`:

```
pip install -r requirements.txt
python ml/train_model.py
python app.py
```

ثم `http://127.0.0.1:5000/`. على Windows يُفضَّل مثبّت Python 3.10.6 مع إضافته إلى PATH. التوثيق السابق يوضح أن شرح التشغيل لا يشترط بيئة بايثون معزولة.

تدريب النموذج يُنشئ `readiness_model.joblib` عند النجاح. الملف موجود حالياً تحت `server/models/`.

## 31 دليل المطور

- تعديل الأسئلة يتطلب البنكين وJSON الإجابات.
- أسماء المعايير في `data.js` ويُفضَّل مواءمة `STANDARDS_AR` و`STANDARDS_EN` في `app.py`.
- لا تثبت `direction: rtl` على `body` بلا شرط حتى يبقى التبديل إلى LTR.
- روابط الصفحات الفرعية إلى الرئيسية: `../index.html`.
- قائمة الهيئة تُعدَّل في `faculty-data.js`.
- تفاصيل النموذج في `RANDOM_FOREST.md`.

## 32 النشر

شغّل Flask خلف خادم إنتاج بدل `debug=True`، على المنفذ الذي تضبطه البيئة إن نُقل التشغيل. قدّم الملفات الثابتة من نفس التطبيق كما يفعل `app.py` الآن أو من خادم ملفات مع `API_BASE`. استبدل المفتاح السري وعطّل بذور الحسابات. غير موثق منصة نشر محددة في الملفات.

## 33 النسخ الاحتياطي

انسخ `server/instance/readiness.db` و`server/models/readiness_model.joblib` و`server/data/exam_bank_correct.json` و`assets/files/`. حذف ملف القاعدة يعيد إنشاء البذور عند التشغيل التالي.

## 34 استكشاف الأخطاء

| العرض | المعالجة الموثقة |
| --- | --- |
| 401 عند الدخول | طابق الجدول حرفياً، أعد التشغيل، أو احذف ملف القاعدة |
| `/api/auth/me` بلا مستخدم | لا جلسة بعد |
| نتائج بلا تحليل آلي | النموذج غير محمّل أو فشل `predict.py` |
| لغة لا تتبدل | `site_lang` وحدث `site-lang-change` |
| API لا يُستدعى | `USE_FLASK_API` أو `API_BASE` أو فتح file:// |

## 35 الاعتماديات

حزم `requirements.txt`. المتصفح لـ localStorage وfetch. لا `package.json` في الجذر.

## 36 القيود

- وضع التصحيح مفتوح في أمر التشغيل المباشر.
- حسابات افتراضية تُعاد كتابتها عند التهيئة.
- الوضع المحلي يصحح من بيانات الأسئلة داخل JavaScript.
- المحتوى الأكاديمي (20 معياراً و60 سؤالاً) ثابت في الملفات لا في لوحة تحرير.

## 37 الحالة الحالية

الواجهة والخادم وقاعدة SQLite والنموذج المدرَّب وملفات PDF موجودة. حقائق README السابق عن المسارات والحسابات والـ 20 معياراً والـ 60 سؤالاً ما زالت مطابقة للكود، مع هذه الفروقات:

| البند | التفصيل |
| --- | --- |
| عنوان الاستماع | الكود `0.0.0.0:5000` والرابط الموثق للمتصفح `127.0.0.1:5000` |
| debug | `debug=True` في `app.run` |
| ملف النموذج | `server/models/readiness_model.joblib` موجود في المجلد |

## 38 القرارات

- واجهة ثابتة تعمل وحدها، وخادم اختياري.
- تصحيح الخادم من `exam_bank_correct.json` وليس من فهرس الواجهة فقط.
- جلسة كوكي لا رمز في الترويسة.
- لوحة إدارة بعلم `is_admin`.
- تحليل RandomForest إضافي بعد الدرجة لا بديلاً عن التصحيح.

## 39 سجل التغييرات

غير موثق رقم إصدار للمنصة. آخر وصف سابق للتوثيق كان يعكس: 20 معياراً، 60 سؤالاً، Flask، i18n، مصادر SKU، صفحة الهيئة، التسجيل، ولوحة الإدارة. هذا الملف يبقي تلك الحقائق.

## System Overview

منصة استعداد لاختبار جاهزية علوم الحاسب. الطالب يتدرب على 60 سؤالاً موزعة على 20 معياراً ويرى نتيجة بالعربية أو الإنجليزية. تشغيل Flask يضيف حسابات وتخزين محاولات وتصحيحاً على الخادم وتحليلاً آلياً ولوحة للمسؤول.

## Quick Reference

| البند | القيمة |
| --- | --- |
| التشغيل | `python app.py` داخل `server` |
| الرابط | http://127.0.0.1:5000/ |
| القاعدة | `server/instance/readiness.db` |
| مسؤول التجربة | admin@readyai.local |
| مستخدم التجربة | demo@readyai.local /  |
| أسئلة الكامل | 60 |
| معيار واحد | 3 عبر `?unit=N` |
| العلم | `USE_FLASK_API` في `assets/js/config.js` |

## Quick Start

```
cd server
pip install -r requirements.txt
python ml/train_model.py
python app.py
```

افتح http://127.0.0.1:5000/ ثم `pages/auth.html` وجرب الحساب التجريبي، أو ادخل الاختبار مباشرة.

## For Non-Technical Users

الموقع يشرح معايير الجاهزية ويعطيك اختباراً تجريبياً ثم نتيجة لكل معيار مع توصيات. يمكنك تجربة الاختبار من المتصفح. إنشاء حساب وحفظ المحاولات عند المدرّس أو على جهاز مشترك يحتاج أن يكون برنامج الخادم شغالاً. حساب المدير وحساب التجربة للتدريب على الجهاز فقط.

## For Developers

عدّل بنوك الأسئلة الثلاثة معاً. لا تثبّت اتجاه CSS على الجسم. استبدل مفتاح الجلسة وأوقف debug وبذور كلمات المرور قبل أي جهاز يصل إليه طلاب حقيقيون. شرح النموذج يبقى في `RANDOM_FOREST.md`.
