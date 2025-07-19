"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import type { Project } from "@/lib/types"

const projectFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").max(100),
  student: z.string().min(2, "Student name is required.").max(50),
  year: z.coerce.number().min(2000, "Year must be 2000 or later.").max(new Date().getFullYear() + 1),
  category: z.enum(["Technology", "Art", "Science", "Business"]),
  description: z.string().max(500).optional(),
  imageUrl: z.string().url("Must be a valid URL").optional(),
})

type ProjectFormValues = z.infer<typeof projectFormSchema>

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (data: Project) => void;
  onClose: () => void;
}

export function ProjectForm({ project, onSubmit, onClose }: ProjectFormProps) {
  const defaultValues: Partial<ProjectFormValues> = project || { category: "Technology" };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const handleSubmit = (data: ProjectFormValues) => {
    onSubmit({
      ...data,
      id: project?.id || crypto.randomUUID(),
      description: data.description || "",
      imageUrl: data.imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(data.title)}`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="student"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="2024" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
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
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Art">Art</SelectItem>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about the project"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  )
}
