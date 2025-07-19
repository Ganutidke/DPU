'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  // In a real app, you would have proper validation and hashing
  const adminUsername = process.env.ADMIN_USERNAME || 'ganesh';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ganesh';

  if (username === adminUsername && password === adminPassword) {
    cookies().set('session', 'true', { httpOnly: true, path: '/' });
    // The middleware will handle the redirect to /admin
    redirect('/admin');
  } else {
    return 'Invalid username or password.';
  }
}
