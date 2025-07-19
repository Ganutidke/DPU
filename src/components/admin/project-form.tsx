
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { PlusCircle, X, Upload } from "lucide-react"
import Image from "next/image"
import React from "react"

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
import type { Project, ProjectCategory, AcademicYear } from "@/lib/data"
import { projectCategories as defaultCategories, academicYears as defaultAcademicYears } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { format } from "date-fns"
import { useLocalStorage } from "@/hooks/use-local-storage"

const projectFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").max(100),
  students: z.array(z.object({ name: z.string().min(2, "Student name is required.") })).min(1, "At least one student is required."),
  description: z.string().max(1000).min(10),
  category: z.string({required_error: "Please select a category."}),
  class: z.string().min(2, "Class/Course is required."),
  year: z.coerce.number().min(2000).max(new Date().getFullYear() + 1),
  academicYear: z.string({required_error: "Please select an academic year."}),
  images: z.array(z.object({ url: z.string().url("Must be a valid URL or data URI.") })).min(1, "At least one image is required."),
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
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useLocalStorage<ProjectCategory[]>('projectCategories', defaultCategories);
  const [academicYears, setAcademicYears] = useLocalStorage<AcademicYear[]>('academicYears', defaultAcademicYears);

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
        class: "",
        year: new Date().getFullYear(),
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            appendImage({ url: reader.result });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (data: ProjectFormValues) => {
    onSubmit({
      ...data,
      id: project?.id || crypto.randomUUID(),
      students: data.students.map(s => s.name),
      images: data.images.map(img => img.url),
      date: format(new Date(), "MMMM d, yyyy"), // Set current date on submit
      category: data.category as ProjectCategory['name'],
      academicYear: data.academicYear as AcademicYear['year'],
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="capitalize">Project Details</CardTitle>
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
                              {categories.map(cat => (
                                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                              ))}
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
                           {academicYears.map(year => (
                                <SelectItem key={year.id} value={year.year}>{year.year}</SelectItem>
                            ))}
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
                <CardTitle className="capitalize">Students</CardTitle>
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
                 {form.formState.errors.students && <p className="text-sm font-medium text-destructive">{form.formState.errors.students?.root?.message || form.formState.errors.students.message}</p>}

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
            <CardTitle className="capitalize">Project Images</CardTitle>
            <CardDescription>Add images by URL or upload them from your device.</CardDescription>
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
              <div className="flex flex-col gap-2 aspect-video">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full h-1/2 flex flex-col items-center justify-center"
                    onClick={() => appendImage({ url: '' })}
                    >
                    <PlusCircle className="h-6 w-6 text-muted-foreground" />
                    <span className="mt-1 text-xs text-muted-foreground">Add by URL</span>
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                />
                <Button
                    type="button"
                    variant="outline"
                    className="w-full h-1/2 flex flex-col items-center justify-center"
                    onClick={() => fileInputRef.current?.click()}
                    >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="mt-1 text-xs text-muted-foreground">Upload</span>
                </Button>
              </div>
            </div>
            {form.formState.errors.images && <p className="text-sm font-medium text-destructive">{form.formState.errors.images?.root?.message || form.formState.errors.images.message}</p>}
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
