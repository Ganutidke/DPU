'use client';

import { useState } from 'react';
import { MoreHorizontal, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';
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

const ITEMS_PER_PAGE = 10;

export function EventTable() {
  const [events, setEvents] = useLocalStorage<Event[]>('events', mockEvents);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const router = useRouter();

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEvents = events.slice(startIndex, endIndex);

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
              {currentEvents.map(event => (
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
       <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </>
  );
}
