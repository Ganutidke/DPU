import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 mt-12 bg-card border-t">
      <div className="container max-w-7xl flex items-center justify-center text-sm text-muted-foreground">
        <p className="flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> by Ganesh Tidake & Yash Kale
        </p>
      </div>
    </footer>
  );
}
