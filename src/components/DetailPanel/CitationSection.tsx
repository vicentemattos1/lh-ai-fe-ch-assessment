import { BookOpen } from 'lucide-react';
import { Citation } from '../../types';

interface CitationSectionProps {
  citation: Citation;
}

export function CitationSection({ citation }: CitationSectionProps) {
  return (
    <section>
      <h3 className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
        <BookOpen className="w-3.5 h-3.5" />
        Citation
      </h3>
      <p className="text-sm text-foreground leading-relaxed">{citation.text}</p>
    </section>
  );
}
