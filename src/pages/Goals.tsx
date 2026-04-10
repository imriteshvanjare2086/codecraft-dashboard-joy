import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Sparkles, Plus, Flag } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Goal } from "@/components/goals/types";
import { GoalCard } from "@/components/goals/GoalCard";
import { AddGoalModal } from "@/components/goals/AddGoalModal";
import { RecommendationCard } from "@/components/goals/RecommendationCard";

type Tab = "goals" | "recommendations";

export default function Goals() {
  const [activeTab, setActiveTab] = useState<Tab>("goals");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("codecraft_goals");
    if (saved) {
      try {
        setGoals(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse goals", e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("codecraft_goals", JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = (newGoal: Goal) => {
    setGoals((prev) => [newGoal, ...prev]);
    setIsAddModalOpen(false);
  };

  const handleCompleteGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, status: "Completed", progress: 100 } : g
      )
    );
  };

  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <PageHeader
          title="Goals & Recommendations"
          description="Track your daily targets and get AI-powered problem suggestions."
        />

        {/* Top Tabs */}
        <div className="flex border-b border-border/40">
          <button
            onClick={() => setActiveTab("goals")}
            className={`flex items-center gap-2 px-6 py-4 font-heading font-semibold text-sm transition-all relative ${
              activeTab === "goals"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Target className="h-4 w-4" />
            My Goals
            {activeTab === "goals" && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`flex items-center gap-2 px-6 py-4 font-heading font-semibold text-sm transition-all relative ${
              activeTab === "recommendations"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Recommendations
            {activeTab === "recommendations" && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "goals" && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-lg font-semibold text-foreground">Active Targets</h2>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="gap-2 rounded-xl"
                >
                  <Plus className="h-4 w-4" />
                  Add Goal
                </Button>
              </div>

              {goals.length === 0 ? (
                <div className="glass rounded-3xl border border-dashed border-border/50 p-12 text-center flex flex-col items-center justify-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/20 border border-border/40">
                    <Flag className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-foreground">No goals added yet</h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      Set a daily target to stay focused on your learning journey.
                    </p>
                  </div>
                  <Button onClick={() => setIsAddModalOpen(true)} variant="outline" className="mt-4 gap-2 rounded-xl">
                    <Plus className="h-4 w-4" /> Create First Goal
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence>
                    {goals.map((goal) => (
                      <GoalCard
                        key={goal.id}
                        goal={goal}
                        onComplete={handleCompleteGoal}
                        onDelete={handleDeleteGoal}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "recommendations" && (
            <motion.div
              key="recs"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  No recommendations available yet
                </h2>
                <p className="font-mono text-sm text-muted-foreground max-w-md">
                  Recommendations will appear based on your activity and weak areas over time. Keep solving problems to unlock these modules!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RecommendationCard type="Weak Topics" />
                <RecommendationCard type="What to Do Next" />
                <RecommendationCard type="Study Suggestions" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <AddGoalModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddGoal}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
