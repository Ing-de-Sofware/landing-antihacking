import { Scale, Gem, Rocket, GraduationCap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const reasons = [
  {
    icon: <Scale className="h-8 w-8" />,
    title: "Enfoque Ético",
    description: "Nuestra brújula moral es inquebrantable. Operamos con la máxima transparencia e integridad."
  },
  {
    icon: <Gem className="h-8 w-8" />,
    title: "Estándares de Industria",
    description: "Utilizamos las mismas herramientas y técnicas que los adversarios, pero para fortalecer tus defensas."
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Metodología Ágil",
    description: "Nos adaptamos rápidamente a tus sistemas y necesidades, ofreciendo resultados rápidos y comunicación constante."
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Supervisión Académica",
    description: "Nuestro trabajo está respaldado por investigación de vanguardia y la supervisión de expertos académicos."
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-muted/30 py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary mb-4">¿Por qué Nosotros?</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Marcamos la Diferencia</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Nuestros valores y experiencia nos separan del resto.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
             <Card key={index} className="bg-card border-border/50 transform transition-all hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4 p-6">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                    {reason.icon}
                </div>
                <CardTitle className="text-xl font-headline">{reason.title}</CardTitle>
              </CardHeader>
              <CardDescription className="px-6 pb-6 text-base">
                {reason.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
