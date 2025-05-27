'use client'

import * as React from "react"
import { useState, useEffect } from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { MailOpen, Plus } from "lucide-react"
import Link from "next/link"
import { NavUser } from "./nav-user"
import { CollapsibleTrigger } from "./ui/collapsible"
import { ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible"

export function AppSidebar({
  ...props
}) {

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      console.log('Fetching plans...');
      const res = await fetch('/api/studyplans');
      const data = await res.json();
      setPlans(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
      setLoading(false);
    }
  };
  console.log('From sidebar', plans);


  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
        <SearchForm /> */}
        <span className="font-styrene font-bold text-xl  text-center">ClarioAI</span>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}

        <SidebarGroup></SidebarGroup>
        <SidebarGroup>
          <Button asChild className="w-2/3 mx-auto">
            <Link href="/newsubject"> <Plus /> Add Subject</Link>
          </Button>

          <SidebarGroupLabel>Your Subjects</SidebarGroupLabel>
          <SidebarGroupContent>
            {loading ? (
              <SidebarMenu>
                {Array.from({ length: 5 }).map((_, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : plans.length ? (
              <SidebarMenu>
                {plans.map(plan =>
                  plan.studyPlan.map((subject, idx) => (
                    <Collapsible
                      key={subject.subjectId || idx}
                      asChild
                      defaultOpen={false}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton isActive={false} className="group/subject">
                            <a href={`/studyplan/subject/${subject.subjectId}`} className="overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
                              <span className="font-styrene truncate">{subject.subjectName}</span>
                            </a>
                            <ChevronRight size={5} className="ml-auto hidden hover:bg-zinc-700 rounded-sm group-hover/subject:inline transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {subject.topics?.map((topic, idx) => (
                              <SidebarMenuSubItem key={topic.topicId || idx}>
                                <SidebarMenuSubButton asChild>
                                  <a href={`/studyplan/subject/${subject.subjectId}/topic/${topic.topicId}`} className="flex items-center">
                                    <span>{topic.name}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ))
                )}
              </SidebarMenu>
            ) : (
              <p>hi</p>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar >
  );
}
