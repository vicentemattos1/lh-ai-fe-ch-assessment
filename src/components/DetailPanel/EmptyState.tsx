import { BookOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="text-center">
        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-sm text-muted-foreground">Click on a citation to see verification details.</p>
      </div>
    </div>
  );
}
