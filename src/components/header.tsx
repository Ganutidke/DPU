import Link from 'next/link';
import { Icons } from './icons';
import { cookies } from 'next/headers';
import { Button } from './ui/button';
import { redirect } from 'next/navigation';
import { ActiveLink } from './active-link';

async function logout() {
    'use server';
    cookies().delete('session');
    redirect('/login');
}


export function Header() {
  const isLoggedIn = cookies().get('session');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center max-w-7xl">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-4">
            <Icons.logo className="h-14 w-14" />
            <div className="flex flex-col">
              <span className="font-bold font-headline text-xl text-primary sm:inline-block">
                Dr. D. Y. Patil Arts, Commerce & Science College
              </span>
              <span className="text-sm text-muted-foreground">Pimpri, Pune</span>
            </div>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-end gap-4 text-sm font-medium">
          <div className="flex items-center gap-1">
             <ActiveLink href="/events">Events</ActiveLink>
             <ActiveLink href="/student-corner">Student Corner</ActiveLink>
             {isLoggedIn && (
                 <ActiveLink href="/admin">Dashboard</ActiveLink>
             )}
          </div>
           <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <form action={logout}>
                <Button variant="outline" size="sm">Logout</Button>
              </form>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Admin Login</Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
