import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section id="hero" className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center gap-8 px-4 py-20 text-center md:px-6">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
          Descubre tus vulnerabilidades <span className="text-accent">antes</span> que los atacantes
        </h1>
        <p className="mt-6 text-lg text-foreground/80 md:text-xl">
          Ofrecemos evaluaciones de seguridad de élite para proteger tus activos digitales más críticos. Anticípate a las amenazas con nuestro equipo de expertos.
        </p>
      </div>
      <Button size="lg" asChild className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
        <a href="#contact">Solicita una Evaluación Gratuita</a>
      </Button>
    </section>
  );
}
