import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center gap-10 px-4 py-20 text-center md:px-6">
       <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary">
        <ShieldCheck className="h-5 w-5" />
        <span>Seguridad de Nivel Élite</span>
      </div>
      <div className="max-w-4xl space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
          Descubre tus vulnerabilidades <span className="text-primary">antes</span> que los atacantes
        </h1>
        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
          Ofrecemos evaluaciones de seguridad de élite para proteger tus activos digitales más críticos. Anticípate a las amenazas con nuestro equipo de expertos.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
          <a href="#contact">
            Hablar con IA
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="#services">Ver Servicios</a>
        </Button>
      </div>
    </section>
  );
}
