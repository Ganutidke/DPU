'use client';
import { EventForm } from "@/components/admin/event-form";
import { useToast } from "@/hooks/use-toast";
import type { Event } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { events as defaultEvents } from "@/lib/data";

export default function NewEventPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [events, setEvents] = useLocalStorage<Event[]>('events', defaultEvents);


    const handleFormSubmit = (data: Event) => {
        setEvents([...events, data]);
        toast({
            title: "Event Created",
            description: "The new event has been successfully created.",
        });
        router.push('/admin');
    };

    return (
        <div className="container mx-auto py-8 max-w-7xl">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold font-headline">Add New Event</h1>
                    <p className="text-muted-foreground">Fill in the details for the new event.</p>
                </div>
                <EventForm 
                    onSubmit={handleFormSubmit}
                    onCancel={() => router.push('/admin')}
                />
            </div>
        </div>
    );
}
