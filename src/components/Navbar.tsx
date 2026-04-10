import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, Command, Moon, Sun, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  // Intentionally defaulting to light or parsing the existing root class
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(localStorage.getItem("profile-photo"));

  useEffect(() => {
    const updateUser = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr) || { username: "User", email: "" };
          setUsername(user?.username || "User");
        } catch (e) {
          setUsername("User");
        }
      } else {
        setUsername("User");
      }
      setProfilePhoto(localStorage.getItem("profile-photo"));
    };

    updateUser();
    window.addEventListener("profile-photo-updated", updateUser);
    return () => window.removeEventListener("profile-photo-updated", updateUser);
  }, []);

  const initials = username
    ? username.split(" ").map(word => word[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const SEARCH_ITEMS = [
    { name: "Dashboard", path: "/" },
    { name: "Learning Path", path: "/learning-path" },
    { name: "Problems", path: "/problems" },
    { name: "Weekly Challenges", path: "/weekly-challenges" },
    { name: "CodeT Assistant", path: "/codet" },
    { name: "Friends Space", path: "/friends" },
    { name: "Leaderboard", path: "/leaderboard" }
  ];

  const filteredSearch = SEARCH_ITEMS.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="bg-yellow-400 text-black px-1 rounded-sm">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/40 bg-background/60 backdrop-blur-2xl px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
        <div className="relative" id="tour-search">
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-3 py-1.5 text-sm text-muted-foreground focus-within:bg-muted/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
            <Search className="h-3.5 w-3.5" />
            <input 
              type="text" 
              placeholder="Search features..." 
              className="bg-transparent border-none outline-none font-mono text-xs w-56 text-foreground placeholder:text-muted-foreground/70"
              value={query}
              onChange={handleSearch}
            />
            <kbd className="hidden md:inline-flex ml-1 h-5 items-center gap-0.5 rounded-md border border-border/60 bg-muted/70 px-1.5 text-[10px] font-mono text-muted-foreground">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </div>
          {query.trim().length > 0 && (
            <div className="absolute top-11 left-0 w-full rounded-xl border border-border/60 bg-card shadow-xl p-2 z-50 flex flex-col gap-1 overflow-hidden">
              {filteredSearch.length > 0 ? (
                filteredSearch.map(item => (
                  <div
                    key={item.path}
                    onClick={() => { navigate(item.path); setQuery(""); }}
                    className="px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary rounded-lg cursor-pointer transition-colors"
                  >
                    {highlightText(item.name, query)}
                  </div>
                ))
              ) : (
                <div className="px-3 py-3 text-xs text-muted-foreground text-center font-mono italic">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleTheme}
          className="relative rounded-xl p-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all duration-200"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowDropdown(false); }}
            className="relative rounded-xl p-2 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all duration-200"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-border/60 bg-card/90 backdrop-blur-xl shadow-lg p-3 z-50">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold font-heading text-foreground">Notifications</span>
              </div>
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-muted/20 rounded-lg border border-border/30">
                <Bell className="h-6 w-6 text-muted-foreground/30 mb-2" />
                <p className="text-[11px] font-mono text-muted-foreground text-center">No notifications yet</p>
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <div 
            id="tour-profile"
            onClick={() => { setShowDropdown(!showDropdown); setShowNotifications(false); }}
            className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary font-mono cursor-pointer hover:bg-primary/20 transition-all overflow-hidden"
          >
            {profilePhoto ? (
              <img src={profilePhoto} alt="User" className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border/60 bg-card/90 backdrop-blur-xl shadow-lg p-1.5 z-50">
              <button 
                onClick={() => { setShowDropdown(false); navigate("/profile"); }} 
                className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted/50 rounded-lg flex items-center gap-2"
              >
                Profile
              </button>
              <button 
                onClick={handleLogout} 
                className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg flex items-center gap-2 mt-1"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
