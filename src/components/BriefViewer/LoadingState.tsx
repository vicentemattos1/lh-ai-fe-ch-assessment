import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading brief...</p>
        </div>
      </div>
    </div>
  );
}
