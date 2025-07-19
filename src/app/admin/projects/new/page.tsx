'use client';
import { ProjectForm } from "@/components/admin/project-form";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { projects as defaultProjects } from "@/lib/data";

export default function NewProjectPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [projects, setProjects] = useLocalStorage<Project[]>('projects', defaultProjects);

    const handleFormSubmit = (data: Project) => {
        setProjects([...projects, data]);
        toast({
            title: "Project Created",
            description: "The new project has been successfully created.",
        });
        router.push('/admin');
    };

    return (
        <div className="container mx-auto py-8 max-w-7xl">
            <div className="max-w-2xl mx-auto">
                 <div className="mb-6">
                    <h1 className="text-3xl font-bold font-headline">Add New Project</h1>
                    <p className="text-muted-foreground">Fill in the details for the new project.</p>
                </div>
                <ProjectForm
                    onSubmit={handleFormSubmit}
                    onCancel={() => router.push('/admin')}
                />
            </div>
        </div>
    );
}
