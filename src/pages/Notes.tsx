import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";

export default function Notes() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        <PageHeader title="Notes" description="Keep your study notes here (backend integration pending)." />
        <div className="rounded-2xl border border-dashed border-border/50 bg-muted/10 p-6 text-center font-mono text-sm text-muted-foreground">
          No notes yet.
        </div>
      </div>
    </DashboardLayout>
  );
}

