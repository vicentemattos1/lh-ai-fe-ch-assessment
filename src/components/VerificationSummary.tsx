import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, FileText, Loader2 } from 'lucide-react';
import { Brief } from '../types';

interface VerificationSummaryProps {
  brief: Brief | undefined;
  isLoading?: boolean;
}

export function VerificationSummary({ brief, isLoading }: VerificationSummaryProps) {
  // Loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 flex items-center gap-6 px-8 py-3 bg-card rounded-lg border border-border shadow-sm lg:px-12"
      >
        <div className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="font-medium">Loading citations...</span>
        </div>
      </motion.div>
    );
  }

  // Empty state
  if (!brief || brief.citations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4 flex items-center justify-center gap-2 px-8 py-3 bg-card rounded-lg border border-border shadow-sm lg:px-12"
      >
        <FileText className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-sans text-muted-foreground">No citations available</span>
      </motion.div>
    );
  }

  const stats = brief.verificationResults.reduce(
    (acc, result) => {
      switch (result.severity) {
        case 'critical':
          acc.critical++;
          break;
        case 'warning':
          acc.warning++;
          break;
        default:
          acc.valid++;
      }
      return acc;
    },
    { valid: 0, warning: 0, critical: 0 }
  );

  const total = brief.citations.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 flex items-center gap-6 px-8 py-3 bg-card rounded-lg border border-border shadow-sm lg:px-12"
    >
      <div className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
        <FileText className="w-4 h-4" />
        <span className="font-medium">{total} Citations</span>
      </div>

      <div className="h-4 w-px bg-border" />

      <div className="flex items-center gap-4">
        {stats.valid > 0 && (
          <div className="flex items-center gap-1.5 text-sm">
            <CheckCircle className="w-4 h-4 text-severity-valid" />
            <span className="font-medium text-severity-valid">{stats.valid}</span>
            <span className="text-muted-foreground">verified</span>
          </div>
        )}

        {stats.warning > 0 && (
          <div className="flex items-center gap-1.5 text-sm">
            <AlertTriangle className="w-4 h-4 text-severity-warning" />
            <span className="font-medium text-severity-warning">{stats.warning}</span>
            <span className="text-muted-foreground">warnings</span>
          </div>
        )}

        {stats.critical > 0 && (
          <div className="flex items-center gap-1.5 text-sm">
            <XCircle className="w-4 h-4 text-severity-critical" />
            <span className="font-medium text-severity-critical">{stats.critical}</span>
            <span className="text-muted-foreground">critical</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}