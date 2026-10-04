/**
 * اختبار الجاهزية: 20 معياراً، 60 سؤالاً (سهل=1، متوسط=2، صعب=3) لكل معيار من 6 درجات كحد أقصى.
 * مستوى كل معيار: 0–2 ضعيف، 3–4 متوسط، 5–6 قوي.
 * المستوى الإجمالي (اختبار كامل /120): 0–40 ضعيف، 41–80 متوسط، 81–120 قوي — يُطبَّق في test.js/results.
 * الأسئلة: exam-pdf-bank.js (إنجليزي) + exam-questions-ar.js (عربي)؛ فهرس الإجابة الصحيحة يطابق server/data/exam_bank_correct.json
 */
var TEST_DATA = (function() {
    var standards = [
        { id: 1, nameEn: 'Basic Analysis and Algorithmic Methods', nameAr: 'التحليل الأساسي والطرق الخوارزمية' },
        { id: 2, nameEn: 'Algorithms, Design, and Development', nameAr: 'الخوارزميات والتصميم والتطوير' },
        { id: 3, nameEn: 'Program Representation, Language, and Interpretation', nameAr: 'تمثيل البرنامج واللغة والتفسير' },
        { id: 4, nameEn: 'Fundamental Programming Concepts', nameAr: 'مفاهيم البرمجة الأساسية' },
        { id: 5, nameEn: 'Basic Type Systems', nameAr: 'أنظمة الأنواع الأساسية' },
        { id: 6, nameEn: 'Object-Oriented Programming', nameAr: 'البرمجة الشيئية' },
        { id: 7, nameEn: 'Fundamentals of Data Structures', nameAr: 'أساسيات هياكل البيانات' },
        { id: 8, nameEn: 'Database Systems and Data Models', nameAr: 'أنظمة قواعد البيانات ونماذج البيانات' },
        { id: 9, nameEn: 'Software Design, Construction, and Verification', nameAr: 'تصميم البرمجيات والبناء والتحقق' },
        { id: 10, nameEn: 'Software Processes, Software Management', nameAr: 'عمليات البرمجيات وإدارتها' },
        { id: 11, nameEn: 'Concurrency, Scheduling, Dispatch', nameAr: 'التزامن والجدولة والإرسال' },
        { id: 12, nameEn: 'Operating System Principles', nameAr: 'مبادئ أنظمة التشغيل' },
        { id: 13, nameEn: 'Reliable Data Delivery, Routing, and Networking', nameAr: 'تسليم البيانات والتوجيه والشبكات' },
        { id: 14, nameEn: 'Introduction to Networking and Communication', nameAr: 'مقدمة في الشبكات والاتصال' },
        { id: 15, nameEn: 'Graphs, Trees, and Discrete Probability', nameAr: 'الرسوم البيانية والأشجار والاحتمال المنفصل' },
        { id: 16, nameEn: 'Proof Techniques and Basics of Computation', nameAr: 'تقنيات البرهان وأساسيات الحوسبة' },
        { id: 17, nameEn: 'Basic Logic, Sets, Relations, and Functions', nameAr: 'المنطق والمجموعات والعلاقات والدوال' },
        { id: 18, nameEn: 'Machine Organization on the Basis of Architecture', nameAr: 'تنظيم الآلة وفق المعمارية' },
        { id: 19, nameEn: 'Architecture of Memory Systems', nameAr: 'معمارية أنظمة الذاكرة' },
        { id: 20, nameEn: 'Digital Logic, Digital Systems', nameAr: 'المنطق الرقمي والأنظمة الرقمية' }
    ];

    var bankEn =
        typeof PDF_EXAM_BANK !== 'undefined' && PDF_EXAM_BANK.length === 20 ? PDF_EXAM_BANK : null;
    var bankAr =
        typeof QUESTION_BANK_AR !== 'undefined' && QUESTION_BANK_AR.length === 20 ? QUESTION_BANK_AR : null;

    var questions = [];
    var qid = 1;
    var diffs = [{ d: 'easy', w: 1 }, { d: 'medium', w: 2 }, { d: 'hard', w: 3 }];

    if (bankEn) {
        for (var s = 0; s < standards.length; s++) {
            var sid = standards[s].id;
            for (var k = 0; k < 3; k++) {
                var en = bankEn[s][k];
                var arItem = bankAr ? bankAr[s][k] : null;
                var tAr = arItem ? arItem.t : en.t;
                var oAr = arItem ? arItem.o : en.o;
                questions.push({
                    id: qid++,
                    standardId: sid,
                    difficulty: diffs[k].d,
                    weight: diffs[k].w,
                    text: tAr,
                    textAr: tAr,
                    textEn: en.t,
                    options: oAr,
                    optionsAr: oAr,
                    optionsEn: en.o,
                    correct: en.c
                });
            }
        }
    }

    return { standards: standards, questions: questions };
})();
