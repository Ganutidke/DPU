'use client';
import type { Project } from '@/lib/types';
import { ProjectCard } from '@/components/project-card';
import { useState } from 'react';
import { ProjectDetailModal } from './project-detail-model';
import type { Project as FullProject } from '@/lib/data';
import { projects } from '@/lib/data';

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects: mockProjects }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<FullProject | null>(null);

  const handleCardClick = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        setSelectedProject(project);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={{
                ...project,
                students: [project.student],
                images: [project.imageUrl],
                class: 'N/A', // mock data doesn't have class
                academicYear: '2023-2024',
                date: new Date().toDateString(),
            }}
            onCardClick={() => handleCardClick(project.id)}
          />
        ))}
      </div>
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
