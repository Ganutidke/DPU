'use server';

import { connectToDb } from '@/lib/db';
import { Event } from '@/lib/models';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from 'cloudinary';
import type { Event as EventType } from '@/lib/data';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({}, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    }).end(buffer);
  });
  return result.secure_url;
}

export async function createEvent(data: EventType) {
  try {
    await connectToDb();
    const newEvent = new Event(data);
    await newEvent.save();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create event');
  }

  revalidatePath('/admin');
  revalidatePath('/events');
  redirect('/admin');
}

export async function deleteEvent(eventId: string) {
    try {
        await connectToDb();
        await Event.findByIdAndDelete(eventId);
        revalidatePath('/admin');
        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to delete event' };
    }
}
