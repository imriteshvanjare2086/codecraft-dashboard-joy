import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";

export default function Leaderboard() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        <PageHeader title="Leaderboard" description="This section will be wired to backend data next." />
        <div className="rounded-2xl border border-dashed border-border/50 bg-muted/10 p-6 text-center font-mono text-sm text-muted-foreground">
          No leaderboard data yet.
        </div>
      </div>
    </DashboardLayout>
  );
}

