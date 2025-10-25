import Chatbot from '@/components/chatbot';

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Listo para conocer tu nivel de seguridad?</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Nuestro asistente de IA te hará un par de preguntas para empezar.
          </p>
        </div>
        <Chatbot />
      </div>
    </section>
  );
}
