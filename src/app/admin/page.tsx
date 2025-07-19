import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventTable } from '@/components/admin/event-table';
import { ProjectTable } from '@/components/admin/project-table';

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Admin Dashboard</h1>
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="events">Manage Events</TabsTrigger>
          <TabsTrigger value="projects">Manage Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <EventTable />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
