import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="aspect-[4/3] relative mb-4">
          <Image
            src={project.imageUrl}
            alt={`Image for ${project.title}`}
            fill
            className="rounded-t-lg object-cover"
            data-ai-hint="student project"
          />
        </div>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>
          By {project.student} - {project.year}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </CardContent>
      <CardFooter>
        <Badge variant="secondary">{project.category}</Badge>
      </CardFooter>
    </Card>
  );
}
