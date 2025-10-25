import { Scale, Gem, Rocket, GraduationCap } from 'lucide-react';

const reasons = [
  {
    icon: <Scale className="h-10 w-10 text-accent" />,
    title: "Enfoque Ético",
    description: "Nuestra brújula moral es inquebrantable. Operamos con la máxima transparencia e integridad."
  },
  {
    icon: <Gem className="h-10 w-10 text-accent" />,
    title: "Herramientas Estándar de Industria",
    description: "Utilizamos las mismas herramientas y técnicas que los adversarios, pero para fortalecer tus defensas."
  },
  {
    icon: <Rocket className="h-10 w-10 text-accent" />,
    title: "Metodología Ágil",
    description: "Nos adaptamos rápidamente a tus sistemas y necesidades, ofreciendo resultados rápidos y comunicación constante."
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-accent" />,
    title: "Supervisión Académica",
    description: "Nuestro trabajo está respaldado por investigación de vanguardia y la supervisión de expertos académicos."
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-card py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Por Qué Elegirnos</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">Marcamos la diferencia con un enfoque único.</p>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
              {reason.icon}
              <h3 className="mt-4 text-xl font-bold">{reason.title}</h3>
              <p className="mt-2 text-base text-foreground/70">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
