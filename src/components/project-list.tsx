'use client';

import { useState } from 'react';
import type { Project } from '@/lib/types';
import { ProjectCard } from './project-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectListProps {
  projects: Project[];
}

const categories = ['All', 'Technology', 'Art', 'Science', 'Business'];
const years = ['All', ...Array.from(new Set(mockProjects.map(p => p.year.toString()))).sort((a,b) => Number(b) - Number(a))];


import { mockProjects } from '@/lib/mock-data';

export function ProjectList({ projects }: ProjectListProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');

  const handleFilterChange = (category: string, year: string) => {
    let newFilteredProjects = projects;

    if (category !== 'All') {
      newFilteredProjects = newFilteredProjects.filter(p => p.category === category);
    }

    if (year !== 'All') {
      newFilteredProjects = newFilteredProjects.filter(p => p.year.toString() === year);
    }

    setCategoryFilter(category);
    setYearFilter(year);
    setFilteredProjects(newFilteredProjects);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
        <Select value={categoryFilter} onValueChange={(value) => handleFilterChange(value, yearFilter)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by category..." />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={yearFilter} onValueChange={(value) => handleFilterChange(categoryFilter, value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by year..." />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No Projects Found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
