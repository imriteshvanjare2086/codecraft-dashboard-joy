import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const data = (await register({ username, email, password })) as any;
      if (data && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 space-y-4"
      >
        <div>
          <h1 className="text-xl font-heading font-semibold text-foreground">Register</h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">Create your CodeTrack account</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Username</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="rounded-xl border-border/60 bg-background/50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="rounded-xl border-border/60 bg-background/50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Password</label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="rounded-xl border-border/60 bg-background/50"
          />
        </div>

        {error && <p className="text-xs font-mono text-destructive">{error}</p>}

        <Button type="submit" className="w-full rounded-xl font-mono text-xs" disabled={submitting}>
          {submitting ? "Creating…" : "Create account"}
        </Button>

        <p className="text-xs font-mono text-muted-foreground text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

