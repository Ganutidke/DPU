'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

import { projects as mockProjects, type Project } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';

export function ProjectTable() {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', mockProjects);
  const { toast } = useToast();
  const router = useRouter();


  const handleDelete = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    toast({
        title: "Project Deleted",
        description: "The project has been successfully deleted.",
    });
  };

  return (
    <>
      <div className='text-right mb-4'>
        <Button size="sm" className="gap-1" onClick={() => router.push('/admin/projects/new')}>
          <PlusCircle className="h-4 w-4" />
          Add Project
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Year</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map(project => (
                <TableRow key={project.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Project image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={project.images[0]}
                      width="64"
                      data-ai-hint="project thumbnail"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.students.join(', ')}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{project.year}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                         {/* <DropdownMenuItem onSelect={() => router.push(`/admin/projects/${project.id}/edit`)}>Edit</DropdownMenuItem> */}
                        <DropdownMenuItem onSelect={() => handleDelete(project.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </div>
    </>
  );
}
