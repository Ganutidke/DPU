
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


import { eventTypes as defaultEventTypes, type EventType } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function EventTypeTable() {
  const [eventTypes, setEventTypes] = useLocalStorage<EventType[]>('eventTypes', defaultEventTypes);
  const { toast } = useToast();
  const [newTypeName, setNewTypeName] = useState('');

  const handleDelete = (typeId: string) => {
    setEventTypes(eventTypes.filter(et => et.id !== typeId));
    toast({
        title: "Event Type Deleted",
        description: "The event type has been successfully deleted.",
    });
  };

  const handleAdd = () => {
    if (newTypeName.trim() === '') {
        toast({
            title: "Error",
            description: "Event type name cannot be empty.",
            variant: "destructive"
        });
        return;
    }
    setEventTypes([...eventTypes, { id: crypto.randomUUID(), name: newTypeName.trim() as EventType['name']}]);
    setNewTypeName('');
    toast({
        title: "Event Type Added",
        description: "The new event type has been successfully added.",
    });
  };


  return (
    <>
      <div className='text-right mb-4'>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add Event Type
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Add New Event Type</AlertDialogTitle>
                <AlertDialogDescription>
                    Enter the name for the new event type.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <Input 
                    value={newTypeName}
                    onChange={(e) => setNewTypeName(e.target.value)}
                    placeholder="e.g. Conference"
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
              {eventTypes.map(eventType => (
                <TableRow key={eventType.id}>
                  <TableCell className="font-medium">{eventType.name}</TableCell>
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
                        <DropdownMenuItem onSelect={() => handleDelete(eventType.id)}>Delete</DropdownMenuItem>
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
