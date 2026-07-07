'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const NAV = [
  { label: 'Home', href: '#hero' },
  { label: 'Origin', href: '#origin' },
  { label: 'Projects', href: '#projects' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Research', href: '#research' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Contact', href: '#contact' },
];

interface SiteHeaderProps {
  scrolled: boolean;
}

export default function SiteHeader({ scrolled }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="site-brand">
        <Image src="/logo.png" alt="DT" width={28} height={28} className="rounded-md" />
        <span>Danyal Tanveer</span>
      </a>

      <div className="site-header-actions">
        <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
          <a href="mailto:danyaltanveer0276@gmail.com">Contact</a>
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="menu-nav">
              <p className="menu-label">Navigation</p>
              {NAV.map((item, i) => (
                <SheetClose key={item.href} asChild>
                  <a
                    href={item.href}
                    className="menu-link"
                    style={{ animationDelay: `${i * 0.05}s` }}
                    onClick={() => setOpen(false)}
                  >
                    <span className="menu-index">0{i + 1}</span>
                    {item.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="menu-footer">
              <p className="menu-label">Connect</p>
              <div className="menu-socials">
                <a href="https://github.com/Danyal-0276" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/danyal-tanveer" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="mailto:danyaltanveer0276@gmail.com">Email</a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
