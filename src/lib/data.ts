export interface EventType {
    id: string;
    name: 'Workshop' | 'Seminar' | 'Social' | 'Sports' | 'PTM' | string;
}

export interface ProjectCategory {
    id: string;
    name: 'Engineering' | 'Arts' | 'Business' | 'Science' | string;
}

export interface AcademicYear {
    id: string;
    year: '2024-2025' | '2023-2024' | string;
}

export const eventTypes: EventType[] = [
    { id: 'et1', name: 'Workshop' },
    { id: 'et2', name: 'Seminar' },
    { id: 'et3', name: 'Social' },
    { id: 'et4', name: 'Sports' },
    { id: 'et5', name: 'PTM' },
];

export const projectCategories: ProjectCategory[] = [
    { id: 'pc1', name: 'Engineering' },
    { id: 'pc2', name: 'Arts' },
    { id: 'pc3', name: 'Business' },
    { id: 'pc4', name: 'Science' },
];

export const academicYears: AcademicYear[] = [
    { id: 'ay1', year: '2024-2025' },
    { id: 'ay2', year: '2023-2024' },
]

export interface Event {
    id: string;
    title: string;
    date: string;
    description: string;
    type: EventType['name'];
    academicYear: AcademicYear['year'];
    year: 'All' | 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'F.Y.Bsc(CA)' | 'S.Y.BCA(Sci.)' | 'T.Y.BCA(Sci.)' | string;
    images: string[];
    links?: { title: string; url: string }[];
  }
  
  export const events: Event[] = [
    { id: '1', title: 'PTM for F.Y.Bsc(CA) A and B', date: 'August 31, 2024', description: 'Parent-Teacher meeting for First Year B.Sc (Computer Applications) students of divisions A and B.', type: 'PTM', academicYear: '2024-2025', year: 'F.Y.Bsc(CA)', images: ['https://placehold.co/800x600.png'], links: [] },
    { id: '2', title: 'PTM for S.Y.BCA(Sci.) A', date: 'August 31, 2024', description: 'Parent-Teacher meeting for Second Year BCA (Science) students of division A.', type: 'PTM', academicYear: '2024-2025', year: 'S.Y.BCA(Sci.)', images: ['https://placehold.co/800x600.png'], links: [] },
    { id: '3', title: 'PTM for S.Y.BCA(Sci.) B', date: 'August 31, 2024', description: 'Parent-Teacher meeting for Second Year BCA (Science) students of division B.', type: 'PTM', academicYear: '2024-2025', year: 'S.Y.BCA(Sci.)', images: ['https://placehold.co/800x600.png'] },
    { id: '4', title: 'Intro to React Workshop', date: 'October 26, 2024', description: 'Learn the basics of React and build a simple application. This workshop covers component-based architecture, state management with hooks, and interacting with APIs. No prior React experience required, but basic JavaScript knowledge is recommended.', type: 'Workshop', academicYear: '2024-2025', year: 'All', images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'], links: [{title: 'Workshop Materials', url: '#'}] },
    { id: '5', title: 'AI in Modern Business Seminar', date: 'November 2, 2024', description: 'Explore how artificial intelligence is shaping the future of business, from marketing to operations. We will discuss case studies from leading companies and ethical considerations.', type: 'Seminar', academicYear: '2024-2025', year: 'Junior', images: ['https://placehold.co/800x600.png'], links: [{title: 'Reading List', url: '#'}] },
    { id: '6', title: 'Fall Fest Social', date: 'November 9, 2024', description: 'Join us for a campus-wide social with games, music, and food. A great way to de-stress before finals and meet new people from different departments.', type: 'Social', academicYear: '2024-2025', year: 'All', images: ['https://placehold.co/800x600.png'] },
    { id: '7', title: 'Intramural Basketball Tournament', date: 'November 15, 2024', description: 'Compete in our annual 3v3 basketball tournament. Sign up your team of 3-5 players. All skill levels are welcome!', type: 'Sports', academicYear: '2024-2025', year: 'All', images: ['https://placehold.co/800x600.png'], links: [{title: 'Sign-up Form', url: '#'}] },
    { id: '8', title: 'Career Fair Prep', date: 'October 28, 2024', description: 'Get your resume ready and practice your interview skills with career services. We will have professional advisors available to review your resume.', type: 'Workshop', academicYear: '2024-2025', year: 'Senior', images: ['https://placehold.co/800x600.png'] },
    { id: '9', title: 'Guest Lecture: The Future of Space Exploration', date: 'November 5, 2024', description: 'A talk by a former NASA astronaut about the next frontier in space travel and research, including upcoming missions to Mars and beyond.', type: 'Seminar', academicYear: '2023-2024', year: 'All', images: ['https://placehold.co/800x600.png'] },
    { id: '10', title: 'Freshman Mixer', date: 'October 30, 2024', description: 'A great opportunity for first-year students to connect. There will be icebreakers, free pizza, and giveaways.', type: 'Social', academicYear: '2024-2025', year: 'Freshman', images: ['https://placehold.co/800x600.png'] },
    { id: '11', title: 'Advanced Python for Data Science', date: 'November 12, 2024', description: 'Deepen your Python skills for data analysis and machine learning. This workshop will cover libraries like Pandas, NumPy, and Scikit-learn.', type: 'Workshop', academicYear: '2023-2024', year: 'Sophomore', images: ['https://placehold.co/800x600.png'], links: [{title: 'GitHub Repo', url: '#'}] },
  ];
  
  export interface Project {
    id: string;
    title: string;
    students: string[];
    description: string;
    images: string[];
    category: ProjectCategory['name'];
    class: string;
    year: number;
    academicYear: AcademicYear['year'];
    liveLink?: string;
    otherLinks?: { title: string; url: string }[];
    date: string;
  }
  
  export const projects: Project[] = [
    { id: 'p1', title: 'Automated Irrigation System', students: ['Jane Doe', 'Alex Ray'], description: 'A smart irrigation system using IoT sensors to conserve water. The system monitors soil moisture levels and weather forecasts to deliver the optimal amount of water, reducing waste by up to 40%.', images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'], category: 'Engineering', class: 'CS101', year: 2024, academicYear: '2023-2024', liveLink: '#', otherLinks: [{title: 'Project Documentation', url: '#'}], date: 'May 5, 2024' },
    { id: 'p2', title: 'Digital Art Portfolio', students: ['John Smith'], description: 'A collection of digital paintings exploring themes of nature and technology. The portfolio is built as an interactive web experience, allowing viewers to explore high-resolution artwork.', images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'], category: 'Arts', class: 'ART202', year: 2023, academicYear: '2023-2024', liveLink: '#', date: 'December 15, 2023' },
    { id: 'p3', title: 'Sustainable Business Model', students: ['Emily White'], description: 'A comprehensive business plan for an eco-friendly subscription box service. The model focuses on sourcing products from local artisans and using 100% recyclable packaging.', images: ['https://placehold.co/800x600.png'], category: 'Business', class: 'BUS301', year: 2024, academicYear: '2024-2025', otherLinks: [{title: 'Business Plan PDF', url: '#'}], date: 'April 20, 2024' },
    { id: 'p4', title: 'Cancer Cell Research', students: ['Michael Brown', 'Sarah Lee'], description: 'A study on the effects of a new compound on cancer cell growth. Our findings show a significant reduction in tumor size in laboratory settings.', images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'], category: 'Science', class: 'BIO400', year: 2023, academicYear: '2023-2024', otherLinks: [{title: 'Published Paper', url: '#'}], date: 'November 10, 2023' },
    { id: 'p5', title: 'Mobile App for Campus Navigation', students: ['Chris Green'], description: 'An iOS app to help new students find their way around campus, featuring real-time location tracking and an augmented reality overlay to identify buildings.', images: ['https://placehold.co/800x600.png'], category: 'Engineering', class: 'CS101', year: 2024, academicYear: '2024-2025', liveLink: '#', date: 'May 1, 2024' },
    { id: 'p6', title: 'Short Film: "The Commute"', students: ['Olivia Blue'], description: 'A short, animated film about the daily lives of city dwellers, told through a series of interconnected vignettes. The film was created using a combination of 2D and 3D animation techniques.', images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'], category: 'Arts', class: 'ART202', year: 2024, academicYear: '2024-2025', liveLink: '#', date: 'March 18, 2024' },
  ];
  
  // Note: The following types and data were previously in 'lib/types.ts' and 'lib/mock-data.ts'
  // They are kept here for reference but the interfaces above are now the single source of truth.
  
  export type AdminEvent = {
    id: string;
    title: string;
    date: string;
    description: string;
    category: 'Academic' | 'Social' | 'Workshop' | 'Career';
  };

  export type AdminProject = {
    id: string;
    title: string;
    student: string;
    year: number;
    category: 'Technology' | 'Art' | 'Science' | 'Business';
    description: string;
    imageUrl: string;
  };
