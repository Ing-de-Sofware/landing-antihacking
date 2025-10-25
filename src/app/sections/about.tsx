import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const teamMembers = [
  { name: 'Líder de Equipo', imageId: 'team-lead' },
  { name: 'Coordinador de Proyectos', imageId: 'project-coordinator' },
  { name: 'Especialista en Seguridad', imageId: 'security-specialist-1' },
  { name: 'Especialista en Seguridad', imageId: 'security-specialist-2' },
];

function findImage(id: string) {
    return PlaceHolderImages.find(img => img.id === id);
}

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Quiénes Somos</h2>
            <p className="text-lg text-foreground/80">
              Somos un colectivo de hackers éticos y académicos apasionados por la seguridad. Nuestra misión es simple: fortalecer las defensas de nuestros clientes a través de un enfoque riguroso, creativo y transparente. Combinamos la agilidad de una startup con la profundidad de la investigación académica.
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="text-2xl font-bold tracking-tighter text-center md:text-left">Nuestro Equipo</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {teamMembers.map((member, index) => {
                const image = findImage(member.imageId);
                return (
                  <div key={index} className="flex flex-col items-center gap-2 text-center">
                    <Avatar className="h-24 w-24 border-2 border-primary/50">
                      <AvatarImage src={image?.imageUrl} alt={member.name} data-ai-hint={image?.imageHint} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold text-foreground/90">{member.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
