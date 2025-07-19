'use client';
import { useState, useMemo, useEffect } from 'react';
import { EventCard } from '@/components/event-card';
import type { Event, EventType, AcademicYear } from '@/lib/data';
import { events as defaultEvents, eventTypes as defaultEventTypes, academicYears as defaultAcademicYears } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EventDetailModal } from '@/components/event-detail-modal';
import { useLocalStorage } from '@/hooks/use-local-storage';

const studentYears = ['All', 'Freshman', 'Sophomore', 'Junior', 'Senior'];

export default function EventsPage() {
  const [eventType, setEventType] = useState('All');
  const [studentYear, setStudentYear] = useState('All');
  const [academicYear, setAcademicYear] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [events, setEvents] = useLocalStorage<Event[]>('events', defaultEvents);
  const [eventTypes, setEventTypes] = useLocalStorage<EventType[]>('eventTypes', defaultEventTypes);
  const [academicYears, setAcademicYears] = useLocalStorage<AcademicYear[]>('academicYears', defaultAcademicYears);
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { filteredEvents, availableEventTypes, availableAcademicYears } = useMemo(() => {
    const availableEventTypes = ['All', ...eventTypes.map(e => e.name)];
    const availableAcademicYears = ['All', ...academicYears.map(e => e.year)];

    if (!isClient) return { filteredEvents: [], availableEventTypes, availableAcademicYears };

    const filtered = events.filter(event => {
      const typeMatch = eventType === 'All' || event.type === eventType;
      const studentYearMatch = studentYear === 'All' || event.year === studentYear;
      const academicYearMatch = academicYear === 'All' || event.academicYear === academicYear;
      const searchMatch = searchTerm === '' || event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase());
      return typeMatch && studentYearMatch && academicYearMatch && searchMatch;
    });

    return { filteredEvents: filtered, availableEventTypes, availableAcademicYears };
  }, [eventType, studentYear, academicYear, searchTerm, events, eventTypes, academicYears, isClient]);

  if (!isClient) {
    return null; // or a loading skeleton
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
            College Events
          </h1>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Stay updated with the latest workshops, seminars, and social gatherings on campus.
          </p>
        </div>

        <div className="mb-10 p-4 bg-card border rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <Label htmlFor="search-events">Search Events</Label>
              <Input 
                id="search-events"
                placeholder="e.g. React Workshop"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger><SelectValue placeholder="Filter by type" /></SelectTrigger>
                <SelectContent>
                  {availableEventTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Student Year</Label>
              <Select value={studentYear} onValueChange={setStudentYear}>
                <SelectTrigger><SelectValue placeholder="Filter by year" /></SelectTrigger>
                <SelectContent>
                  {studentYears.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Academic Year</Label>
              <Select value={academicYear} onValueChange={setAcademicYear}>
                <SelectTrigger><SelectValue placeholder="Filter by academic year" /></SelectTrigger>
                <SelectContent>
                  {availableAcademicYears.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} onCardClick={() => setSelectedEvent(event)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-lg bg-muted/50">
            <h2 className="text-2xl font-semibold font-headline text-foreground/80">No events found</h2>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
