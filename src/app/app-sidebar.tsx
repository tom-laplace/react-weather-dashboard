import CitiesList from "@/components/cities-list";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useRecentSearches } from "@/hooks/use-recent-searches";

export function AppSidebar() {
  const { recentSearches } = useRecentSearches();
  
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup>
          <CitiesList
            citiesList={recentSearches}
            listType="Recents"
          ></CitiesList>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle></ModeToggle>
      </SidebarFooter>
    </Sidebar>
  );
}
