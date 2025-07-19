import Link from 'next/link';
import { Icons } from './icons';
import { cookies } from 'next/headers';
import { Button } from './ui/button';
import { redirect } from 'next/navigation';

async function logout() {
    'use server';
    cookies().delete('session');
    redirect('/login');
}


export function Header() {
  const isLoggedIn = cookies().get('session');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg sm:inline-block">
              CampusConnect
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-between gap-6 text-sm">
          <div className="flex gap-6">
             <Link
                href="/events"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
             >
                Events
             </Link>
             <Link
                href="/student-corner"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
             >
                Student Corner
             </Link>
             {isLoggedIn && (
                 <Link
                    href="/admin"
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                 >
                    Dashboard
                 </Link>
             )}
          </div>
           <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <form action={logout}>
                <Button variant="outline" size="sm">Logout</Button>
              </form>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
