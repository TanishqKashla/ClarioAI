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
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { MailOpen, Plus } from "lucide-react"
import Link from "next/link"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
  ],
}



export function AppSidebar({
  ...props
}) {

  const [plans, setPlans] = useState([]);


  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      console.log('Fetching plans...');
      const res = await fetch('/api/studyplans');
      const data = await res.json();
      setPlans(data);
      // setLoading(false);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
      // setLoading(false);
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


        <SidebarGroup>
          <Button asChild className="w-2/3 mx-auto">
            <Link href="/newsubject"> <Plus /> Add Subject</Link>
          </Button>

          <SidebarGroupLabel>Your Subjects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {plans.length ? (
                plans.map(plan => (
                  plan.studyPlan.map((subject, idx) => (
                    <SidebarMenuItem key={subject.subjectId || idx}>
                      <SidebarMenuButton asChild isActive={false}>
                        <a href={`/studyplan/subject/${subject.subjectId}`}><span className="font-styrene">{subject.subjectName}</span></a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))))) : (
                <p>hi</p>
              )
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
       <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
