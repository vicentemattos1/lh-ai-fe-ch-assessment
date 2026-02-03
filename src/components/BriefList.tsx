import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { briefApi } from '../services/briefApi';
import { Brief } from '../types';
import { AppHeader } from './AppHeader';
import { StatBadge } from './VerificationSummary/StatBadge';

export function BriefList() {
  const { data: briefs, isLoading, isError } = useQuery({
    queryKey: ['briefs'],
    queryFn: () => briefApi.fetchAllBriefs(),
  });

  if (isLoading) {
    return (
      <div className="relative flex h-screen overflow-hidden flex-col">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading briefs...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative flex h-screen overflow-hidden flex-col">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-destructive">Error loading briefs. Please try again.</div>
        </div>
      </div>
    );
  }

  if (!briefs || briefs.length === 0) {
    return (
      <div className="relative flex h-screen overflow-hidden flex-col">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">No briefs found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen overflow-hidden flex-col">
      <AppHeader />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Legal Briefs</h1>
            <p className="text-muted-foreground">
              Select a brief to view its content and citation verification results.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {briefs.map((brief) => (
              <BriefCard key={brief.id} brief={brief} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefCard({ brief }: { brief: Brief }) {
  const validCount = brief.verificationResults.filter((r) => r.status === 'valid').length;
  const warningCount = brief.verificationResults.filter(
    (r) => r.severity === 'warning'
  ).length;
  const criticalCount = brief.verificationResults.filter(
    (r) => r.severity === 'critical'
  ).length;

  return (
    <Link
      to={`/${brief.id}`}
      className="block p-6 border border-border rounded-lg hover:bg-[#1a1f2e]/10 transition-colors group"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {brief.title || `Brief ${brief.id}`}
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {brief.content.substring(0, 150)}...
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-border">
        <div className="flex gap-2">
          <span className="text-xs text-muted-foreground">
            {brief.citations.length} citation{brief.citations.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatBadge type="valid" count={validCount} />
          <StatBadge type="warning" count={warningCount} />
          <StatBadge type="critical" count={criticalCount} />
        </div>
      </div>
    </Link>
  );
}
