import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Methodology() {
  const phases = [
    {
      phase: "01",
      title: "Planificación y Alcance",
      description: "Definimos juntos los objetivos, el alcance del pentest y las reglas de enfrentamiento para una evaluación segura y efectiva."
    },
    {
      phase: "02",
      title: "Reconocimiento",
      description: "Recopilamos información pasiva y activa sobre los sistemas objetivo para identificar posibles vectores de ataque."
    },
    {
      phase: "03",
      title: "Explotación Controlada",
      description: "Intentamos explotar las vulnerabilidades encontradas de manera controlada para demostrar el impacto real sin causar daños."
    },
    {
      phase: "04",
      title: "Reporte y Remediación",
      description: "Entregamos un informe detallado con los hallazgos, su nivel de riesgo y recomendaciones claras para la remediación."
    }
  ];
  return (
    <section id="methodology" className="py-20 lg:py-32 section-animate">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium text-primary mb-4">Nuestro Proceso</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Metodología Probada</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Un proceso transparente y estructurado en cuatro fases clave.</p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-10 hidden h-full w-[2px] -translate-x-1/2 bg-border lg:block"></div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {phases.map((item, index) => (
              <div key={item.phase} className={`flex items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="relative z-10 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-card border-4 border-primary text-primary text-3xl font-bold">
                  {item.phase}
                </div>
                <Card className={`w-full ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                  <CardHeader>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
