/**
 * مصادر PDF محلية: assets/files/sources/
 * تجميعة الأقسام (13 قسماً) كما في منصة التعلم — كل قسم: ملفات + اختبارات وحدات للمعايير المرتبطة.
 */
function localSourcePdfUrl(filename) {
    return '../assets/files/sources/' + encodeURIComponent(filename);
}

/**
 * أقسام المصادر: القسم الأول = SKU 1–2 … حتى القسم الثالث عشر = SKU 20
 * standardIds: معايير الاختبار التجريبي (test.html?unit=)
 */
var RESOURCE_SKU_SECTIONS = [
    {
        partAr: 'القسم الأول',
        partEn: 'Part 1',
        skuAr: 'SKU 1–2',
        skuEn: 'SKU 1–2',
        standardIds: [1, 2],
        files: [
            {
                label: 'SKU 1–2 — Basic Analysis and Algorithmic Methods',
                name: 'SKU_1-2 Basic Analysis and Algorithmic Methods.pdf'
            },
            {
                label: 'SKU 1–2 — Basic Analysis and Algorithmic Methods (2)',
                name: 'SKU_1-2 Basic Analysis and Algorithmic Methods-2.pdf'
            }
        ],
        extraLinks: []
    },
    {
        partAr: 'القسم الثاني',
        partEn: 'Part 2',
        skuAr: 'SKU 3',
        skuEn: 'SKU 3',
        standardIds: [3],
        files: [
            {
                label: 'SKU 3 — Program Representation, Language Translation, and Execution',
                name: 'SKU_3_Program_Representation,Language_Translation,_and_Execution.pdf'
            }
        ],
        extraLinks: []
    },
    {
        partAr: 'القسم الثالث',
        partEn: 'Part 3',
        skuAr: 'SKU 4',
        skuEn: 'SKU 4',
        standardIds: [4],
        files: [
            {
                label: 'SKU 4 — Fundamental Programming Concepts and Data Structures',
                name: 'SKU_4 Fundamental Programming Concepts and Data Structures.pdf'
            }
        ],
        extraLinks: []
    },
    {
        partAr: 'القسم الرابع',
        partEn: 'Part 4',
        skuAr: 'SKU 5',
        skuEn: 'SKU 5',
        standardIds: [5],
        files: [{ label: 'SKU 5 — Basic Type Systems', name: 'SKU_5 Basic Type Systems.pdf' }],
        extraLinks: []
    },
    {
        partAr: 'القسم الخامس',
        partEn: 'Part 5',
        skuAr: 'SKU 6',
        skuEn: 'SKU 6',
        standardIds: [6],
        files: [{ label: 'SKU 6 — Object Oriented Programming', name: 'SKU_6 Object Oriented Programming.pdf' }],
        extraLinks: []
    },
    {
        partAr: 'القسم السادس',
        partEn: 'Part 6',
        skuAr: 'SKU 7',
        skuEn: 'SKU 7',
        standardIds: [7],
        files: [{ label: 'SKU 7 — Data Structure', name: 'SKU_7 Data Structure.pdf' }],
        extraLinks: []
    },
    {
        partAr: 'القسم السابع',
        partEn: 'Part 7',
        skuAr: 'SKU 8',
        skuEn: 'SKU 8',
        standardIds: [8],
        files: [
            {
                label: 'SKU 8 — Database Systems: Fundamentals and Design',
                name: 'SKU_8 Database Systems_ Fundamentals and Design.pdf'
            }
        ],
        extraLinks: []
    },
    {
        partAr: 'القسم الثامن',
        partEn: 'Part 8',
        skuAr: 'SKU 9–10',
        skuEn: 'SKU 9–10',
        standardIds: [9, 10],
        files: [
            {
                label: 'SKU 9–10 — Software Engineering Fundamentals',
                name: 'SKU_9-10 Software Engineering Fundamentals.pdf'
            }
        ],
        extraLinks: []
    },
    {
        partAr: 'القسم التاسع',
        partEn: 'Part 9',
        skuAr: 'SKU 11–12',
        skuEn: 'SKU 11–12',
        standardIds: [11, 12],
        files: [
            { label: 'SKU 11–12 — Operating System (1)', name: 'SKU_11-12 Operating System_1.pdf' },
            { label: 'SKU 11–12 — Operating System (2)', name: 'SKU_11-12 Operating System_2.pdf' }
        ],
        extraLinks: [
            {
                label: 'OSTEP — Concurrency (مجاني)',
                url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf'
            },
            {
                label: 'GeeksforGeeks — CPU Scheduling',
                url: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/'
            }
        ],
        noteAr:
            'ملاحظة: لا يوجد ملف PDF منفصل باسم SKU 11 فقط؛ استخدم روابط التزامن أعلاه مع ملفات أنظمة التشغيل (SKU 11–12).',
        noteEn:
            'Note: there is no standalone SKU 11 PDF; use the concurrency links above together with the OS PDFs (SKU 11–12).'
    },
    {
        partAr: 'القسم العاشر',
        partEn: 'Part 10',
        skuAr: 'SKU 13–14',
        skuEn: 'SKU 13–14',
        standardIds: [13, 14],
        files: [
            {
                label: 'SKU 13 — Introduction to Networking and Communication',
                name: 'SKU_13 Introduction to Networking and Communication.pdf'
            },
            {
                label: 'SKU 14 — Reliable Data Delivery, Routing and Forwarding, and Resource',
                name: 'SKU_14 Reliable Data Delivery, Routing and Forwarding, and Resource.pdf'
            }
        ],
        extraLinks: []
    },
    {
        partAr: 'القسم الحادي عشر',
        partEn: 'Part 11',
        skuAr: 'SKU 15–16–17',
        skuEn: 'SKU 15–16–17',
        standardIds: [15, 16, 17],
        files: [
            {
                label: 'SKU 15–16–17 — Discrete Mathematics Core Concepts',
                name: 'SKU_15-16-17 Discrete Mathematics Core Concepts.pdf'
            }
        ],
        extraLinks: []
    },
    {
        partAr: 'القسم الثاني عشر',
        partEn: 'Part 12',
        skuAr: 'SKU 18–19',
        skuEn: 'SKU 18–19',
        standardIds: [18, 19],
        files: [
            { label: 'SKU 18–19 — Computer Architecture (1)', name: 'SKU_18-19 Computer Architecture_1.pdf' },
            { label: 'SKU 18–19 — Computer Architecture (2)', name: 'SKU_18-19 Computer Architecture_2.pdf' }
        ],
        extraLinks: []
    },
    {
        partAr: 'القسم الثالث عشر',
        partEn: 'Part 13',
        skuAr: 'SKU 20',
        skuEn: 'SKU 20',
        standardIds: [20],
        files: [
            {
                label: 'SKU 20 — Digital logic and Digital System',
                name: 'SKU_20 Digital logic and Digital System.pdf'
            }
        ],
        extraLinks: []
    }
];
