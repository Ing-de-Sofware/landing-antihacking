import { Shield } from 'lucide-react';

export default function Logo() {
  return (
    <a href="#" className="flex items-center gap-2" aria-label="PentGuin Homepage">
      <Shield className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold font-headline text-foreground">PentGuin</span>
    </a>
  );
}
