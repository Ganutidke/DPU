'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { mockEvents } from '@/lib/mock-data';
import type { Event } from '@/lib/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayEvents = mockEvents.filter(
    (event) => format(new Date(event.date), 'yyyy-MM-dd') === (date ? format(date, 'yyyy-MM-dd') : '')
  );

  const upcomingEvents = mockEvents
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const getCategoryVariant = (category: string) => {
    switch (category) {
      case 'Academic':
        return 'default';
      case 'Social':
        return 'secondary';
      case 'Workshop':
        return 'destructive';
      case 'Career':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Event Calendar</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-2 md:p-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md w-full"
                modifiers={{
                  hasEvent: mockEvents.map((e) => new Date(e.date)),
                }}
                modifiersStyles={{
                  hasEvent: {
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    textDecorationColor: 'hsl(var(--accent))',
                    textUnderlineOffset: '2px',
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {date ? `Events on ${format(date, 'PPP')}` : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
              {selectedDayEvents.length > 0 ? (
                <ul className="space-y-4">
                  {selectedDayEvents.map((event) => (
                    <li key={event.id}>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <Badge variant={getCategoryVariant(event.category)} className="mt-1">{event.category}</Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No events scheduled for this day.</p>
              )}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <ul className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <li key={event.id}>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{format(new Date(event.date), 'PPP')}</p>
                      <Badge variant={getCategoryVariant(event.category)} className="mt-1">{event.category}</Badge>
                      {index < upcomingEvents.length - 1 && <Separator className="my-4" />}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
