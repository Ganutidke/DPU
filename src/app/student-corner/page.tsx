'use client';
import { useState, useMemo } from 'react';
import { ProjectCard } from '@/components/project-card';
import { projects, Project } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProjectDetailModal } from '@/components/project-detail-model';

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
const academicYears = ['All', ...Array.from(new Set(projects.map(p => p.academicYear)))];

export default function StudentCornerPage() {
  const [category, setCategory] = useState('All');
  const [projectClass, setProjectClass] = useState('All');
  const [academicYear, setAcademicYear] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { filteredProjects, uniqueClasses } = useMemo(() => {
    const uniqueClasses = ['All', ...Array.from(new Set(projects.map(p => p.class)))];
    const filtered = projects.filter(project => {
        const categoryMatch = category === 'All' || project.category === category;
        const classMatch = projectClass === 'All' || project.class === projectClass;
        const academicYearMatch = academicYear === 'All' || project.academicYear === project.academicYear;
        const searchMatch = searchTerm === '' || 
                            project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            project.students.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && classMatch && searchMatch && academicYearMatch;
      });
    return {
      filteredProjects: filtered,
      uniqueClasses: uniqueClasses
    };
  }, [category, projectClass, academicYear, searchTerm]);

  return (
    <>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
            Student Corner
          </h1>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Showcasing the innovation, creativity, and hard work of our talented students.
          </p>
        </div>

        <div className="mb-10 p-4 bg-card border rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <Label htmlFor="search-projects">Search Projects</Label>
              <Input 
                id="search-projects"
                placeholder="Search by title or student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Filter by category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={projectClass} onValueChange={setProjectClass}>
                <SelectTrigger><SelectValue placeholder="Filter by class" /></SelectTrigger>
                <SelectContent>
                  {uniqueClasses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Academic Year</Label>
              <Select value={academicYear} onValueChange={setAcademicYear}>
                <SelectTrigger><SelectValue placeholder="Filter by academic year" /></SelectTrigger>
                <SelectContent>
                  {academicYears.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} onCardClick={() => setSelectedProject(project)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-lg bg-muted/50">
            <h2 className="text-2xl font-semibold font-headline text-foreground/80">No projects found</h2>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
