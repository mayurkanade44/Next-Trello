"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

interface SidebarProps {
  storageKey?: string;
}

const Sidebar = ({ storageKey = "sidebar" }: SidebarProps) => {
  const [expand, setExpand] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: { infinite: true },
  });

  const defaultAccordionValue: string[] = Object.keys(expand).reduce(
    (acc: string[], key: string) => {
      if (expand[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpand((curr) => ({ ...curr, [id]: !expand[id] }));
  };

  if(!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (<>Loading</>)
  }

  return <div>Sidebar</div>;
};
export default Sidebar;
