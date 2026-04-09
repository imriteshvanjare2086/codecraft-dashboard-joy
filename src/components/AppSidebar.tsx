import {
  LayoutDashboard,
  Code2,
  Trophy,
  StickyNote,
  Target,
  User,
  Flame,
  GraduationCap,
  Route,
  CalendarRange,
  Focus,
  Users,
  Bot,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

type NavItem = { title: string; url: string; icon: typeof LayoutDashboard };

const primaryNav: NavItem[] = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Learning Path", url: "/learning-path", icon: Route },
  { title: "Problems", url: "/problems", icon: Code2 },
  { title: "Weekly Challenges", url: "/weekly-challenges", icon: CalendarRange },
  { title: "CodeT Assistant", url: "/codet", icon: Bot },
  { title: "Focus Mode", url: "/focus", icon: Focus },
];

const restNav: NavItem[] = [
  { title: "Friends", url: "/friends", icon: Users },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Notes", url: "/notes", icon: StickyNote },
  { title: "Courses", url: "/courses", icon: GraduationCap },
  { title: "Goals", url: "/goals", icon: Target },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const renderLink = (item: NavItem) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild tooltip={item.title}>
        <NavLink
          to={item.url}
          end={item.url === "/"}
          className="rounded-xl transition-all duration-200 hover:bg-sidebar-accent"
          activeClassName="bg-sidebar-accent font-medium text-primary"
        >
          <item.icon className="mr-2 h-4 w-4" />
          {!collapsed && <span>{item.title}</span>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20">
            <Flame className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold font-heading text-foreground tracking-tight">CodeTrack</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/50 uppercase text-[10px] tracking-[0.2em] font-mono">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNav.map(renderLink)}
              {restNav.map(renderLink)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
