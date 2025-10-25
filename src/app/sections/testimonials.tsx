import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "CEO, TechCorp",
        avatar: "https://picsum.photos/seed/tc/100/100",
        rating: 5,
        quote: "El equipo de PentGuin transformó nuestra postura de seguridad. Su enfoque meticuloso descubrió vulnerabilidades críticas que habíamos pasado por alto. ¡Altamente recomendados!"
    },
    {
        name: "CTO, Innovate Inc.",
        avatar: "https://picsum.photos/seed/ii/100/100",
        rating: 5,
        quote: "Trabajar con ellos fue revelador. No solo identificaron los problemas, sino que nos enseñaron a pensar de manera más proactiva sobre la seguridad en nuestro ciclo de desarrollo."
    },
    {
        name: "Founder, SecureApp",
        avatar: "https://picsum.photos/seed/sa/100/100",
        rating: 5,
        quote: "Como startup, la seguridad es clave para ganar la confianza de los clientes. PentGuin nos dio la tranquilidad que necesitábamos con un pentest increíblemente detallado y práctico."
    },
    {
        name: "CISO, Global Finance",
        avatar: "https://picsum.photos/seed/gf/100/100",
        rating: 5,
        quote: "La profundidad técnica y la claridad de sus informes son excepcionales. Nos ayudaron a priorizar y solucionar los hallazgos de manera efectiva, mejorando nuestra seguridad general."
    },
    {
        name: "Lead Developer, DataSolutions",
        avatar: "https://picsum.photos/seed/ds/100/100",
        rating: 5,
        quote: "Apreciamos su enfoque colaborativo. Se sintió como si fueran una extensión de nuestro propio equipo, trabajando juntos para fortalecer nuestra aplicación desde adentro hacia afuera."
    }
]

export function Testimonials() {
    return (
        <section id="testimonials" className="py-20 lg:py-32 section-animate">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="text-center mb-16">
                    <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary mb-4">Testimonios</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Lo que dicen nuestros clientes</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">La confianza es nuestro mayor activo. Vea por qué las empresas nos eligen.</p>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 h-full">
                                    <Card className="h-full flex flex-col justify-between p-6 bg-card">
                                        <CardContent className="p-0 space-y-4">
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                    <AvatarFallback>{testimonial.name.split(" ").map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{testimonial.name}</p>
                                                    <div className="flex items-center gap-0.5">
                                                        {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                                                    </div>
                                                </div>
                                            </div>
                                            <blockquote className="text-muted-foreground border-l-4 border-primary pl-4 italic">
                                                "{testimonial.quote}"
                                            </blockquote>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
}
