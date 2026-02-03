import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface StatBadgeProps {
  type: 'valid' | 'warning' | 'critical';
  count: number;
}

export function StatBadge({ type, count }: StatBadgeProps) {
  if (count === 0) {
    return null;
  }

  const config = {
    valid: {
      icon: CheckCircle,
      iconClass: 'text-severity-valid',
      countClass: 'text-severity-valid',
      label: 'verified',
    },
    warning: {
      icon: AlertTriangle,
      iconClass: 'text-severity-warning',
      countClass: 'text-severity-warning',
      label: 'warnings',
    },
    critical: {
      icon: XCircle,
      iconClass: 'text-severity-critical',
      countClass: 'text-severity-critical',
      label: 'critical',
    },
  };

  const { icon: Icon, iconClass, countClass, label } = config[type];

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Icon className={`w-4 h-4 ${iconClass}`} />
      <span className={`font-medium ${countClass}`}>{count}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
