import Chatbot from '@/components/chatbot';

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary mb-4">Contacto</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Listo para conversar?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nuestro asistente de IA está listo para responder tus preguntas, ayudarte con ideas o simplemente charlar. ¡Pruébalo!
          </p>
        </div>
        <Chatbot />
      </div>
    </section>
  );
}
