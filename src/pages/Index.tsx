import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { HeroStats } from "@/components/dashboard/HeroStats";
import { ContributionGraph } from "@/components/dashboard/ContributionGraph";
import { PlatformCards } from "@/components/dashboard/PlatformCards";
import { RatingGraph } from "@/components/dashboard/RatingGraph";
import { SmartRecommendations } from "@/components/dashboard/SmartRecommendations";
import { GoalsSection } from "@/components/dashboard/GoalsSection";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-5">
        <PageHeader
          title="Dashboard"
          description="Track your competitive programming journey"
        />
        <HeroStats />
        <ContributionGraph />
        <PlatformCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RatingGraph />
          </div>
          <GoalsSection />
        </div>
        <SmartRecommendations />
      </div>
    </DashboardLayout>
  );
};

export default Index;
