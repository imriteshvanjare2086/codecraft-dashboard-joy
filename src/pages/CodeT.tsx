import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";

export default function CodeT() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-6 h-[calc(100vh-10rem)] flex flex-col">
        <PageHeader 
          title="CodeT AI Assistant" 
          description="Your professional coding companion. Get hints, debug issues, and learn." 
        />
        
        <div className="flex-1 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl overflow-hidden relative shadow-sm">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
          <iframe 
            src="https://aaryanpethkar48-student-coding-assistant.hf.space"
            className="w-full h-full border-0 bg-transparent"
            title="CodeT Chatbot"
            allow="clipboard-read; clipboard-write; microphone"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
