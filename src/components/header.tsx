"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '#services', label: 'Servicios' },
  { href: '#about', label: 'Quiénes Somos' },
  { href: '#methodology', label: 'Metodología' },
  { href: '#why-us', label: 'Por Qué Elegirnos' },
  { href: '#testimonials', label: 'Testimonios' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
           <ThemeToggle />
          <div className="hidden md:block">
            <Button asChild>
              <a href="#contact">Contacto</a>
            </Button>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className={cn("fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm", "md:hidden")} onClick={() => setIsOpen(false)}></div>
          <div className={cn("fixed inset-x-4 top-24 z-50 grid grid-flow-row auto-rows-max overflow-auto p-6 shadow-lg rounded-lg bg-popover", "md:hidden animate-in slide-in-from-bottom-80")}>
              <nav className="grid gap-4">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <Button asChild className="mt-4" onClick={() => setIsOpen(false)}>
                  <a href="#contact">Contacto</a>
                </Button>
              </nav>
          </div>
        </div>
      )}
    </header>
  );
}
