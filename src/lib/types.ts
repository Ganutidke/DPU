export type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: 'Academic' | 'Social' | 'Workshop' | 'Career';
};

export type Project = {
  id: string;
  title: string;
  student: string;
  year: number;
  category: 'Technology' | 'Art' | 'Science' | 'Business';
  description: string;
  imageUrl: string;
};
