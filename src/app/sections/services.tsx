import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Code, Smartphone, Waypoints } from 'lucide-react';

const services = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-accent" />,
    title: "Pentesting Web",
    description: "Análisis exhaustivo de aplicaciones web en busca de vulnerabilidades del OWASP Top 10 y más allá."
  },
  {
    icon: <Code className="h-10 w-10 text-accent" />,
    title: "Seguridad de APIs",
    description: "Evaluamos la robustez de tus APIs (REST, GraphQL) para prevenir fugas de datos y accesos no autorizados."
  },
  {
    icon: <Smartphone className="h-10 w-10 text-accent" />,
    title: "Seguridad Móvil",
    description: "Auditoría de seguridad para aplicaciones iOS y Android, identificando fallos en el código y la comunicación."
  },
  {
    icon: <Waypoints className="h-10 w-10 text-accent" />,
    title: "Análisis de Redes",
    description: "Simulamos ataques a tu infraestructura de red interna y externa para encontrar puntos débiles en la configuración."
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-card py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestros Servicios</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">Protegemos tu negocio desde todos los ángulos.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 bg-card hover:bg-muted/60 border-2 border-transparent hover:border-accent transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="items-center p-0">
                {service.icon}
                <CardTitle className="mt-4 text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2 text-base text-foreground/70">
                {service.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
