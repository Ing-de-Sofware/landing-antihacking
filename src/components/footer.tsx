import Logo from '@/components/logo';

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <Logo />
        <p className="text-sm text-foreground/60">
          © {new Date().getFullYear()} CyberGuard Consulting. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
