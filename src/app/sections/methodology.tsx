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
    <section id="methodology" className="py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestra Metodología Probada</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">Un proceso transparente y estructurado en cuatro fases clave.</p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-8 hidden h-full w-full items-center justify-center lg:flex">
             <div className="h-[2px] w-full max-w-5xl bg-border"></div>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((item) => (
              <div key={item.phase} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-card border-2 border-accent text-accent text-2xl font-bold">
                  {item.phase}
                </div>
                <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
