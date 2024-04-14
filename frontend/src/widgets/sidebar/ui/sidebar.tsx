import { SidebarHeader } from "./components/sidebar-header";
import { SidebarItem } from "./components/sidebar-item";
import { LucideHome, User2, BarChart2, Users, Settings } from "lucide-react";

export const Sidebar = (): JSX.Element => {
  return (
    <div className="h-full shadow-md bg-white text-white transition-all duration-500 ease-in-out w-full">
      <SidebarHeader />
      <div className="flex flex-col gap-1">
        <SidebarItem title="Главная" to="/home" popular>
          <LucideHome className="scale-125" />
        </SidebarItem>
        <SidebarItem title="Профиль" to="/profile">
          <User2 className="scale-125" />
        </SidebarItem>
        <SidebarItem title="Студенты" to="/students">
          <Users className="scale-125" />
        </SidebarItem>
        <SidebarItem title="Settings" to="/settings">
          <Settings className="scale-125" />
        </SidebarItem>
      </div>
    </div>
  );
};
