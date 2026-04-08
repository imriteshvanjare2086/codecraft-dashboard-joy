import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProfile } from "@/services/user";

export default function Profile() {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const isLoading = false;
  const isError = false;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <PageHeader title="Profile" description="Your account and current stats" />

        {isLoading ? (
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 text-center font-mono text-sm text-muted-foreground">
            Loading profile…
          </div>
        ) : isError || !user ? (
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 text-center font-mono text-sm text-muted-foreground">
            Couldn’t load profile. Please login again.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-heading text-base">Account</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Info label="Username" value={user.username} />
                <Info label="Email" value={user.email} />
                <Info label="Streak" value={`${user.streak} days`} />
                <Info label="Problems solved" value={`${user.problemsSolved}`} />
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="font-heading text-base">Platforms</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Info label="LeetCode" value={`${user.platformStats?.leetcode || 0}`} />
                <Info label="Codeforces" value={`${user.platformStats?.codeforces || 0}`} />
                <Info label="CodeChef" value={`${user.platformStats?.codechef || 0}`} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-muted/10 p-3">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-sm font-semibold text-foreground truncate">{value}</p>
    </div>
  );
}

