'use server';

import { connectToDb } from '@/lib/db';
import { Project } from '@/lib/models';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from 'cloudinary';
import type { Project as ProjectType } from '@/lib/data';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createProject(data: ProjectType) {
  try {
    await connectToDb();
    const newProject = new Project(data);
    await newProject.save();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create project');
  }

  revalidatePath('/admin');
  revalidatePath('/student-corner');
  redirect('/admin');
}

export async function deleteProject(projectId: string) {
    try {
        await connectToDb();
        await Project.findByIdAndDelete(projectId);
        revalidatePath('/admin');
        revalidatePath('/student-corner');
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to delete project' };
    }
}
