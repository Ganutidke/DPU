
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon, PlusCircle, X, Upload } from "lucide-react"
import Image from "next/image"
import React from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Event } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

const eventFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters.").max(100),
  date: z.date({ required_error: "A date is required." }),
  description: z.string().max(1000, "Description is too long.").min(10, "Description must be at least 10 characters."),
  type: z.enum(["Workshop", "Seminar", "Social", "Sports"]),
  year: z.enum(["All", "Freshman", "Sophomore", "Junior", "Senior"]),
  academicYear: z.enum(["2024-2025", "2023-2024"]),
  images: z.array(z.object({ url: z.string().url("Must be a valid URL or data URI.") })).min(1, "At least one image is required."),
  links: z.array(z.object({ title: z.string().min(1), url: z.string().url() })).optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>

interface EventFormProps {
  event?: Event;
  onSubmit: (data: Event) => void;
  onCancel: () => void;
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

  const defaultValues: Partial<EventFormValues> = event
    ? { 
        ...event,
        date: new Date(event.date),
        images: event.images.map(url => ({ url })),
      }
    : {
        title: "",
        description: "",
        type: "Workshop",
        year: "All",
        academicYear: "2024-2025",
        images: [],
        links: [],
      };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    name: "images",
    control: form.control,
  });

  const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({
    name: "links",
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


  const handleSubmit = (data: EventFormValues) => {
    onSubmit({
      id: event?.id || crypto.randomUUID(),
      ...data,
      date: format(data.date, "MMMM d, yyyy"),
      images: data.images.map(img => img.url),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Provide the core information about the event.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Annual Tech Summit" {...field} />
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
                      placeholder="Tell us a little bit about the event"
                      className="resize-none h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Seminar">Seminar</SelectItem>
                        <SelectItem value="Social">Social</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select target audience" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Freshman">Freshman</SelectItem>
                        <SelectItem value="Sophomore">Sophomore</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
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
            <CardTitle>Event Images</CardTitle>
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
                    className="w-full h-full flex flex-col items-center justify-center"
                    onClick={() => appendImage({ url: '' })}
                    >
                    <PlusCircle className="h-8 w-8 text-muted-foreground" />
                    <span className="mt-2 text-sm text-muted-foreground">Add by URL</span>
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
                    className="w-full h-full flex flex-col items-center justify-center"
                    onClick={() => fileInputRef.current?.click()}
                    >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="mt-2 text-sm text-muted-foreground">Upload</span>
                </Button>
              </div>
            </div>
             {form.formState.errors.images && <p className="text-sm font-medium text-destructive">{form.formState.errors.images?.root?.message || form.formState.errors.images.message}</p>}
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save Event</Button>
        </div>
      </form>
    </Form>
  )
}

    