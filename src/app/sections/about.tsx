import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Users } from 'lucide-react';

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
        <div className="grid gap-16 md:grid-cols-2 md:gap-24 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium text-primary">Sobre Nosotros</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Quiénes Somos</h2>
            <p className="text-lg text-muted-foreground">
              Somos un colectivo de hackers éticos y académicos apasionados por la seguridad. Nuestra misión es simple: fortalecer las defensas de nuestros clientes a través de un enfoque riguroso, creativo y transparente. Combinamos la agilidad de una startup con la profundidad de la investigación académica.
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Users className="h-10 w-10 text-primary"/>
              </div>
              <h3 className="text-2xl font-bold tracking-tighter">Nuestro Equipo</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {teamMembers.map((member, index) => {
                const image = findImage(member.imageId);
                return (
                  <div key={index} className="flex flex-col items-center gap-3 text-center">
                    <Avatar className="h-28 w-28 border-4 border-muted transition-all hover:border-primary/70">
                      <AvatarImage src={image?.imageUrl} alt={member.name} data-ai-hint={image?.imageHint} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-sm text-muted-foreground">Experto</p>
                    </div>
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
