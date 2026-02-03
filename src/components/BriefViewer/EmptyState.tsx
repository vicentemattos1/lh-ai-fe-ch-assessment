import { FileText, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  onRefresh?: () => void;
}

export function EmptyState({ onRefresh }: EmptyStateProps) {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <FileText className="w-12 h-12 text-muted-foreground" />
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">No brief available</h2>
            <p className="text-sm text-muted-foreground mb-4">
              This brief appears to be empty or unavailable.
            </p>
          </div>
          {onRefresh && (
            <button
              onClick={() => onRefresh()}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
