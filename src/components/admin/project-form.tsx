"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { PlusCircle, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Project } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { format } from "date-fns"

const projectFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").max(100),
  students: z.array(z.object({ name: z.string().min(2, "Student name is required.") })).min(1, "At least one student is required."),
  description: z.string().max(1000).min(10),
  category: z.enum(["Engineering", "Arts", "Business", "Science"]),
  class: z.string().min(2, "Class/Course is required."),
  year: z.coerce.number().min(2000).max(new Date().getFullYear() + 1),
  academicYear: z.enum(["2024-2025", "2023-2024"]),
  images: z.array(z.object({ url: z.string().url("Must be a valid URL.") })).min(1, "At least one image is required."),
  liveLink: z.string().url().optional().or(z.literal('')),
  otherLinks: z.array(z.object({ title: z.string().min(1), url: z.string().url() })).optional(),
});


type ProjectFormValues = z.infer<typeof projectFormSchema>

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (data: Project) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const defaultValues: Partial<ProjectFormValues> = project
    ? {
        ...project,
        students: project.students.map(name => ({ name })),
        images: project.images.map(url => ({ url })),
      }
    : {
        title: "",
        students: [{ name: "" }],
        description: "",
        category: "Engineering",
        class: "",
        year: new Date().getFullYear(),
        academicYear: "2024-2025",
        images: [],
        liveLink: "",
        otherLinks: [],
      };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields: studentFields, append: appendStudent, remove: removeStudent } = useFieldArray({
    name: "students",
    control: form.control,
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    name: "images",
    control: form.control,
  });

  const handleSubmit = (data: ProjectFormValues) => {
    onSubmit({
      ...data,
      id: project?.id || crypto.randomUUID(),
      students: data.students.map(s => s.name),
      images: data.images.map(img => img.url),
      date: format(new Date(), "MMMM d, yyyy"), // Set current date on submit
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Provide the core information about the project.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. AI-Powered Art Generator" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about the project"
                      className="resize-none h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Arts">Arts</SelectItem>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Class / Course</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. CS101" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Completion Year</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="2024" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="academicYear"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Academic Year</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select a year" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="2024-2025">2024-2025</SelectItem>
                            <SelectItem value="2023-2024">2023-2024</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>Add the students who worked on this project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {studentFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name={`students.${index}.name`}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input placeholder="Student Name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeStudent(index)}
                            disabled={studentFields.length === 1}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                 {form.formState.errors.students && <p className="text-sm font-medium text-destructive">{form.formState.errors.students.message}</p>}

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendStudent({ name: '' })}
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add another student
                </Button>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Images</CardTitle>
            <CardDescription>Add URLs for images to show in the project gallery.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageFields.map((field, index) => (
                <div key={field.id} className="relative group aspect-video">
                  <FormField
                    control={form.control}
                    name={`images.${index}.url`}
                    render={({ field: imageField }) => (
                       <FormItem className="h-full">
                        <FormControl>
                           <div className="h-full w-full">
                            <Input {...imageField} placeholder="https://placehold.co/800x600.png" className="h-full" />
                            {imageField.value && (
                                <Image
                                    src={imageField.value}
                                    alt={`Preview ${index + 1}`}
                                    fill
                                    className="object-cover rounded-md pointer-events-none"
                                    onError={(e) => e.currentTarget.style.display = 'none'}
                                />
                            )}
                           </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full h-full flex flex-col items-center justify-center aspect-video"
                onClick={() => appendImage({ url: '' })}
              >
                <PlusCircle className="h-8 w-8 text-muted-foreground" />
                <span className="mt-2 text-sm text-muted-foreground">Add Image</span>
              </Button>
            </div>
            {form.formState.errors.images && <p className="text-sm font-medium text-destructive">{form.formState.errors.images.message}</p>}
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save Project</Button>
        </div>
      </form>
    </Form>
  )
}
