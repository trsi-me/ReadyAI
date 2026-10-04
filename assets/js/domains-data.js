/**
 * مجالات اختبار الجاهزية — المقررات وأسماء أعضاء هيئة التدريس.
 */
const DOMAIN_AREAS = [
    {
        titleAr: 'الخوارزميات',
        titleEn: 'Algorithms',
        blurbAr:
            'مفاهيم أساسية في تحليل الخوارزميات، بما في ذلك التعقيد الزمني والمساحي وتدوين كب-O واستراتيجيات التحسين. مثال: تحليل تعقيد زمن فرز سريع.',
        blurbEn:
            'Fundamental concepts in analyzing algorithms, including time and space complexity, Big O notation, and optimization strategies. Example: Analyzing the time complexity of a sorting algorithm like QuickSort.',
        courses: [
            {
                topicEn: 'Basic Analysis and Algorithmic Methods',
                courseAr: 'الخوارزميات',
                instructors: ['سيد رشاد فاروق عبدالله', 'مروى بلقاسم', 'اسراء السياط']
            },
            {
                topicEn: 'Algorithms, Design, and Development',
                courseAr: 'الخوارزميات',
                instructors: ['سيد رشاد فاروق عبدالله', 'مروى بلقاسم', 'اسراء السياط']
            }
        ]
    },
    {
        titleAr: 'البرمجة',
        titleEn: 'Programming',
        blurbAr:
            'مفاهيم أساسية في لغات البرمجة والأنماط وتمثيل البرامج. مثال: تفسير الصياغة والدلالات في مقررات مقدمة في البرمجة.',
        blurbEn:
            'Fundamental concepts in programming languages, paradigms, and program representation. Example: Interpreting syntax and semantics in introductory programming courses.',
        courses: [
            {
                topicEn: 'Program Representation, Language, and Interpretation',
                courseAr: 'مقدمة في البرمجة',
                instructors: ['سيد رشاد لافي العنزي', 'شمس السلامي', 'رندا اللافي']
            },
            {
                topicEn: 'Fundamental Programming Concepts',
                courseAr: 'مقدمة في البرمجة',
                instructors: ['سيد رشاد سامي العنزي', 'ايمان حموده', 'عائدة الصغير']
            },
            {
                topicEn: 'Basic Type Systems',
                courseAr: 'مقدمة في البرمجة',
                instructors: ['سيد رشاد نافع العنزي', 'ايمان حموده', 'عائدة الصغير']
            }
        ]
    },
    {
        titleAr: 'البرمجة الشيئية',
        titleEn: 'Object-oriented programming',
        blurbAr: 'مفاهيم كائنية التوجه تشمل التغليف والوراثة وتعدد الأشكال وتطبيقها على تصميم برمجيات واقعية.',
        blurbEn:
            'Object-oriented concepts including encapsulation, inheritance, and polymorphism applied to real-world software design.',
        courses: [
            {
                topicEn: 'Object-Oriented Programming',
                courseAr: 'البرمجة الشيئية',
                instructors: ['دانش منظور', 'شمس السلامي']
            }
        ]
    },
    {
        titleAr: 'هياكل البيانات',
        titleEn: 'Data structures',
        blurbAr: 'مفاهيم أساسية في القوائم والأشجار والرسوم وأنواع البيانات المجردة مع التركيز على التعقيد والاستخدام.',
        blurbEn:
            'Fundamental concepts in lists, trees, graphs, and abstract data types with emphasis on complexity and usage.',
        courses: [
            {
                topicEn: 'Fundamentals of Data Structures',
                courseAr: 'هياكل البيانات',
                instructors: ['دانش منظور', 'اشرف ميلاد', 'ايمان حموده']
            }
        ]
    },
    {
        titleAr: 'قواعد البيانات',
        titleEn: 'Databases',
        blurbAr: 'مفاهيم أساسية في النماذج العلائقية والمخططات وتخزين البيانات بما يتوافق مع أنظمة حديثة.',
        blurbEn:
            'Fundamental concepts in relational models, schemas, and data storage aligned with modern database systems.',
        courses: [
            {
                topicEn: 'Database Systems and Data Models',
                courseAr: 'مقدمة في قاعدة البيانات',
                instructors: ['محمد رافي السعيد مشاحيت', 'أسماء الهشمي']
            }
        ]
    },
    {
        titleAr: 'هندسة البرمجيات',
        titleEn: 'Software engineering',
        blurbAr: 'عمليات تصميم البرمجيات وممارسات البناء والتحقق وإدارة دورة الحياة في سياقات مهنية.',
        blurbEn:
            'Software design processes, construction practices, verification, and lifecycle management in professional contexts.',
        courses: [
            {
                topicEn: 'Software Design, Construction, and Verification',
                courseAr: 'هندسة البرمجيات',
                instructors: ['نواز ماجد', 'وعد الدندني', 'اسراء السياط']
            },
            {
                topicEn: 'Software Processes, Software Management',
                courseAr: 'هندسة البرمجيات',
                instructors: ['ماجد نواز', 'شوقي عباد', 'وعد الدندني', 'اسراء السياط']
            }
        ]
    },
    {
        titleAr: 'أنظمة التشغيل',
        titleEn: 'Operating systems',
        blurbAr: 'مفاهيم أساسية في جدولة العمليات والتزامن ومبادئ أنظمة التشغيل.',
        blurbEn:
            'Fundamental concepts in process scheduling, concurrency, and core operating-system principles.',
        courses: [
            {
                topicEn: 'Concurrency, Scheduling, Dispatch',
                courseAr: 'أنظمة التشغيل',
                instructors: ['أبو طه زماني', 'جمال خميس', 'سناء بخيت']
            },
            {
                topicEn: 'Operating System Principles',
                courseAr: 'أنظمة التشغيل',
                instructors: ['أبو طه زماني', 'جمال خميس', 'سناء بخيت']
            }
        ]
    },
    {
        titleAr: 'الشبكات',
        titleEn: 'Networking',
        blurbAr: 'مفاهيم أساسية في التسليم الموثوق والتوجيه وبروتوكولات الاتصال في الأنظمة الشبكية.',
        blurbEn:
            'Fundamental concepts in reliable delivery, routing, and communication protocols in networked systems.',
        courses: [
            {
                topicEn: 'Reliable Data Delivery, Routing, and Networking',
                courseAr: 'الشبكات',
                instructors: ['محمد عياز خان', 'مشاري حويتم', 'أحلام الفطناسي']
            },
            {
                topicEn: 'Introduction to Networking and Communication',
                courseAr: 'الشبكات',
                instructors: ['محمد عياز خان', 'مشاري حويتم', 'أحلام الفطناسي']
            }
        ]
    },
    {
        titleAr: 'الرياضيات المتقطعة',
        titleEn: 'Discrete mathematics',
        blurbAr: 'هياكل منفصلة تشمل المنطق والمجموعات والرسوم والأشجار والاحتمال ذات الصلة بعلوم الحاسب.',
        blurbEn:
            'Discrete structures including logic, sets, graphs, trees, and probability relevant to computing science.',
        courses: [
            {
                topicEn: 'Graphs, Trees, and Discrete Probability',
                courseAr: 'رياضيات متقطعة',
                instructors: ['خالد', 'سالم حمود', 'ايمان حموده', 'راضية المبروك']
            },
            {
                topicEn: 'Proof Techniques and Basics of Computation',
                courseAr: 'رياضيات متقطعة',
                instructors: ['سالم', 'خالد الحربي', 'ايمان حموده', 'راضية المبروك']
            },
            {
                topicEn: 'Basic Logic, Sets, Relations, and Functions',
                courseAr: 'رياضيات متقطعة',
                instructors: ['السعيد', 'سالم حمود', 'ايمان حموده', 'راضية المبروك']
            }
        ]
    },
    {
        titleAr: 'معماريات الحاسب',
        titleEn: 'Computer architecture',
        blurbAr: 'مفاهيم أساسية في تنظيم المعالج وتسلسل الذاكرة ومعمارية مستوى التعليمات.',
        blurbEn:
            'Fundamental concepts in CPU organization, memory hierarchy, and instruction-level architecture.',
        courses: [
            {
                topicEn: 'Machine Organization on the Basis of Architecture',
                courseAr: 'معماريات الحاسب',
                instructors: ['أبو طه زماني', 'فراس علان', 'عائدة الصغير', 'راضية المبروك']
            },
            {
                topicEn: 'Architecture of Memory Systems',
                courseAr: 'معماريات الحاسب',
                instructors: ['أبو طه زماني', 'فراس علان', 'عائدة الصغير', 'راضية المبروك']
            }
        ]
    },
    {
        titleAr: 'التصميم الرقمي',
        titleEn: 'Digital design',
        blurbAr: 'مفاهيم أساسية في المنطق الرقمي والأنظمة التجميعية والتتابعية وتصميم الدوائر الرقمية.',
        blurbEn:
            'Fundamental concepts in digital logic, combinational and sequential systems, and digital circuit design.',
        courses: [
            {
                topicEn: 'Digital Logic, Digital Systems',
                courseAr: 'تصميم المنطق والنظم الرقمية',
                instructors: ['سيد مطيع', 'ماجد نواز', 'أحلام الفطناسي', 'رندا اللافي']
            }
        ]
    }
];
