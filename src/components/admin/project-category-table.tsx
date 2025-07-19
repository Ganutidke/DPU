
'use client';

import { useState } from 'react';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { projectCategories as defaultCategories, type ProjectCategory } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function ProjectCategoryTable() {
  const [categories, setCategories] = useLocalStorage<ProjectCategory[]>('projectCategories', defaultCategories);
  const { toast } = useToast();
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleDelete = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    toast({
        title: "Project Category Deleted",
        description: "The project category has been successfully deleted.",
    });
  };

  const handleAdd = () => {
    if (newCategoryName.trim() === '') {
        toast({
            title: "Error",
            description: "Category name cannot be empty.",
            variant: "destructive"
        });
        return;
    }
    setCategories([...categories, { id: crypto.randomUUID(), name: newCategoryName.trim() as ProjectCategory['name'] }]);
    setNewCategoryName('');
    toast({
        title: "Project Category Added",
        description: "The new project category has been successfully added.",
    });
  };


  return (
    <>
      <div className='text-right mb-4'>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add Category
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Add New Project Category</AlertDialogTitle>
                <AlertDialogDescription>
                    Enter the name for the new project category.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <Input 
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Health & Wellness"
                />
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAdd}>Add</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(category => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
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
                        <DropdownMenuItem onSelect={() => handleDelete(category.id)}>Delete</DropdownMenuItem>
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
