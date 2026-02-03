import { X } from 'lucide-react';
import { VerificationResult } from '../../types';
import { getSeverityConfig } from './utils';

interface PanelHeaderProps {
  result: VerificationResult | null;
  onClose?: () => void;
}

export function PanelHeader({ result, onClose }: PanelHeaderProps) {
  if (!result) {
    return null;
  }

  const config = getSeverityConfig(result);

  return (
    <div className={`p-4 ${config.bgClass} border-b ${config.borderClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <config.icon className={`w-5 h-5 ${config.textClass}`} />
          <span className={`text-sm font-semibold font-sans ${config.textClass}`}>
            {config.label}
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
  );
}
