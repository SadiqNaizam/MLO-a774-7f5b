import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingCart,
  Bitcoin,
  FolderKanban,
  GalleryVerticalEnd,
  Briefcase,
  FileText,
  AppWindow,
  LayoutGrid,
  Lock,
  File,
  Rocket,
  Cpu,
  Puzzle,
  LayoutList,
  ClipboardList,
  ChevronDown,
  ChevronRight,
  Dot,
  LucideIcon,
  Menu as MenuIcon, // Placeholder if a specific icon not found
} from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  isTitle?: boolean;
  badgeText?: string;
  badgeType?: 'new' | 'hot';
  children?: NavItem[];
  exactMatch?: boolean;
}

const navigationItems: NavItem[] = [
  {
    label: 'Dashboards',
    icon: LayoutDashboard,
    children: [
      { label: 'Analytics', href: '/analytics', icon: BarChart3 },
      { label: 'CRM', href: '/crm', icon: Users, exactMatch: true },
      { label: 'Ecommerce', href: '/ecommerce', icon: ShoppingCart },
      { label: 'Crypto', href: '/crypto', icon: Bitcoin },
    ],
  },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'NFT', href: '/nft', icon: GalleryVerticalEnd },
  { label: 'Job', href: '/job', icon: Briefcase },
  { label: 'Blog', href: '/blog', icon: FileText, badgeText: 'New', badgeType: 'new' as const },
  {
    label: 'Apps',
    icon: AppWindow,
    children: [
      { label: 'Calendar', href: '/apps/calendar', icon: File }, 
      { label: 'Chat', href: '/apps/chat', icon: File },
      { label: 'Email', href: '/apps/email', icon: File },
    ],
  },
  { label: 'Layouts', href: '/layouts', icon: LayoutGrid, badgeText: 'Hot', badgeType: 'hot' as const },
  { label: 'PAGES', isTitle: true, icon: MenuIcon /* Placeholder */ }, 
  {
    label: 'Authentication',
    icon: Lock,
    children: [
      { label: 'Sign In', href: '/auth/signin', icon:  File },
      { label: 'Sign Up', href: '/auth/signup', icon:  File },
    ],
  },
  {
    label: 'Pages',
    icon: File,
    children: [
      { label: 'Starter', href: '/pages/starter', icon: File },
      { label: 'Profile', href: '/pages/profile', icon: File },
    ],
  },
  { label: 'Landing', href: '/landing', icon: Rocket },
  { label: 'COMPONENTS', isTitle: true, icon: MenuIcon /* Placeholder */ }, 
  {
    label: 'Base UI',
    icon: Cpu,
    children: [
      { label: 'Alerts', href: '/components/alerts', icon: File },
      { label: 'Buttons', href: '/components/buttons', icon: File },
    ],
  },
  {
    label: 'Advance UI',
    icon: Puzzle,
    children: [
      { label: 'Scrollbar', href: '/components/scrollbar', icon: File },
      { label: 'Swiper', href: '/components/swiper', icon: File },
    ],
  },
  { label: 'Widgets', href: '/components/widgets', icon: LayoutList },
  { label: 'Forms', href: '/components/forms', icon: ClipboardList },
];

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    'Dashboards': location.pathname.startsWith('/analytics') || location.pathname.startsWith('/crm') || location.pathname.startsWith('/ecommerce') || location.pathname.startsWith('/crypto'),
    'Apps': location.pathname.startsWith('/apps/'),
    'Authentication': location.pathname.startsWith('/auth/'),
    'Pages': location.pathname.startsWith('/pages/'),
    'Base UI': location.pathname.startsWith('/components/alerts') || location.pathname.startsWith('/components/buttons'),
    'Advance UI': location.pathname.startsWith('/components/scrollbar') || location.pathname.startsWith('/components/swiper'),
  });

  const toggleMenu = (label: string) => {
    if (!isCollapsed) {
      setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
    }
  };

  const NavLinkContent: React.FC<{ item: NavItem, isActive: boolean, depth: number }> = ({ item, isActive, depth }) => (
    <>
      <item.icon className={cn(
        "h-5 w-5 shrink-0", 
        isCollapsed && depth === 0 ? "mx-auto" : "mr-3", 
        isActive && !item.children ? "text-sidebar-primary" : "text-sidebar-foreground/80 group-hover:text-sidebar-foreground"
      )} />
      {!isCollapsed && <span className="flex-grow truncate">{item.label}</span>}
      {item.badgeText && !isCollapsed && (
        <Badge
          className={cn(
            "ml-auto px-1.5 py-0.5 text-xs h-fit rounded-sm font-medium",
            item.badgeType === 'hot' ? "bg-velzon-accentRed text-white" : "bg-velzon-accentGreen text-white"
          )}
        >
          {item.badgeText}
        </Badge>
      )}
      {item.children && !isCollapsed && 
        (openMenus[item.label] ? 
          <ChevronDown className="h-4 w-4 ml-auto shrink-0" /> : 
          <ChevronRight className="h-4 w-4 ml-auto shrink-0" />
        )
      }
    </>
  );

  const renderNavItem = (item: NavItem, depth: number = 0): JSX.Element => {
    const isActive = item.href ? (item.exactMatch ? location.pathname === item.href : location.pathname.startsWith(item.href)) : (item.children ? item.children.some(child => child.href && location.pathname.startsWith(child.href)) : false);

    if (item.isTitle) {
      return (
        <li key={`${item.label}-${depth}`} className={cn(
          "px-3 pt-4 pb-1 text-xs font-semibold uppercase text-sidebar-foreground/60 tracking-wider",
          isCollapsed ? "text-center my-1" : "my-0"
        )}>
          {isCollapsed ? <span title={item.label}>•••</span> : item.label}
        </li>
      );
    }

    if (item.children) {
      return (
        <li key={`${item.label}-${depth}`} className="group">
          <Collapsible open={!isCollapsed && (openMenus[item.label] || false)} onOpenChange={() => toggleMenu(item.label)}>
            <CollapsibleTrigger
              className={cn(
                "flex items-center w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 group",
                "hover:bg-sidebar-accent/10 hover:text-sidebar-foreground",
                isActive ? "text-sidebar-primary" : "text-sidebar-foreground/80",
                isCollapsed && "justify-center py-3"
              )}
              disabled={isCollapsed && depth > 0} // Child submenus not expandable when collapsed, unless a popover mechanism is added
            >
              <NavLinkContent item={item} isActive={isActive} depth={depth} />
            </CollapsibleTrigger>
            {!isCollapsed && (
              <CollapsibleContent className="pl-5">
                <ul className="space-y-0.5 py-1 border-l border-sidebar-border/30 ml-[13px]">
                  {item.children.map(child => renderNavItem(child, depth + 1))}
                </ul>
              </CollapsibleContent>
            )}
          </Collapsible>
        </li>
      );
    }

    return (
      <li key={`${item.label}-${depth}`} className="group">
        <Link
          to={item.href || '#'}
          className={cn(
            "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 group",
            "hover:bg-sidebar-accent/10 hover:text-sidebar-foreground",
            isActive ? "text-sidebar-primary bg-sidebar-accent/20" : "text-sidebar-foreground/80",
            isCollapsed && "justify-center py-3"
          )}
        >
          <NavLinkContent item={item} isActive={isActive} depth={depth} />
        </Link>
      </li>
    );
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full bg-sidebar text-sidebar-foreground flex flex-col z-20 transition-all duration-300 ease-in-out shadow-lg",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <Link
        to="/"
        className={cn(
          "flex items-center h-[70px] px-4 shrink-0 border-b border-sidebar-border/30",
          isCollapsed ? "justify-center" : "justify-start"
        )}
      >
        {isCollapsed ? (
          <span className="text-3xl font-bold text-sidebar-primary">V</span>
        ) : (
          <span className="text-2xl font-bold text-sidebar-primary">VELZON</span>
        )}
      </Link>

      {!isCollapsed && (
        <div className="p-4 border-b border-sidebar-border/30">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://i.pravatar.cc/40?u=annaadame" alt="Anna Adame" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-semibold text-sidebar-foreground">Anna Adame</p>
              <p className="text-xs text-sidebar-foreground/70 flex items-center">
                <Dot className="h-5 w-5 text-velzon-accentGreen -ml-1.5" /> Online
              </p>
            </div>
          </div>
        </div>
      )}
      
      {!isCollapsed && (
         <div className="px-3 pt-3 pb-1 text-xs font-medium uppercase text-sidebar-foreground/60 tracking-wider">Menu</div>
      )}
       {isCollapsed && (
         <div className="px-1 py-3 text-xs text-center font-medium uppercase text-sidebar-foreground/60 tracking-wider">
            <MenuIcon className="h-5 w-5 mx-auto"/>
         </div>
      )}

      <ScrollArea className="flex-1">
        <nav className="pt-1 pb-4 px-2">
          <ul className="space-y-0.5">
            {navigationItems.map(item => renderNavItem(item))}
          </ul>
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
