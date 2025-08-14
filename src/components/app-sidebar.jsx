'use client'

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

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
import { MailOpen, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { NavUser } from "./nav-user"
import { CollapsibleTrigger } from "./ui/collapsible"
import { ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"

export function AppSidebar({
  ...props
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  useEffect(() => {
    fetchPlans();

    // Listen for study plan updates
    const handleStudyPlanUpdate = () => {
      fetchPlans();
    };

    window.addEventListener('studyPlanUpdated', handleStudyPlanUpdate);

    return () => {
      window.removeEventListener('studyPlanUpdated', handleStudyPlanUpdate);
    };
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

  // Helper function to check if a subject is currently active
  const isSubjectActive = (subjectId) => {
    return pathname.includes(`/studyplan/subject/${subjectId}`);
  };

  // Helper function to check if a topic is currently active
  const isTopicActive = (subjectId, topicId) => {
    return pathname.includes(`/studyplan/subject/${subjectId}/topic/${topicId}`);
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      // Find the plan that contains this subject
      const plan = plans.find(p =>
        p.studyPlan.some(subject => subject.subjectId === subjectId)
      );

      if (!plan) {
        console.error('Could not find plan containing subject');
        return;
      }

      const response = await fetch(`/api/studyplans?planId=${plan.id}&subjectId=${subjectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh the plans list after successful deletion
        fetchPlans();
      } else {
        console.error('Failed to delete subject');
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
    setDeleteDialogOpen(false);
    setSubjectToDelete(null);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader onClick={() => {
        router.push('/');
      }}
      >
        {/* <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
        <SearchForm /> */}
        <div className="flex gap-3 items-center py-3 pl-2">
          <img
            src="/logo.svg"
            alt="ClarioAI Logo"
            width={25}
            height={25}
            className="rounded-full cursor-pointer"
            onClick={() => router.push('/')}
            style={{ width: 25, height: 25 }}
          />
          <span
            className="font-styrene font-bold text-xl text-center cursor-pointer"
            onClick={() => {
              router.push('/');
            }}
          >
            ClarioAI
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}

        <SidebarGroup>

          <Button asChild className="w-2/3 mx-auto">
            <Link href="/newsubject"> <Plus /> Add Subject</Link>
          </Button>
        </SidebarGroup>
        <SidebarGroup>

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
                      defaultOpen={isSubjectActive(subject.subjectId)}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <div className="group/subject flex w-full items-center">
                            <SidebarMenuButton
                              isActive={isSubjectActive(subject.subjectId)}
                              className="flex-1"
                            >
                              <ChevronRight
                                className="absolute left-2 hidden bg-zinc-700 rounded-sm group-hover/subject:inline transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              <Link
                                href={`/studyplan/subject/${subject.subjectId}`}
                                className="overflow-hidden text-ellipsis whitespace-nowrap flex items-center"
                              >
                                <span className="font-styrene truncate">{subject.subjectName}</span>
                              </Link>
                            </SidebarMenuButton>
                            <div className="ml-auto">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0 md:opacity-0 group-hover/subject:opacity-100 transition-opacity"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => {
                                      setSubjectToDelete(subject.subjectId);
                                      setDeleteDialogOpen(true);
                                    }}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {subject.topics?.map((topic, idx) => (
                              <SidebarMenuSubItem key={topic.topicId || idx}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isTopicActive(subject.subjectId, topic.topicId)}
                                >
                                  <Link href={`/studyplan/subject/${subject.subjectId}/topic/${topic.topicId}`} className="flex items-center">
                                    <span>{topic.name}</span>
                                  </Link>
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
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the subject
              and all its associated topics.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => subjectToDelete && handleDeleteSubject(subjectToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar >
  );
}
