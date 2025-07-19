import { ProjectList } from '@/components/project-list';
import { mockProjects } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Student Project Directory</h1>
      <p className="text-lg text-muted-foreground mb-8">Discover the innovative projects by our talented students.</p>
      <ProjectList projects={mockProjects} />
    </div>
  );
}
