import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  Search,
  Flag,
  Grid3X3,
  Bell,
  Maximize,
  Minimize,
  Moon,
  Sun,
  Settings,
  User,
  LogOut,
  Briefcase,
  MessageSquare,
  LifeBuoy,
  Wallet,
  Download
} from 'lucide-react';

interface TopHeaderProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    return () => document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newIsDark = !prev;
      if (newIsDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // In a real app with next-themes: setTheme(newIsDark ? 'dark' : 'light');
      return newIsDark;
    });
  };

  const appMenuItems = [
    { name: 'GitHub', icon: Briefcase, href: '#' },
    { name: 'Slack', icon: MessageSquare, href: '#' },
    { name: 'Dribbble', icon: Download, href: '#' }, // Using Download as a placeholder
    { name: 'Dropbox', icon: Briefcase, href: '#' },
    { name: 'Mail Chimp', icon: Wallet, href: '#' }, // Using Wallet as a placeholder
    { name: 'Asana', icon: Briefcase, href: '#' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 h-[70px] bg-card border-b border-border flex items-center justify-between px-6 z-10 transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "left-[80px]" : "left-[256px]"
      )}
    >
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-2 md:mr-4 text-muted-foreground hover:text-foreground">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-10 w-52 lg:w-64 h-9 text-sm bg-background md:bg-card" />
        </div>
      </div>

      <div className="flex items-center space-x-1 md:space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Flag className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="text-sm py-1.5 px-3"><span className="fi fi-us mr-2"></span>English</DropdownMenuItem>
            <DropdownMenuItem className="text-sm py-1.5 px-3"><span className="fi fi-es mr-2"></span>Español</DropdownMenuItem>
            <DropdownMenuItem className="text-sm py-1.5 px-3"><span className="fi fi-fr mr-2"></span>Français</DropdownMenuItem>
             <DropdownMenuItem className="text-sm py-1.5 px-3"><span className="fi fi-de mr-2"></span>Deutsche</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Grid3X3 className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 md:w-80">
            <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold">Web Apps</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="grid grid-cols-3 gap-2 p-2">
              {appMenuItems.map((app) => (
                <DropdownMenuItem key={app.name} asChild className="cursor-pointer">
                  <a href={app.href} className="flex flex-col items-center justify-center p-2.5 h-auto rounded-md hover:bg-muted focus:bg-muted">
                    <app.icon className="h-6 w-6 mb-1.5 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs text-center text-muted-foreground group-hover:text-foreground">{app.name}</span>
                  </a>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 min-w-4 p-0 flex items-center justify-center text-xs bg-velzon-accentRed text-white rounded-full">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex justify-between items-center px-3 py-2">
              <span className="font-semibold">Notifications</span>
              <Badge variant="outline" className="text-primary border-primary bg-primary/10">3 New</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="max-h-60 overflow-y-auto">
                <DropdownMenuItem className="items-start py-2 px-3">
                    <Avatar className="h-8 w-8 mr-3 mt-0.5"><AvatarFallback className="bg-primary/20 text-primary"><User className="h-4 w-4"/></AvatarFallback></Avatar>
                    <div><p className="text-sm font-medium">New user registered</p><p className="text-xs text-muted-foreground">2 min ago</p></div>
                </DropdownMenuItem>
                 <DropdownMenuItem className="items-start py-2 px-3">
                    <Avatar className="h-8 w-8 mr-3 mt-0.5"><AvatarFallback className="bg-destructive/20 text-destructive"><Settings className="h-4 w-4"/></AvatarFallback></Avatar>
                    <div><p className="text-sm font-medium">System alert: Update required</p><p className="text-xs text-muted-foreground">1 hour ago</p></div>
                </DropdownMenuItem>
                 <DropdownMenuItem className="items-start py-2 px-3">
                    <Avatar className="h-8 w-8 mr-3 mt-0.5"><AvatarImage src="https://i.pravatar.cc/40?u=anotheruser"/><AvatarFallback>JD</AvatarFallback></Avatar>
                    <div><p className="text-sm font-medium">James sent you a message</p><p className="text-xs text-muted-foreground">4 hours ago</p></div>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary py-2 font-medium cursor-pointer">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="hidden md:inline-flex text-muted-foreground hover:text-foreground">
          {isFullScreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-muted-foreground hover:text-foreground">
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-1 md:px-2 h-auto py-1.5 focus-visible:ring-0 focus-visible:ring-offset-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/40?u=annaadame" alt="Anna Adame" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div className="hidden xl:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">Anna Adame</span>
                <span className="text-xs text-muted-foreground">Founder</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Anna Adame</p>
                    <p className="text-xs leading-none text-muted-foreground">anna.adame@example.com</p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem><User className="mr-2 h-4 w-4 text-muted-foreground" /><span>Profile</span></DropdownMenuItem>
                <DropdownMenuItem><Briefcase className="mr-2 h-4 w-4 text-muted-foreground" /><span>My Tasks</span><Badge variant="destructive" className="ml-auto text-[10px] px-1.5 py-0.5">3</Badge></DropdownMenuItem>
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4 text-muted-foreground" /><span>Settings</span></DropdownMenuItem>
                <DropdownMenuItem><Wallet className="mr-2 h-4 w-4 text-muted-foreground" /><span>Billing</span></DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem><LifeBuoy className="mr-2 h-4 w-4 text-muted-foreground" /><span>Support</span></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
