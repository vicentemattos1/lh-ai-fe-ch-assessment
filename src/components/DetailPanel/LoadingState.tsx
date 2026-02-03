import { X, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  onClose?: () => void;
}

export function LoadingState({ onClose }: LoadingStateProps) {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
            <span className="text-sm font-semibold font-sans text-muted-foreground">
              Loading details...
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-black/5 transition-colors"
              aria-label="Close panel"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading citation details...</p>
        </div>
      </div>
    </div>
  );
}
