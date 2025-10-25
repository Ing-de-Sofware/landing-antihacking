import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Code, Smartphone, Waypoints } from 'lucide-react';

const services = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Pentesting Web",
    description: "Análisis exhaustivo de aplicaciones web en busca de vulnerabilidades del OWASP Top 10 y más allá."
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Seguridad de APIs",
    description: "Evaluamos la robustez de tus APIs (REST, GraphQL) para prevenir fugas de datos y accesos no autorizados."
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Seguridad Móvil",
    description: "Auditoría de seguridad para aplicaciones iOS y Android, identificando fallos en el código y la comunicación."
  },
  {
    icon: <Waypoints className="h-10 w-10 text-primary" />,
    title: "Análisis de Redes",
    description: "Simulamos ataques a tu infraestructura de red interna y externa para encontrar puntos débiles."
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-muted/50 py-20 lg:py-32 section-animate">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary mb-4">Servicios</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Protegemos tu Negocio</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Una suite completa de servicios de ciberseguridad para cubrir todos los ángulos de tu empresa.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-8 bg-card border-2 border-transparent hover:border-primary/50 hover:bg-muted/80 transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="items-center p-0">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {service.icon}
                </div>
                <CardTitle className="mt-4 text-xl font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2 text-base text-muted-foreground">
                {service.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
