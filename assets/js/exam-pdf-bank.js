/**
 * أسئلة الاختبار مستخرجة من readiness_exam.pdf
 * الترتيب: معيار 1 → (سهل، متوسط، صعب) … معيار 20
 * c = فهرس الإجابة الصحيحة (0–3)
 */
var PDF_EXAM_BANK = [
    [
        {
            t: 'Which of the following problems is typically solved using dynamic programming?',
            o: ['Binary Search', 'Quick Sort', 'Fibonacci Sequence Calculation with Memoization', 'Depth-First Search'],
            c: 2
        },
        {
            t: 'Which problem demonstrates dynamic programming?',
            o: ['Quick Sort', 'Longest Common Subsequence', 'Breadth-First Search', 'Linear Search'],
            c: 1
        },
        {
            t: 'Which standard complexity class describes logarithmic time algorithms?',
            o: ['O(n)', 'O(n²)', 'O(2ⁿ)', 'O(log n)'],
            c: 3
        }
    ],
    [
        {
            t: 'Which of the following is true about heuristic algorithms?',
            o: ['Guarantee optimal results', 'Provide fast approximate solutions', 'Only for sorting', 'Only for small datasets'],
            c: 1
        },
        {
            t: "Which of the following describes a greedy algorithm's decision process?",
            o: ['Selects the best local option at each step', 'Recursively explores all possibilities', 'Divides the problem into equal subproblems', 'Uses random choices to find solutions'],
            c: 0
        },
        {
            t: 'Which of the following is true about Big Theta notation?',
            o: ['Gives only an upper bound', 'Gives only a lower bound', 'Gives a tight bound on growth rate', 'Only used in sorting'],
            c: 2
        }
    ],
    [
        {
            t: 'Which programming concept automatically frees unused memory?',
            o: ['Manual deallocation', 'Stack pointer adjustment', 'Garbage collection', 'Heap resizing'],
            c: 2
        },
        {
            t: 'Which section of memory is generally not manually managed by the programmer?',
            o: ['Stack', 'Heap', 'Text section and global data (mostly)', 'None of the above'],
            c: 2
        },
        {
            t: 'Syntax errors are usually detected at:',
            o: ['Runtime', 'Heap allocation', 'Compile time or parsing', 'Stack allocation'],
            c: 2
        }
    ],
    [
        {
            t: 'Garbage collection is most often associated with which type of programming languages?',
            o: ['Assembly only', 'C with manual memory management', 'Languages with automatic memory management (e.g., Java, Python)', 'Languages without runtime'],
            c: 2
        },
        {
            t: 'Which section of memory stores global variables in most programming languages?',
            o: ['Stack', 'Heap', 'Global data section', 'Text section'],
            c: 2
        },
        {
            t: 'Which tool can generate human-readable documentation from code?',
            o: ['Interpreter', 'Expression optimizer', 'Documentation generator', 'Compiler'],
            c: 2
        }
    ],
    [
        {
            t: 'Which section of memory is used for function call management?',
            o: ['Heap', 'Global data', 'Stack', 'Text section'],
            c: 2
        },
        {
            t: 'Which of the following is true about interpreters?',
            o: ['They generate machine code before execution', 'They execute source code directly line by line', 'They always optimize expressions', 'They only generate documentation'],
            c: 1
        },
        {
            t: 'Which of the following is true about syntax checking?',
            o: ['It evaluates expressions', 'It detects memory leaks', 'It ensures the code conforms to the language grammar', 'It frees unused memory'],
            c: 2
        }
    ],
    [
        {
            t: 'Which of the following is a common task of an interpreter?',
            o: ['Generate AST', 'Free heap memory', 'Execute code line by line', 'Optimize expressions'],
            c: 2
        },
        {
            t: 'What is the primary purpose of an interpreter?',
            o: ['To generate documentation', 'To optimize memory usage', 'To execute source code directly', 'To create an AST'],
            c: 2
        },
        {
            t: 'Which of the following tools executes code without generating machine code?',
            o: ['Compiler', 'Interpreter', 'Expression optimizer', 'Documentation generator'],
            c: 1
        }
    ],
    [
        {
            t: 'Which of the following tree data structures is not a balanced binary tree?',
            o: ['Splay tree', 'B-tree', 'AVL tree', 'Red-black tree'],
            c: 1
        },
        {
            t: 'Which of the following is the simplest data structure that supports range searching?',
            o: ['AA-trees', 'K-d trees', 'Heaps', 'Binary search trees'],
            c: 1
        },
        {
            t: 'What is the use of the bin data structure?',
            o: ['To have efficient traversal', 'To have efficient region query', 'To have efficient deletion', 'To have efficient insertion'],
            c: 1
        }
    ],
    [
        {
            t: 'A database system typically consists of:',
            o: ['Hardware, Software, Data, and Users', 'Software, Compiler, and Files', 'Hardware and Operating System only', 'Files and File Systems only'],
            c: 0
        },
        {
            t: 'A clustering index is defined on the fields which are of type:',
            o: ['Primary key', 'Foreign key', 'Non-key, sorting field', 'Non-key, non-sorting field'],
            c: 2
        },
        {
            t: 'Which part of the DBMS ensures atomicity, consistency, isolation, and durability?',
            o: ['Transaction Processor', 'Query Executor', 'Access Methods', 'Data Modeler'],
            c: 0
        }
    ],
    [
        {
            t: 'A primary key in a relation must be:',
            o: ['Unique and not null', 'Non-unique and null', 'Optional', 'Repeated in multiple tables'],
            c: 0
        },
        {
            t: 'Which of the following is not a component of a database system?',
            o: ['Database', 'Database Management System (DBMS)', 'Compiler', 'Database users'],
            c: 2
        },
        {
            t: 'Which component stores metadata about the database structure?',
            o: ['Data Dictionary', 'Data File', 'Query Processor', 'Transaction Log'],
            c: 0
        }
    ],
    [
        {
            t: 'Which of the following is a declarative query?',
            o: ['SELECT * FROM Students WHERE GPA > 3.0;', 'FOR each student DO print record;', 'LOOP through Students;', 'INSERT using loop iteration'],
            c: 0
        },
        {
            t: 'Which function is responsible for restoring a database after a crash?',
            o: ['Backup', 'Recovery', 'Logging', 'Replication'],
            c: 1
        },
        {
            t: 'Which of the following is a dense index?',
            o: ['Clustering Index', 'Primary Index', 'Secondary Index', 'All of the above'],
            c: 2
        }
    ],
    [
        {
            t: 'The relationship between scheduling algorithms and application domains is:',
            o: [
                'Scheduling policies must match the performance and timing requirements of the specific application domain',
                'The same algorithm works optimally for all domains',
                'Scheduling only affects memory usage',
                'Scheduling algorithms are irrelevant for multithreaded applications'
            ],
            c: 0
        },
        {
            t: 'In real-time application domains, the scheduling algorithm must ensure:',
            o: ['Maximum CPU utilization without deadlines', 'Predictable and timely execution of tasks', 'Only batch processing', 'First-Come-First-Served execution for all tasks'],
            c: 1
        },
        {
            t: 'A task in the "ready" state is:',
            o: ['Waiting for I/O completion', 'Ready to run but waiting for CPU allocation', 'Currently executing on the CPU', 'Terminated'],
            c: 1
        }
    ],
    [
        {
            t: 'Which of the following is an example of middleware?',
            o: ['A file stored on disk', 'Database connection managers', 'BIOS firmware', 'CPU microcode'],
            c: 1
        },
        {
            t: 'When a new I/O request arrives for a busy device, it is:',
            o: ['Executed immediately', "Added to the device driver's I/O queue", 'Ignored until the device is free', 'Sent directly to the CPU registers'],
            c: 1
        },
        {
            t: 'Middleware enhances portability by:',
            o: ['Allowing applications to bypass the OS', 'Abstracting heterogeneity across platforms', 'Requiring hardware-specific coding', 'Limiting application communication'],
            c: 1
        }
    ],
    [
        {
            t: 'Application software relies on the OS for I/O operations because:',
            o: ['It cannot access I/O devices directly', 'I/O devices only respond to user commands', 'System software cannot manage I/O', 'I/O operations require only application-level drivers'],
            c: 0
        },
        {
            t: 'The function of process management in an OS is to:',
            o: ['Manage memory allocation only', 'Control the execution of programs', 'Organize file paths', 'Handle user authentication'],
            c: 1
        },
        {
            t: 'Which of the following operations must be executed in kernel mode?',
            o: ['Reading a text file in a text editor', "Changing a process's memory layout", 'Printing characters to the screen buffer', 'Performing simple arithmetic'],
            c: 1
        }
    ],
    [
        {
            t: 'In operating system architecture, a logical layer is best described as:',
            o: ['A physical hardware component', 'A conceptual division that separates system functions', 'A network-routing algorithm', 'A low-level machine code instruction'],
            c: 1
        },
        {
            t: 'Which of the following is a protection and security function of an OS?',
            o: ['Sorting files alphabetically', 'Preventing unauthorized access', 'Compressing user files', 'Improving system speed'],
            c: 1
        },
        {
            t: 'When an application attempts to execute a privileged instruction in user mode, the OS:',
            o: ['Executes it normally', 'Terminates the application or raises an exception', 'Automatically switches to kernel mode', 'Converts it to a non-privileged instruction'],
            c: 1
        }
    ],
    [
        {
            t: 'Number of surjective functions from a 2-element set to a 2-element set is:',
            o: ['1', '2', '3', '4'],
            c: 1
        },
        {
            t: 'A relation is an equivalence relation if it is:',
            o: ['Reflexive and symmetric', 'Reflexive and transitive', 'Symmetric and transitive', 'Reflexive, symmetric and transitive'],
            c: 3
        },
        {
            t: 'Number of equivalence relations on A = {a,b,c} is:',
            o: ['3', '4', '5', '6'],
            c: 2
        }
    ],
    [
        {
            t: 'A graph with no odd cycles must be:',
            o: ['Complete', 'Bipartite', 'Eulerian', 'Hamiltonian'],
            c: 1
        },
        {
            t: 'If 7 people sit around a circular table, the number of distinct seating arrangements is:',
            o: ['6!', '7!', '8!', '5!'],
            c: 0
        },
        {
            t: 'Number of different binary strings of length 8:',
            o: ['256', '512', '1024', '128'],
            c: 0
        }
    ],
    [
        {
            t: 'Number of injective functions from a set with 3 elements to a set with 5 elements:',
            o: ['60', '120', '20', '15'],
            c: 0
        },
        {
            t: 'Minimum edges required in a connected graph with n vertices:',
            o: ['n − 1', 'n + 1', 'n²', 'n'],
            c: 0
        },
        {
            t: 'Two dice are thrown. Probability of getting a sum of 9 is:',
            o: ['1/6', '1/9', '1/8', '4/36'],
            c: 3
        }
    ],
    [
        {
            t: 'High cache miss rates negatively impact runtime because they:',
            o: ['Require additional compiler optimization', 'Trigger interrupts during each miss', 'Force the CPU to fetch data from slower memory levels', 'Consume all register resources'],
            c: 2
        },
        {
            t: 'If a cache has a hit rate of 90%, a hit time of 1 ns, and a miss penalty of 10 ns, the average memory access time is approximately:',
            o: ['1.9 ns', '1 ns', '10 ns', '9 ns'],
            c: 0
        },
        {
            t: 'One advantage of using interrupts for data transfers over programmed I/O is:',
            o: [
                'CPU utilization increases since it actively waits for data',
                'Data transfers occur without requiring the CPU to constantly check device status',
                'It eliminates the need for memory',
                'The system no longer requires cache memory'
            ],
            c: 1
        }
    ],
    [
        {
            t: 'Dynamic ILP techniques such as out-of-order execution are implemented by:',
            o: ['Compiler during program translation', 'Operating system during scheduling', 'Hardware at runtime', 'Application programmer manually'],
            c: 2
        },
        {
            t: 'Which component of the von Neumann machine is responsible for fetching instructions from memory?',
            o: ['Control Unit (CU)', 'Arithmetic Logic Unit (ALU)', 'Data Bus', 'Input/Output Interface'],
            c: 0
        },
        {
            t: 'At the assembly level, instructions are expressed using:',
            o: ['Natural language descriptions', 'Binary numbers only', 'Symbolic mnemonics and operands', 'Microcode tables'],
            c: 2
        }
    ],
    [
        {
            t: 'The use of addressing modes in machine instructions allows the CPU to:',
            o: ['Increase clock frequency', 'Determine how to interpret operand references', 'Eliminate the need for registers', "Simplify the compiler's lexical analysis"],
            c: 1
        },
        {
            t: 'A typical R-type instruction in a RISC architecture includes fields for:',
            o: [
                'Opcode, source registers, destination register, function code',
                'Only opcode and immediate value',
                'Opcode and memory address',
                'Condition codes and stack pointer'
            ],
            c: 0
        },
        {
            t: 'Instruction-level parallelism (ILP) refers to the ability of a processor to:',
            o: [
                'Execute multiple instructions from the same program simultaneously',
                'Execute multiple programs at the same time',
                'Increase cache size to hold more instructions',
                'Perform I/O operations in parallel with computation'
            ],
            c: 0
        }
    ]
];
