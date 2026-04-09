import { Lock, Sparkles, BrainCircuit, Activity } from "lucide-react";

export function RecommendationCard({
  type,
}: {
  type: "Weak Topics" | "What to Do Next" | "Study Suggestions";
}) {
  const getCardDetails = () => {
    switch (type) {
      case "Weak Topics":
        return {
          icon: <BrainCircuit className="h-6 w-6 text-rose-500/50" />,
          title: "Weak Topics",
          desc: "Track your weak areas to get personalised suggestions.",
        };
      case "What to Do Next":
        return {
          icon: <Activity className="h-6 w-6 text-sky-500/50" />,
          title: "What to Do Next",
          desc: "Complete more problems to unlock guided next steps.",
        };
      case "Study Suggestions":
        return {
          icon: <Sparkles className="h-6 w-6 text-amber-500/50" />,
          title: "Study Suggestions",
          desc: "Personalized roadmaps based on your active goals.",
        };
    }
  };

  const details = getCardDetails();

  return (
    <div className="glass relative overflow-hidden rounded-2xl border border-border/50 p-6 opacity-70 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
      {/* Locked overlay effect */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10">
        <Lock className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="font-mono text-xs text-muted-foreground font-semibold tracking-widest uppercase">
          Locked
        </p>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/20 border border-border/40 mb-5">
        {details.icon}
      </div>
      
      <h3 className="font-heading text-lg font-bold text-foreground mb-2">
        {details.title}
      </h3>
      <p className="font-mono text-sm text-muted-foreground">
        {details.desc}
      </p>

      {/* Fake UI elements to look like a placeholder structure */}
      <div className="mt-6 flex flex-col gap-3 opacity-30 pointer-events-none blur-[2px]">
        <div className="h-8 w-full rounded-lg bg-muted/50 border border-dashed border-border/50" />
        <div className="h-8 w-3/4 rounded-lg bg-muted/50 border border-dashed border-border/50" />
      </div>
    </div>
  );
}
