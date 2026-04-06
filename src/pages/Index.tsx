import { DashboardLayout } from "@/components/DashboardLayout";
import { HeroStats } from "@/components/dashboard/HeroStats";
import { ContributionGraph } from "@/components/dashboard/ContributionGraph";
import { PlatformCards } from "@/components/dashboard/PlatformCards";
import { RatingGraph } from "@/components/dashboard/RatingGraph";
import { Insights } from "@/components/dashboard/Insights";

import { GoalsSection } from "@/components/dashboard/GoalsSection";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">Track your competitive programming journey</p>
        </div>
        <HeroStats />
        <ContributionGraph />
        <PlatformCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RatingGraph />
          </div>
          <GoalsSection />
        </div>
        <Insights />
        
      </div>
    </DashboardLayout>
  );
};

export default Index;
