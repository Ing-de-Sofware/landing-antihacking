import { Scale, Gem, Rocket, GraduationCap } from 'lucide-react';

const reasons = [
  {
    icon: <Scale className="h-10 w-10 text-primary" />,
    title: "Enfoque Ético",
    description: "Nuestra brújula moral es inquebrantable. Operamos con la máxima transparencia e integridad."
  },
  {
    icon: <Gem className="h-10 w-10 text-primary" />,
    title: "Estándares de Industria",
    description: "Utilizamos las mismas herramientas y técnicas que los adversarios, pero para fortalecer tus defensas."
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: "Metodología Ágil",
    description: "Nos adaptamos rápidamente a tus sistemas y necesidades, ofreciendo resultados rápidos y comunicación constante."
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: "Supervisión Académica",
    description: "Nuestro trabajo está respaldado por investigación de vanguardia y la supervisión de expertos académicos."
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-card py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium text-primary mb-4">¿Por qué Nosotros?</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Marcamos la Diferencia</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Nuestros valores y experiencia nos separan del resto.</p>
        </div>
        <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="p-4 bg-muted/50 rounded-full">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
