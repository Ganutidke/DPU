'use client';

import { useState } from 'react';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';

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

import { mockEvents } from '@/lib/mock-data';
import type { Event } from '@/lib/types';
import { EventForm } from './event-form';
import { useToast } from '@/hooks/use-toast';

export function EventTable() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  const handleAdd = () => {
    setSelectedEvent(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
    });
  };

  const handleFormSubmit = (data: Event) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event => event.id === data.id ? data : event));
       toast({
        title: "Event Updated",
        description: "The event has been successfully updated.",
    });
    } else {
      // Add new event
      setEvents([data, ...events]);
       toast({
        title: "Event Created",
        description: "The new event has been successfully created.",
    });
    }
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Events</CardTitle>
              <CardDescription>Manage your campus events.</CardDescription>
            </div>
            <Button size="sm" className="gap-1" onClick={handleAdd}>
              <PlusCircle className="h-4 w-4" />
              Add Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map(event => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.category}</TableCell>
                  <TableCell>{format(new Date(event.date), 'PPP')}</TableCell>
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
                        <DropdownMenuItem onSelect={() => handleEdit(event)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleDelete(event.id)}>Delete</DropdownMenuItem>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            <DialogDescription>
              {selectedEvent ? 'Update the details of your event.' : 'Fill in the details for the new event.'}
            </DialogDescription>
          </DialogHeader>
          <EventForm 
            event={selectedEvent} 
            onSubmit={handleFormSubmit}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
