import { X, AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  onClose?: () => void;
}

export function ErrorState({ onClose }: ErrorStateProps) {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <span className="text-sm font-semibold font-sans text-destructive">
              Error loading details
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
        <div className="flex flex-col items-center gap-3 max-w-sm text-center">
          <AlertCircle className="w-12 h-12 text-destructive" />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Failed to load citation</h3>
            <p className="text-sm text-muted-foreground">
              There was an error loading the citation details. Please try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
