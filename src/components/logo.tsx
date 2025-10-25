import { Shield } from 'lucide-react';

export default function Logo() {
  return (
    <a href="#" className="flex items-center gap-2" aria-label="CyberGuard Homepage">
      <Shield className="h-7 w-7 text-accent" />
      <span className="text-xl font-bold text-foreground">CyberGuard</span>
    </a>
  );
}
