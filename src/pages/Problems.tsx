import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";

export default function Problems() {
  const [user, setUser] = useState<any>(null);
  const [problems, setProblems] = useState<any[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/problems");
        setProblems(res.data);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchProblems();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <PageHeader title="Problems" description="Solve coding challenges" />

        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6">
          {problems.length === 0 ? (
            <p className="text-center font-mono text-sm text-muted-foreground">
              No problems found.
            </p>
          ) : (
            <ul className="space-y-4">
              {problems.map((prob: any, idx) => (
                <li key={idx} className="rounded-xl border border-border/40 bg-muted/10 p-4">
                  <h3 className="font-heading font-semibold text-foreground">
                    {prob.title || prob.name || `Problem ${idx + 1}`}
                  </h3>
                  {prob.description && (
                    <p className="mt-1 text-sm font-mono text-muted-foreground">
                      {prob.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}