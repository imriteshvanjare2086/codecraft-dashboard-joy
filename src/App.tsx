import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import LearningPath from "./pages/LearningPath.tsx";
import Problems from "./pages/Problems.tsx";
import Onboarding from "./pages/Onboarding.tsx";

const queryClient = new QueryClient();

const App = () => {
  const { ready, error } = useAuthBootstrap();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!ready ? (
          <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="max-w-md w-full rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6">
              <p className="text-sm font-mono text-foreground">Starting…</p>
              {error && <p className="text-xs font-mono text-destructive mt-2">{error}</p>}
              <p className="text-[10px] font-mono text-muted-foreground mt-3">
                If this hangs, start the backend and MongoDB, then refresh.
              </p>
            </div>
          </div>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/learning-path" element={<LearningPath />} />
              <Route path="/problems" element={<Problems />} />
              <Route path="/onboarding" element={<Onboarding />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
