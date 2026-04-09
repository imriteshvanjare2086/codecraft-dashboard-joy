import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { GoalsSection } from "@/components/dashboard/GoalsSection";
import { SmartRecommendations } from "@/components/dashboard/SmartRecommendations";

export default function Goals() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <PageHeader 
          title="Daily Goals & Recommendations" 
          description="Track your daily coding targets and get AI-powered problem suggestions." 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <GoalsSection />
          </div>
          <div className="lg:col-span-8">
            <SmartRecommendations />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

