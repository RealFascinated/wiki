import QuickSearchDialog from "@/components/navbar/search-dialog";
import SidebarLinks from "@/components/sidebar/sidebar-links";
import ThemeSwitcher from "@/components/theme-switcher";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignRightIcon } from "lucide-react";
import { ReactElement } from "react";

const Sidebar = ({ pages }: { pages: DocsContentMetadata[] }): ReactElement => (
  <>
    {/* Mobile */}
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="flex items-center">
          <AlignRightIcon className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent className="h-full px-5 pt-11" side="right">
          <SidebarContent pages={pages} />
        </SheetContent>
      </Sheet>
    </div>

    {/* Desktop */}
    <div className="hidden md:flex sticky top-[4.5rem] max-h-[calc(100vh-4.5rem)] min-w-56 w-64 lg:w-72 py-5 pb-3 flex-col justify-between transition-all transform-gpu overflow-y-auto">
      <SidebarContent pages={pages} />
    </div>
  </>
);

const SidebarContent = ({
  pages,
}: {
  pages: DocsContentMetadata[];
}): ReactElement => (
  <div className="h-full flex flex-col justify-between">
    {/* Top */}
    <div className="flex flex-col">
      <div className="md:hidden pb-3">
        <QuickSearchDialog pages={pages} />
      </div>
      <SidebarLinks pages={pages} />
    </div>

    {/* Theme Switcher */}
    <div className="flex flex-col items-center">
      <Separator className="mb-3 dark:bg-separator-gradient" />
      <ThemeSwitcher />
    </div>
  </div>
);

export default Sidebar;
