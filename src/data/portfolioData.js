// Single Source of Truth for Sarvesh Sabnis's Portfolio
// Synchronized with updated resume

export const personalInfo = {
  name: 'Sarvesh Sabnis',
  title: 'SQL Developer · Database Engineer · ETL Specialist',
  heroHeadline: 'Query faster with Sarvesh.',
  status: 'Available for hire',
  remoteStatus: 'Open to Opportunities',
  location: 'Goa, India',
  email: 'sarveshsabnis333@gmail.com',
  phone: '+91 9764314857',
  github: 'https://github.com/The-sabnis',
  linkedin: 'https://www.linkedin.com/in/sarvesh-sabnis-002392242',
  resumeUrl: '/Sarvesh_Sabnis_Resume.pdf',
  resumeFilename: 'Sarvesh_Sabnis_Resume.pdf',
  photoUrl: '/sarvesh-photo.png',
  characterGlowUrl: '/character-glow.png',
};

export const heroTypewriterStrings = [
  'SQL Developer with 2.9+ Years of Production Experience',
  'T-SQL & PL/pgSQL Stored Procedures & Functions',
  'Automated ETL Pipelines & Dimensional Data Modeling',
  'SQL Server Agent Jobs & pg_cron Scheduling',
  'Query Optimization, Audit Checks & SLA Analytics',
];

export const heroTerminalLines = [
  { text: '> Connecting to SQL Server & PostgreSQL instances...', state: 'muted' },
  { text: '> Compiling T-SQL & PL/pgSQL stored procedures...', state: 'muted' },
  { text: '> Initializing automated ETL pipelines & pg_cron...', state: 'muted' },
  { text: '> Candidate Verified: Sarvesh Sabnis (2.9+ YOE)', state: 'cyan' },
  { text: '> Status: Available For Hire ✓', state: 'green' },
];

export const heroTechPills = [
  'SQL Server (T-SQL)',
  'PostgreSQL (PL/pgSQL)',
  'ETL Pipelines',
  'Stored Procedures',
];

export const statsData = [
  { from: 0, to: 2.9, decimals: 1, suffix: '+', label: 'Years Exp.' },
  { from: 0, to: 3, suffix: '+', label: 'Relational DBs' },
  { from: 0, to: 8.21, decimals: 2, suffix: '', label: 'B.E. CGPA' },
  { from: 0, to: 10, suffix: '+', label: 'ETL Pipelines' },
  { special: 'badge', title: 'SQL Developer', icon: 'database' },
  { special: 'badge', title: 'ETL & Automation', icon: 'activity' },
];

export const executiveSummary = {
  sectionTitle: 'Executive Summary',
  heading: 'SQL Developer & Database Architect.',
  bio: 'SQL Developer with 2.9+ years designing and maintaining T-SQL and PL/pgSQL stored procedures, functions, and ETL pipelines across SQL Server and PostgreSQL. Experienced building staging/dimensional schemas, automating data workflows via SQL Server Agent Jobs, and implementing data quality and auditing checks for MIS/ERP reporting. Strong hands-on background in production troubleshooting, query optimization, and cross-functional collaboration with analysts and business teams.',
  checkpoints: [
    'T-SQL & PL/pgSQL Development',
    'ETL Pipelines & Staging Schemas',
    'Stored Procedures, Functions & Triggers',
    'Query Optimization & Performance Tuning',
    'Data Quality & Control Table Auditing',
    'SQL Server Agent Jobs & pg_cron Automation',
  ],
};

export const experienceData = [
  {
    badge: 'CURRENT ROLE // PRODUCTION',
    badgeColor: '#0071e3',
    date: 'Jul 2026 – Present',
    title: 'SQL Developer',
    company: 'Goa Electronics Limited (GEL), Goa',
    platform: 'GEL/EDT Government e-Services Platform',
    desc: 'Write, debug, and maintain PL/pgSQL stored procedures and functions supporting application-processing workflows, RTS (Right to Service) appeal management, and MIS reporting on a government e-services platform.',
    bullets: [
      'Write, debug, and maintain PL/pgSQL stored procedures and functions supporting application-processing workflows, RTS (Right to Service) appeal management, and MIS reporting on a government e-services platform.',
      'Develop refcursor-based search/reporting functions with multi-table joins, computed delay/turnaround metrics, and multi-value parameter filtering.',
      'Implement working-days and pendency-period calculations against a business calendar to track SLA compliance, and reconcile application data across source and reporting tables.',
    ],
    highlights: [
      'PL/pgSQL Procedures & Functions',
      'Refcursor Search & Reporting',
      'RTS Appeal Workflows',
      'SLA Compliance Metrics',
      'Business Calendar Logic',
      'Data Reconciliation',
    ],
  },
  {
    badge: 'FULL-TIME // mograERP',
    badgeColor: '#6366f1',
    date: 'Jun 2024 – Jul 2026',
    title: 'SQL Developer',
    company: 'Mograsys Technologies Ltd., Margao',
    platform: 'mograERP Enterprise Platform',
    desc: 'Collaborated with analysts, developers, and business teams to translate data requirements into scalable SQL-based data models and pipelines supporting analytics, reporting, and downstream consumption.',
    bullets: [
      'Collaborated with analysts, developers, and business teams to translate data requirements into scalable SQL-based data models and pipelines.',
      'Designed and maintained data schemas, staging tables, and dimensional-style models supporting analytics, reporting, and downstream consumption.',
      'Built and optimized ETL pipelines in SQL, loading and transforming data from OLTP and intermediary systems while maintaining accuracy and consistency.',
      'Implemented data quality checks, auditing, and error-logging using SQL logic and control tables; automated recurring workflows via SQL Server Agent Jobs to reduce manual processing.',
      'Prepared analytics-ready datasets enabling dashboards and self-serve reporting; independently troubleshot production data issues to maintain data availability and quality.',
    ],
    highlights: [
      'T-SQL & SQL Server',
      'ETL Pipelines & Staging Tables',
      'Dimensional Data Modeling',
      'SQL Server Agent Jobs',
      'Data Quality & Control Tables',
      'Analytics-Ready Datasets',
    ],
  },
  {
    badge: 'INTERNSHIP // BACKEND & CI',
    badgeColor: '#059669',
    date: 'Dec 2023 – Jun 2024',
    title: 'Intern Software Developer',
    company: 'Mograsys Technologies Ltd., Margao',
    platform: 'Engineering Team',
    desc: 'Contributed to backend (SQL) and frontend tasks; gained hands-on exposure to CI tooling (Jenkins) and collaborative development.',
    bullets: [
      'Contributed to backend (SQL) and frontend tasks across production environments.',
      'Gained hands-on exposure to CI tooling (Jenkins) and collaborative development.',
      'Assisted in data verification, bug fixing, and team version control workflows.',
    ],
    highlights: [
      'Backend SQL',
      'Jenkins CI Tooling',
      'Collaborative Development',
      'Production Debugging',
    ],
  },
];

export const skillCategories = [
  {
    title: 'Databases & SQL Development',
    icon: 'database',
    items: [
      'SQL Server (T-SQL)',
      'PostgreSQL (PL/pgSQL)',
      'MySQL',
      'Stored Procedures & Functions',
      'Query Optimization & Triggers',
      'Data Modeling',
    ],
  },
  {
    title: 'ETL, Schemas & Automation',
    icon: 'cpu',
    items: [
      'ETL Pipelines',
      'Staging & Dimensional Schemas',
      'Data Quality & Auditing',
      'SQL Server Agent Jobs',
      'pg_cron Scheduling',
      'Refcursor Search & Reporting',
    ],
  },
  {
    title: 'Programming, BI & Tooling',
    icon: 'layout',
    items: [
      'Python',
      'JavaScript',
      'SSMS & DBeaver',
      'Supabase & Edge Functions',
      'Jenkins & GitHub CI',
      'Tableau & Excel',
    ],
  },
];

export const projectsData = [
  {
    title: 'Retail Sales & Customer Analytics',
    tagline: 'End-to-end SQL Server project on 1.5M rows of e-commerce data',
    category: 'Database Analytics & Query Optimization',
    color: '#a78bfa', // Apple soft violet
    tech: ['SQL Server', 'T-SQL', 'Window Functions', 'CTEs', 'Indexing', 'Execution Plans'],
    tags: ['SQL Server', 'T-SQL', 'Window Functions', 'CTEs', 'Indexing', 'Execution Plans'],
    stat: '406K → 11K logical reads',
    statCaption: 'Cut RFM query reads by 97% on 1.5M rows via execution plan analysis',
    highlights: [
      'Designed 9-table database with 6 foreign keys and a 14-row data-quality log',
      'Segmented 94,398 customers with RFM; 97% are one-time buyers',
      'Cut RFM query logical reads from ~406K to ~11K using execution plan analysis',
      'Found 8.11% late deliveries; Alagoas worst at 23.93%',
    ],
    github: 'https://github.com/The-sabnis/olist-sql-analytics',
    status: 'Azure SQL + Power BI dashboard in progress',
  },
  {
    title: 'Automated Daily Work Report System',
    tagline: 'Automated reporting pipeline powered by PostgreSQL, Supabase Edge Functions & pg_cron',
    category: 'Backend & Data Automation',
    color: '#2997ff', // Apple electric blue
    tech: ['PostgreSQL', 'Supabase', 'TypeScript', 'pg_cron', 'Gmail SMTP', 'GitHub'],
    tags: ['PostgreSQL', 'Supabase', 'TypeScript', 'pg_cron', 'Gmail SMTP', 'GitHub'],
    stat: 'Runs daily, no manual work',
    statCaption: 'Unattended 24-hour pg_cron batch and automated email dispatch',
    highlights: [
      'Built custom PostgreSQL functions and relational tables driving daily task management',
      'Developed Supabase Edge Functions in TypeScript to handle automated backend orchestration',
      'Integrated Gmail SMTP for automated report delivery and configured pg_cron jobs for scheduled execution',
      'Implemented unattended 24h batch scheduling and full version-control with GitHub',
    ],
    github: 'https://github.com/The-sabnis/Daily-Work-Report-Automation',
    status: 'Production · Automated 24h Batch',
  },
];

export const educationData = [
  {
    type: 'degree',
    title: 'B.E. Computer Engineering',
    institution: 'Shree Rayeshwar Institute of Engineering and Information Technology',
    sub: 'Shree Rayeshwar Institute of Engg. & Tech. · 2019 – 2023',
    period: '2019 – 2023',
    cgpa: '8.21',
    badge: 'Graduated with Honors',
  },
  {
    type: 'award',
    title: 'Python 101 for Data Science',
    issuer: 'IBM',
    sub: 'IBM · Completed 2022',
    year: '2022',
    badge: 'IBM Certified',
  },
  {
    type: 'award',
    title: 'The Business Intelligence Analyst',
    issuer: 'Udemy',
    sub: 'Udemy · Professional Track (Ongoing)',
    year: 'Ongoing',
    badge: 'BI Specialization',
  },
  {
    type: 'award',
    title: 'Learn Python Programming Masterclass',
    issuer: 'Udemy',
    sub: 'Udemy · Professional Track (Ongoing)',
    year: 'Ongoing',
    badge: 'Advanced Python',
  },
];

export const contactDetails = {
  heading: 'Ready to optimise your data?',
  subheading: 'Available for SQL Developer, Database Engineer, or ETL roles.',
  email: 'sarveshsabnis333@gmail.com',
  phone: '+91 9764314857',
  location: 'Goa, India',
};
