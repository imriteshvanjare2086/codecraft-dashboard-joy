import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { HeroStats } from "@/components/dashboard/HeroStats";
import { ContributionGraph } from "@/components/dashboard/ContributionGraph";
import { PlatformCards } from "@/components/dashboard/PlatformCards";
import { RatingGraph } from "@/components/dashboard/RatingGraph";

import { useParams } from "react-router-dom";
import { useDashboard } from "@/hooks/useDashboard";

const Index = () => {
  const { userId } = useParams();
  const { data: dash, isLoading } = useDashboard(userId);
  const isOwnDashboard = !userId;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-5">
        <PageHeader
          title={isOwnDashboard ? "Dashboard" : `${dash?.profile?.username}'s Dashboard`}
          description={isOwnDashboard ? "Track your competitive programming journey" : `Viewing ${dash?.profile?.username}'s coding profile and history`}
        />
        <HeroStats stats={dash?.heroStats} />
        <ContributionGraph stats={dash?.heroStats} />
        <PlatformCards stats={dash?.profile?.platformStats} />
        <div className="w-full">
          <RatingGraph userId={userId} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
