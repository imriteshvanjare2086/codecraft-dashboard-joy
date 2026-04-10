import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TourStep {
  targetId: string;
  title: string;
  description: string;
  position: "bottom" | "top" | "left" | "right";
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: "tour-sidebar",
    title: "Main Navigation",
    description: "Access all features including Learning Paths, Goals, and the CodeT AI Assistant from here.",
    position: "right",
  },
  {
    targetId: "tour-search",
    title: "Global Search",
    description: "Quickly find any feature or problem using the Command+K search bar.",
    position: "bottom",
  },
  {
    targetId: "tour-stats",
    title: "Performance Heatmap",
    description: "Track your daily consistency and problem-solving activity across multiple platforms.",
    position: "bottom",
  },
  {
    targetId: "tour-platforms",
    title: "Platform Stats",
    description: "Detailed metrics for your LeetCode, Codeforces, and CodeChef accounts gathered in one place.",
    position: "top",
  },
  {
    targetId: "tour-profile",
    title: "Your Account",
    description: "Manage your profile, change your photo, and view your account settings here.",
    position: "bottom",
  },
];

export function WebsiteTour({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = TOUR_STEPS[currentStep];

  useEffect(() => {
    const updateRect = () => {
      const el = document.getElementById(step.targetId);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      }
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);
    
    // Periodically check in case of layout shifts
    const interval = setInterval(updateRect, 500);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      clearInterval(interval);
    };
  }, [step]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!targetRect) return null;

  // Spotlight positioning
  const spotlightStyle = {
    top: targetRect.top - 8,
    left: targetRect.left - 8,
    width: targetRect.width + 16,
    height: targetRect.height + 16,
  };

  // Tooltip positioning helper with viewport awareness
  const getTooltipPosition = () => {
    const gap = 20;
    const tooltipWidth = 320;
    let top = 0;
    let left = 0;

    switch (step.position) {
      case "right":
        top = targetRect.top;
        left = targetRect.right + gap;
        break;
      case "left":
        top = targetRect.top;
        left = targetRect.left - gap - tooltipWidth;
        break;
      case "top":
        top = targetRect.top - gap - 180;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case "bottom":
      default:
        top = targetRect.bottom + gap;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
    }

    // Viewport clamping
    const padding = 20;
    const viewportWidth = window.innerWidth;
    
    if (left < padding) left = padding;
    if (left + tooltipWidth > viewportWidth - padding) {
      left = viewportWidth - tooltipWidth - padding;
    }

    return { top, left };
  };

  const tooltipPos = getTooltipPosition();

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
      {/* Dimmed Overlay with Spotlight Hole */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-[2px] pointer-events-auto"
        style={{
          clipPath: `polygon(
            0% 0%, 
            0% 100%, 
            ${spotlightStyle.left}px 100%, 
            ${spotlightStyle.left}px ${spotlightStyle.top}px, 
            ${spotlightStyle.left + spotlightStyle.width}px ${spotlightStyle.top}px, 
            ${spotlightStyle.left + spotlightStyle.width}px ${spotlightStyle.top + spotlightStyle.height}px, 
            ${spotlightStyle.left}px ${spotlightStyle.top + spotlightStyle.height}px, 
            ${spotlightStyle.left}px 100%, 
            100% 100%, 
            100% 0%
          )`,
        }}
      />

      {/* Actual spotlight highlight border */}
      <motion.div
        layoutId="spotlight"
        className="absolute rounded-2xl border-2 border-primary shadow-[0_0_30px_rgba(59,130,246,0.5)] z-10"
        animate={spotlightStyle}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />

      {/* Tooltip Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="absolute w-[320px] glass rounded-3xl border border-primary/30 p-6 shadow-2xl pointer-events-auto z-20"
          style={tooltipPos}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <button onClick={onComplete} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          <h3 className="font-heading text-lg font-bold text-foreground mb-1">
            {step.title}
          </h3>
          <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6">
            {step.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-foreground font-bold">
              STEP {currentStep + 1} OF {TOUR_STEPS.length}
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBack} 
                className="h-8 rounded-lg text-[10px] font-mono"
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-3 w-3 mr-1" /> BACK
              </Button>
              <Button 
                size="sm" 
                onClick={handleNext} 
                className="h-8 rounded-lg text-[10px] font-mono px-4"
              >
                {currentStep === TOUR_STEPS.length - 1 ? "FINISH" : "NEXT"} <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
