'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

import { mockProjects } from '@/lib/mock-data';
import type { Project } from '@/lib/types';
import { ProjectForm } from './project-form';
import { useToast } from '@/hooks/use-toast';

export function ProjectTable() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const handleAdd = () => {
    setSelectedProject(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleDelete = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    toast({
        title: "Project Deleted",
        description: "The project has been successfully deleted.",
    });
  };

  const handleFormSubmit = (data: Project) => {
    if (selectedProject) {
      setProjects(projects.map(p => p.id === data.id ? data : p));
      toast({
        title: "Project Updated",
        description: "The project has been successfully updated.",
      });
    } else {
      setProjects([data, ...projects]);
      toast({
        title: "Project Created",
        description: "The new project has been successfully created.",
      });
    }
    setIsDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Manage student projects.</CardDescription>
            </div>
            <Button size="sm" className="gap-1" onClick={handleAdd}>
              <PlusCircle className="h-4 w-4" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Student</TableHead>
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
                      src={project.imageUrl}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.student}</TableCell>
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
                        <DropdownMenuItem onSelect={() => handleEdit(project)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleDelete(project.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              {selectedProject ? 'Update the details of the project.' : 'Fill in the details for the new project.'}
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            project={selectedProject}
            onSubmit={handleFormSubmit}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
