import { AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { VerificationResult } from '../../types';

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'valid':
      return 'Citation Verified';
    case 'not_found':
      return 'Case Not Found';
    case 'quote_mismatch':
      return 'Quote Mismatch';
    case 'overruled':
      return 'Authority Limited';
    default:
      return status;
  }
}

export function getSeverityConfig(result: VerificationResult) {
  switch (result.severity) {
    case 'critical':
      return {
        icon: XCircle,
        label: 'Critical Issue',
        bgClass: 'bg-severity-critical-bg',
        borderClass: 'border-severity-critical-border',
        textClass: 'text-severity-critical',
      };
    case 'warning':
      return {
        icon: AlertTriangle,
        label: 'Warning',
        bgClass: 'bg-severity-warning-bg',
        borderClass: 'border-severity-warning-border',
        textClass: 'text-severity-warning',
      };
    default:
      return {
        icon: CheckCircle,
        label: 'Verified',
        bgClass: 'bg-severity-valid-bg',
        borderClass: 'border-severity-valid-border',
        textClass: 'text-severity-valid',
      };
  }
}
