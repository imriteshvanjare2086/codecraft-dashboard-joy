import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";

export default function Goals() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        <PageHeader title="Goals" description="Set goals and track them (backend integration pending)." />
        <div className="rounded-2xl border border-dashed border-border/50 bg-muted/10 p-6 text-center font-mono text-sm text-muted-foreground">
          No goals yet.
        </div>
      </div>
    </DashboardLayout>
  );
}

