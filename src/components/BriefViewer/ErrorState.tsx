import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  onRefresh?: () => void;
}

export function ErrorState({ onRefresh }: ErrorStateProps) {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-destructive" />
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Failed to load brief</h2>
            <p className="text-sm text-muted-foreground">
              There was an error loading the brief. Please try again later.
            </p>
          </div>
          {onRefresh && (
            <button
              onClick={() => onRefresh()}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium mt-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
