'use client';

import { useState } from 'react';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';

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

import { events as mockEvents, type Event } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

export function EventTable() {
  const [events, setEvents] = useLocalStorage<Event[]>('events', mockEvents);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
    });
  };


  return (
    <>
      <div className='text-right mb-4'>
        <Button size="sm" className="gap-1" onClick={() => router.push('/admin/events/new')}>
          <PlusCircle className="h-4 w-4" />
          Add Event
        </Button>
      </div>
      <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
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
                  <TableCell>
                    <Badge variant="secondary">{event.type}</Badge>
                  </TableCell>
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
                        {/* <DropdownMenuItem onSelect={() => router.push(`/admin/events/${event.id}/edit`)}>Edit</DropdownMenuItem> */}
                        <DropdownMenuItem onSelect={() => handleDelete(event.id)}>Delete</DropdownMenuItem>
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
