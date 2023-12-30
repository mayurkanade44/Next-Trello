"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Menu, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import FormPopover from "@/components/form/FormPopover";

const Navbar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed z-50 top-50 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <>
          <Button
            onClick={onOpen}
            className="block mr-1 md:hidden"
            size="sm"
            type="button"
            variant="ghost"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="p-2 pt-10">
              <Sidebar storageKey="t-sidebar-mobile-state" />
            </SheetContent>
          </Sheet>
        </>
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={20}>
          <Button
            variant="primary"
            size="sm"
            className="rounded-dm hidden md:block h-auto py-1.5 px-4"
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button size="sm" variant="primary" className="block md:hidden">
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: { height: 30, width: 30 } } }}
        />
      </div>
    </nav>
  );
};
export default Navbar;
