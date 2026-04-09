import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Headphones, Pause, Play, Quote, Timer, X } from "lucide-react";

const DURATIONS = [5, 10, 15] as const;

const QUOTES = [
  "Consistency beats intensity.",
  "One breath at a time. One problem at a time.",
  "Make it easy to start.",
  "Small steps, every day.",
  "Discipline is choosing what you want most over what you want now.",
] as const;

function formatMmSs(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function FocusMode() {
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState<(typeof DURATIONS)[number]>(10);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);

  const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);

  useEffect(() => {
    setSecondsLeft(minutes * 60);
    setRunning(false);
  }, [minutes]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card/60 backdrop-blur-2xl p-6 space-y-6">
        <div className="flex justify-between items-center mb-[-12px]">
          <h1 className="text-xl font-heading font-semibold text-foreground flex items-center gap-2">
            <Timer className="h-6 w-6 text-primary" />
            Focus Mode
          </h1>
          <Button variant="destructive" size="default" onClick={() => navigate("/")} className="font-mono text-xs rounded-xl shadow-lg">
            <X className="mr-1 h-4 w-4" />
            Exit Mode
          </Button>
        </div>
        <div className="flex items-start justify-between gap-4 mt-2">
          <div>
            <p className="text-xs font-mono text-muted-foreground">Meditation timer + motivation. No distractions.</p>
          </div>
          <Toggle
            pressed={ambientOn}
            onPressedChange={setAmbientOn}
            className="rounded-full font-mono text-[11px]"
          >
            <Headphones className="mr-2 h-3.5 w-3.5" />
            Ambient {ambientOn ? "on" : "off"}
          </Toggle>
        </div>

        <div className="flex items-center justify-center gap-2">
          {DURATIONS.map((d) => (
            <Button
              key={d}
              type="button"
              size="sm"
              variant={minutes === d ? "default" : "outline"}
              className="rounded-xl font-mono text-xs"
              onClick={() => setMinutes(d)}
            >
              {d} min
            </Button>
          ))}
        </div>

        <div className="text-center space-y-3">
          <div className="font-mono text-5xl tracking-[0.18em] text-foreground">{formatMmSs(secondsLeft)}</div>
          <Button
            type="button"
            size="sm"
            className="rounded-full font-mono text-xs px-4"
            onClick={() => setRunning((r) => !r)}
          >
            {running ? (
              <>
                <Pause className="mr-2 h-3.5 w-3.5" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-3.5 w-3.5" />
                Start
              </>
            )}
          </Button>
        </div>

        <div className="rounded-2xl border border-border/40 bg-muted/10 p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Quote className="h-4 w-4" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Quote</span>
          </div>
          <p className="mt-2 text-xs font-mono text-muted-foreground">“{quote}”</p>
        </div>

        <p className="text-[10px] font-mono text-muted-foreground text-center">
          Ambient sound is UI-only for now.
        </p>
      </div>
    </div>
  );
}

